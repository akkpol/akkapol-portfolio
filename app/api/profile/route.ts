import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { LinkedInData } from "@/types"
import { validateProfileData } from "@/utils/validation"

// Force dynamic rendering (needed for auth)
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const PROFILE_DOC_ID = "main-profile"

// GET profile data
export async function GET() {
  try {
    const docRef = doc(db, "profiles", PROFILE_DOC_ID)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "Profile data not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(docSnap.data())
  } catch (error) {
    console.error("Error reading profile:", error)
    return NextResponse.json(
      { error: "Failed to read profile data" },
      { status: 500 }
    )
  }
}

// UPDATE profile data (requires authentication)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body: LinkedInData = await request.json()
    
    // Validate data structure
    const validation = validateProfileData(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid data structure",
          details: validation.errors
        },
        { status: 400 }
      )
    }

    // Write to Firestore
    const docRef = doc(db, "profiles", PROFILE_DOC_ID)
    await setDoc(docRef, body)
    
    return NextResponse.json({ success: true, data: body })
  } catch (error) {
    console.error("Error updating profile:", error)
    // Log detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined
    console.error("Error details:", { errorMessage, errorStack })
    
    return NextResponse.json(
      { 
        error: "Failed to update profile data",
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}
