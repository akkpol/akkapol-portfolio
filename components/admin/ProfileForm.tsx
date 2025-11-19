'use client';
import { Basics } from "@/types"

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

