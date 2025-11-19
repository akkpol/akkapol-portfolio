'use client';
import { Certification } from "@/types"
import { Plus, Trash2 } from "lucide-react"

interface CertificationsFormProps {
  data: Certification[]
  onChange: (data: Certification[]) => void
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const updateCert = (index: number, field: keyof Certification, value: string) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const addCert = () => {
    onChange([...data, { name: '', issuer: '', year: '' }])
  }

  const removeCert = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {data.map((cert, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ใบรับรอง #{index + 1}
            </h3>
            <button
              onClick={() => removeCert(index)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ชื่อใบรับรอง
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCert(index, 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ผู้ให้ใบรับรอง
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCert(index, 'issuer', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ปีที่ได้รับ
              </label>
              <input
                type="text"
                value={cert.year}
                onChange={(e) => updateCert(index, 'year', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                รูปภาพ (URL หรือ path)
              </label>
              <input
                type="text"
                value={cert.image || ''}
                onChange={(e) => updateCert(index, 'image', e.target.value)}
                placeholder="/path/to/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                PDF (URL หรือ path)
              </label>
              <input
                type="text"
                value={cert.pdf || ''}
                onChange={(e) => updateCert(index, 'pdf', e.target.value)}
                placeholder="/path/to/certificate.pdf"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo (URL หรือ path)
              </label>
              <input
                type="text"
                value={cert.logo || ''}
                onChange={(e) => updateCert(index, 'logo', e.target.value)}
                placeholder="/path/to/logo.jpg"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addCert}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        <span>เพิ่มใบรับรอง</span>
      </button>
    </div>
  )
}

