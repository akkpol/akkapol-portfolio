# 🤖 Akkapol Portfolio - 2026 Re-Architecture Requirements (Local SEO & LIFF)

## เป้าหมายหลัก

ปรับโฉม Portfolio ให้เป็นศูนย์กลาง Personal Branding ประจำปี 2026 สำหรับ "IT & Tech Integrator" บนพื้นฐานของ "Entity SEO" เน้นชู E-E-A-T และรองรับระบบ Local SEO สำหรับทำตลาด B2B ในพื้นที่ กทม. และ นนทบุรี ที่สำคัญต้องเป็นฐาน Backend สำหรับ LINE LIFF AI Assistant ได้ด้วย

## 1. 2026 Personal Branding & Local SEO (Frontend)

- **Local & Entity SEO:**
  - ปรับ Title Tag และ Meta Description โดยแทรกคีย์เวิร์ดพื้นที่: "SME", "กรุงเทพฯ", "นนทบุรี", "ปริมณฑล"
  - ฝัง Schema Markup แบบ `Person` / `Organization` / `LocalBusiness` เพื่อเสริมความน่าเชื่อถือ
- **Content & E-E-A-T Optimization:**
  - นำเสนอในฐานะ "คู่คิดทางธุรกิจ" (Reasoning Partner) และผู้เชี่ยวชาญด้าน Business Automation / AI Agent
  - นำข้อความที่ผู้ใช้ระบุใหม่มาใช้แทนเนื้อหา Resume เดิม เพื่อเน้นเจาะกลุ่ม SME
- **Typography & Modern UI/UX:**
  - ใช้ฟอนต์ไทยที่มีรูปทรงทันสมัย คลีนระดับพรีเมียม (เช่น Prompt, Noto Sans Thai รูปแบบร่วมกับ Inter สำหรับภาษาอังกฤษ)
  - ผสมผสาน Background 3D Anti-Gravity Point Cloud Face เพิ่มมิติทางเทคโนโลยี (Technical Capability) โดยควบคุมไม่ให้รบกวนความเร็วในการโหลด (Core Web Vitals)

## 2. LINE LIFF & AI Assistant Backend Architecture

- **Objective:** เป็นฐานระบบหลังบ้าน (Backend Foundation) สำหรับ LINE Official Account Bot ให้ผู้ใช้ปรึกษากับ AI ของ Akkapol ได้
- **Next.js API Routes (Serverless Backend):**
  - สร้าง Endpoint ยืนยันตัวตน (`/api/webhook/line/...`) ที่ปลอดภัยสำหรับรับ LINE Events
  - ทำ Server Action หรือ Route สำหรับดึงข้อมูลจาก Gemini API (แทนที่เป็น Client-side)
- **Architecture Pattern:**
  - **Client-Side:** สร้างหน้าเพจที่ปรับให้เหมาะสำหรับหน้าจอในแอป LINE (LIFF Browser) จัดการสถานะการเข้าสู่ระบบผ่าน `liff.init()`
  - **Server-Side:** ฟังก์ชันไร้รันไทม์ (Serverless) ในการประมวลผล NLP ผ่าน Gemini และส่งข้อความกลับไปหา LINE Messaging API

## 3. โครงสร้างโปรเจกต์ (Clean Architecture)

- **/app/page.tsx**: หน้า Public Portfolio ที่เน้นทำอันดับ SEO และอธิบายตัวตน
- **/app/(liff)/...**: หน้าเพจเฉพาะกิจที่ให้เปิดผ่าน LINE LIFF เท่านั้น
- **/app/api/webhook/line/...**: Endpoint สำหรับสื่อสารกับเซอร์ฟเวอร์ LINE (Webhook)
- **/components/3d/...**: แยก Component แบบ 3D ออกจาก Main thread เพื่อดูแลรักษาโค้ดให้คลีน
- **/lib/ai/...**: จุดศูนย์รวมคำสั่ง Prompt และการทำงานของ Gemini AI

## 4. Technical Stack Update

- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **Styling:** Tailwind CSS + Framer Motion
- **Typography:** Google Fonts (Prompt, Inter)
- **3D:** Three.js (ผ่าน React `useEffect` หรือ `@react-three/fiber`)
- **Integration:** LINE LIFF SDK (`@line/liff`), LINE Messaging API SDK
- **AI:** Google Gemini API (`@google/generative-ai`)
- **Metadata/SEO:** Next.js Metadata API, Schema Markup
