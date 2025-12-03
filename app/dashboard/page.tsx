'use client';
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Save, Loader2, ArrowLeft, User, Briefcase, Code2, Award, GraduationCap } from "lucide-react"
import ProfileForm from "@/components/admin/ProfileForm"
import ExperienceForm from "@/components/admin/ExperienceForm"

import CertificationsForm from "@/components/admin/CertificationsForm"
import EducationForm from "@/components/admin/EducationForm"
import { LinkedInData } from "@/types"
import { cn } from "@/utils/cn"
import ThemeToggle from "@/components/ThemeToggle"

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
      </div>
    )
  }

  if (!session) return null

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-muted">ไม่พบข้อมูล</p>
      </div>
    )
  }

  const tabs = [
    { id: 'basics' as const, label: 'ข้อมูลพื้นฐาน', icon: User },
    { id: 'experience' as const, label: 'ประสบการณ์', icon: Briefcase },
    { id: 'skills' as const, label: 'ทักษะ', icon: Code2 },
    { id: 'certifications' as const, label: 'ใบรับรอง', icon: Award },
    { id: 'education' as const, label: 'การศึกษา', icon: GraduationCap },
  ]

  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      {/* Premium Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-surface/80 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="group rounded-full p-2 text-text-muted transition-colors hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-white"
                title="Back to Home"
              >
                <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                  Dashboard
                </h1>
                <p className="text-xs text-text-muted">จัดการข้อมูลพอร์ตโฟลิโอของคุณ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={handleSave}
                disabled={saving}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-blue-600 dark:bg-accent-blue/10 px-6 py-2.5 font-medium text-white dark:text-accent-blue transition-all hover:bg-blue-700 dark:hover:bg-accent-blue/20 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation for Desktop / Tabs for Mobile */}
          <nav className="flex overflow-x-auto pb-4 lg:flex-col lg:pb-0 lg:pr-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex min-w-[140px] items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all lg:w-full",
                    isActive
                      ? "bg-blue-50 dark:bg-accent-blue/10 text-blue-600 dark:text-accent-blue shadow-sm dark:shadow-glow-blue"
                      : "text-text-muted hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-white"
                  )}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>

          {/* Content Area */}
          <div className="min-h-[600px] rounded-2xl border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-surface/30 p-6 backdrop-blur-sm sm:p-8 shadow-sm dark:shadow-none transition-colors duration-300">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-text-muted">
                  แก้ไขข้อมูล{tabs.find(t => t.id === activeTab)?.label}ของคุณ
                </p>
              </div>

              <div className="space-y-6">
                {activeTab === 'basics' && (
                  <ProfileForm data={data.basics} onChange={(basics) => setData({ ...data, basics })} />
                )}
                {activeTab === 'experience' && (
                  <ExperienceForm data={data.experience} onChange={(experience) => setData({ ...data, experience })} />
                )}
                {activeTab === 'skills' && (
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Skills are managed as SkillGroups (title + items array). Edit directly in Firebase Console or profile.json for now.
                    </p>
                  </div>
                )}
                {activeTab === 'certifications' && (
                  <CertificationsForm data={data.certifications} onChange={(certifications) => setData({ ...data, certifications })} />
                )}
                {activeTab === 'education' && (
                  <EducationForm data={data.education} onChange={(education) => setData({ ...data, education })} />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
