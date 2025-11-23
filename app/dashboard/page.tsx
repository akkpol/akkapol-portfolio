'use client';
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Save, Loader2, ArrowLeft } from "lucide-react"
import ProfileForm from "@/components/admin/ProfileForm"
import ExperienceForm from "@/components/admin/ExperienceForm"
import SkillsForm from "@/components/admin/SkillsForm"
import CertificationsForm from "@/components/admin/CertificationsForm"
import EducationForm from "@/components/admin/EducationForm"
import { LinkedInData } from "@/types"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<LinkedInData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'basics' | 'experience' | 'skills' | 'certifications' | 'education'>('basics')

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile()
    }
  }, [status])

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile")
      if (res.ok) {
        const profileData = await res.json()
        setData(profileData)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!data) return
    
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        alert("บันทึกข้อมูลสำเร็จ!")
        // Optionally reload the page
        window.location.reload()
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล")
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล")
    } finally {
      setSaving(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">ไม่พบข้อมูล</p>
      </div>
    )
  }

  const tabs = [
    { id: 'basics' as const, label: 'ข้อมูลพื้นฐาน' },
    { id: 'experience' as const, label: 'ประสบการณ์' },
    { id: 'skills' as const, label: 'ทักษะ' },
    { id: 'certifications' as const, label: 'ใบรับรอง' },
    { id: 'education' as const, label: 'การศึกษา' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard - แก้ไขข้อมูล
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>บันทึกข้อมูล</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'basics' && (
                <ProfileForm data={data.basics} onChange={(basics) => setData({ ...data, basics })} />
              )}
              {activeTab === 'experience' && (
                <ExperienceForm data={data.experience} onChange={(experience) => setData({ ...data, experience })} />
              )}
              {activeTab === 'skills' && (
                <SkillsForm data={data.skills} onChange={(skills) => setData({ ...data, skills })} />
              )}
              {activeTab === 'certifications' && (
                <CertificationsForm data={data.certifications} onChange={(certifications) => setData({ ...data, certifications })} />
              )}
              {activeTab === 'education' && (
                <EducationForm data={data.education} onChange={(education) => setData({ ...data, education })} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

