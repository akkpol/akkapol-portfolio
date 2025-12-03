'use client';
import { Basics } from "@/types"
import TiltCard from "@/components/TiltCard"
import { compressImage } from "@/utils/image"

interface ProfileFormProps {
  data: Basics
  onChange: (data: Basics) => void
}

export default function ProfileForm({ data, onChange }: ProfileFormProps) {
  const updateField = <K extends keyof Basics>(field: K, value: Basics[K]) => {
    onChange({ ...data, [field]: value })
  }

  const updateSocials = (field: keyof Basics['socials'], value: string) => {
    onChange({
      ...data,
      socials: { ...(data.socials ?? {}), [field]: value }
    })
  }

  const updateKeywords = (index: number, value: string) => {
    const newKeywords = [...(data.keywords ?? [])]
    newKeywords[index] = value
    onChange({ ...data, keywords: newKeywords })
  }

  const addKeyword = () => {
    onChange({ ...data, keywords: [...(data.keywords ?? []), ''] })
  }

  const removeKeyword = (index: number) => {
    onChange({ ...data, keywords: (data.keywords ?? []).filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          รูปโปรไฟล์
        </label>
        <div className="flex gap-6 items-start">
          <div className="shrink-0">
            {data.image ? (
              <TiltCard className="w-24 h-24 rounded-full">
                <div className="relative group w-full h-full">
                  <img
                    src={data.image}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                  />
                  <button
                    onClick={() => updateField('image', '')}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Remove image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </button>
                </div>
              </TiltCard>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                อัพโหลดรูปภาพ (ไม่เกิน 2MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    try {
                      const compressedFile = await compressImage(file)
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        updateField('image', reader.result as string)
                      }
                      reader.readAsDataURL(compressedFile)
                    } catch (error) {
                      console.error("Error compressing image:", error)
                      alert("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ")
                    }
                  }
                }}
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  dark:file:bg-blue-900/20 dark:file:text-blue-400"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-800 px-2 text-xs text-gray-500">หรือ ใส่ลิงก์รูปภาพ</span>
              </div>
            </div>

            <div>
              <input
                type="url"
                value={data.image ?? ''}
                onChange={(e) => updateField('image', e.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          ชื่อ
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Headline
        </label>
        <input
          type="text"
          value={data.headline}
          onChange={(e) => updateField('headline', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          เกี่ยวกับ
        </label>
        <textarea
          value={data.about}
          onChange={(e) => updateField('about', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          ที่อยู่
        </label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => updateField('location', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          อีเมล
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          LinkedIn URL
        </label>
        <input
          type="url"
          value={data.socials?.linkedin ?? ''}
          onChange={(e) => updateSocials('linkedin', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Keywords
        </label>
        <div className="space-y-2">
          {(data.keywords ?? []).map((keyword, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => updateKeywords(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => removeKeyword(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                ลบ
              </button>
            </div>
          ))}
          <button
            onClick={addKeyword}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            + เพิ่ม Keyword
          </button>
        </div>
      </div>
    </div>
  )
}
