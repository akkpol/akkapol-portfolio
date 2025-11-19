'use client';
import { Skill } from "@/types"
import { Plus, Trash2 } from "lucide-react"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const addSkill = () => {
    onChange([...data, { name: '', level: 0 }])
  }

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {data.map((skill, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ทักษะ #{index + 1}
            </h3>
            <button
              onClick={() => removeSkill(index)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ชื่อทักษะ
              </label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ระดับ (0-100)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="w-16 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  {skill.level}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        <span>เพิ่มทักษะ</span>
      </button>
    </div>
  )
}

