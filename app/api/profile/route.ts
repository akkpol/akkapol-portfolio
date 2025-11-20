import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { promises as fs } from "fs"
import path from "path"
import { LinkedInData } from "@/types"

export const runtime = 'nodejs'

const DATA_DIR = path.join(process.cwd(), "data")
const PROFILE_FILE = path.join(DATA_DIR, "profile.json")

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// GET profile data
export async function GET() {
  try {
    await ensureDataDir()
    const fileContents = await fs.readFile(PROFILE_FILE, "utf8")
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        { error: "Profile data not found" },
        { status: 404 }
      )
    }
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
    
    // Validate data structure (basic validation)
    if (!body.basics || !body.experience || !body.skills || !body.certifications || !body.education) {
      return NextResponse.json(
        { error: "Invalid data structure" },
        { status: 400 }
      )
    }

    // Ensure data directory exists before writing
    await ensureDataDir()
    
    // Write to file
    await fs.writeFile(PROFILE_FILE, JSON.stringify(body, null, 2), "utf8")
    
    return NextResponse.json({ success: true, data: body })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Failed to update profile data" },
      { status: 500 }
    )
  }
}

