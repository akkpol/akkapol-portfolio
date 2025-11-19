'use client';
import { Experience } from "@/types"
import { Plus, Trash2 } from "lucide-react"

interface ExperienceFormProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const updateHighlight = (expIndex: number, highlightIndex: number, value: string) => {
    const newData = [...data]
    newData[expIndex].highlights[highlightIndex] = value
    onChange(newData)
  }

  const addHighlight = (expIndex: number) => {
    const newData = [...data]
    newData[expIndex].highlights.push('')
    onChange(newData)
  }

  const removeHighlight = (expIndex: number, highlightIndex: number) => {
    const newData = [...data]
    newData[expIndex].highlights = newData[expIndex].highlights.filter((_, i) => i !== highlightIndex)
    onChange(newData)
  }

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: '',
        title: '',
        startDate: '',
        endDate: '',
        location: '',
        highlights: ['']
      }
    ])
  }

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {data.map((exp, expIndex) => (
        <div key={expIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              ประสบการณ์ #{expIndex + 1}
            </h3>
            <button
              onClick={() => removeExperience(expIndex)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                บริษัท
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ตำแหน่ง
              </label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(expIndex, 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                วันที่เริ่ม (YYYY-MM)
              </label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                วันที่สิ้นสุด (YYYY-MM หรือ Present)
              </label>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                สถานที่
              </label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Highlights
            </label>
            <div className="space-y-2">
              {exp.highlights.map((highlight, highlightIndex) => (
                <div key={highlightIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => updateHighlight(expIndex, highlightIndex, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeHighlight(expIndex, highlightIndex)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addHighlight(expIndex)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                + เพิ่ม Highlight
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        <span>เพิ่มประสบการณ์</span>
      </button>
    </div>
  )
}

