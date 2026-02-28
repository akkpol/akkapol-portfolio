# Newcomer Guide (Thai)

เอกสารนี้สรุปภาพรวมโค้ดเบสสำหรับคนที่เพิ่งเข้ามาในโปรเจกต์ `akkapol-portfolio` ว่าโครงสร้างเป็นอย่างไร อะไรคือจุดสำคัญ และควรเรียนรู้อะไรต่อ

## 1) โปรเจกต์นี้คืออะไร

เป็นเว็บ Portfolio + AI Consultant ที่พัฒนาด้วย Next.js (App Router) โดยมีฟีเจอร์หลัก 4 ส่วน:

1. **หน้า Public Portfolio** สำหรับนำเสนอบริการและตัวตน
2. **Dashboard หลังบ้าน** สำหรับแก้ไขข้อมูลโปรไฟล์
3. **Authentication/Authorization** ผ่าน NextAuth + Google OAuth (เช็กสิทธิ์ admin)
4. **AI Chat + LIFF integration** สำหรับใช้งานผู้ช่วย AK3 และหน้าสำหรับ LINE LIFF

## 2) โครงสร้างโฟลเดอร์หลัก

- `app/` — App Router ของ Next.js
  - `app/page.tsx` หน้า Landing หลัก
  - `app/layout.tsx` layout กลาง, SEO metadata, providers
  - `app/dashboard/page.tsx` หน้าหลังบ้านแก้ข้อมูลโปรไฟล์
  - `app/api/` API routes (เช่น profile, auth)
  - `app/actions/` Server Actions (เช่น chat)
- `components/` — UI components แยกตามโดเมน
  - `components/sections/` ส่วนต่างๆ ของหน้า public
  - `components/admin/` ฟอร์มใน dashboard
  - `components/ui/` component ใช้ซ้ำ/interactive
- `lib/` — integrations ภายนอก
  - `lib/firebase.ts` Firebase client
  - `lib/firebase-admin.ts` Firebase admin helper (server-side)
  - `lib/ai/gemini.ts` AI model + system prompt
- `types/` — TypeScript contracts (โครงข้อมูลหลัก)
- `utils/` — utility และ validation
- `data/` — ข้อมูลตั้งต้น (เช่น `profile.json`)
- `scripts/` — สคริปต์ช่วยงาน dev/ops (เช็ก env, migration)
- `public/` — static assets (รูป, PDF, manifest)

## 3) Data flow สำคัญที่ต้องเข้าใจ

### 3.1 Profile Data

- โครงข้อมูลหลักกำหนดใน `types/index.ts` เป็น `LinkedInData`
- Dashboard (`app/dashboard/page.tsx`) โหลดข้อมูลผ่าน `/api/profile`
- API route (`app/api/profile/route.ts`) อ่าน/เขียน Firestore
- ก่อนบันทึกมี validation ผ่าน `utils/validation.ts`

สรุป: **UI form → API route → validation → Firestore**

### 3.2 Auth & Authorization

- ตั้งค่าที่ `auth.config.ts` และ export handlers จาก `auth.ts`
- `/dashboard` ต้อง login และ role เป็น `admin`
- role มาจาก email ที่อยู่ใน `ADMIN_EMAILS`

สรุป: **Google Sign-in → JWT/session callback กำหนด role → middleware/authorized callback บังคับสิทธิ์**

### 3.3 AI Chat

- Frontend เรียก server action `generateChatReply` (`app/actions/chat.ts`)
- server action เรียก Gemini model จาก `lib/ai/gemini.ts`
- ใช้ `GEMINI_API_KEY` และ system prompt ภาษาไทยสำหรับ persona AK3 Assistant

## 4) สิ่งสำคัญที่ผู้มาใหม่ควรรู้ก่อนแก้โค้ด

1. **Environment Variables สำคัญมาก**
   - เริ่มจาก `env.example`
   - รัน `npm run check-env` ก่อนเริ่มงาน
2. **ต้องเข้าใจขอบเขต client/server**
   - ไฟล์ที่มี `"use client"` จะรันฝั่ง browser
   - API routes/Server actions เป็น server-side
3. **ข้อมูลจริงอยู่ที่ Firestore**
   - `data/profile.json` ใช้เป็นข้อมูลตั้งต้น/อ้างอิงเท่านั้น
4. **เส้นทาง auth แยกชัดเจน**
   - ผู้ใช้ทั่วไปดูหน้า public ได้
   - หน้า dashboard ต้องเป็น admin
5. **Prompt ของ AI เป็น business logic**
   - ปรับ prompt ใน `lib/ai/gemini.ts` กระทบคุณภาพคำตอบโดยตรง

## 5) ถ้าจะเริ่มเรียนรู้ต่อ แนะนำลำดับนี้

### ระดับ 1: เข้าใจภาพรวมให้เร็ว

1. อ่าน `README.md` + `package.json` เพื่อรู้ script และ stack
2. อ่าน `app/layout.tsx` และ `app/page.tsx` เพื่อเข้าใจโครงแอป
3. เปิด dev server แล้วคลิก flow หลักให้ครบ (home, signin, dashboard)

### ระดับ 2: เข้าใจข้อมูลและสิทธิ์

1. อ่าน `types/index.ts` ให้แม่น (source of truth ของข้อมูล)
2. อ่าน `app/api/profile/route.ts` + `utils/validation.ts`
3. อ่าน `auth.config.ts` + `middleware.ts`

### ระดับ 3: เข้าใจ integration ภายนอก

1. Firebase client/admin (`lib/firebase.ts`, `lib/firebase-admin.ts`)
2. AI flow (`app/actions/chat.ts`, `lib/ai/gemini.ts`)
3. LIFF page (`app/liff/chat/page.tsx`)

### ระดับ 4: เพิ่มคุณภาพโค้ด

1. รัน unit test (`npm test`) และดูตัวอย่างใน `utils/validation.test.ts`
2. รัน e2e (`npm run e2e`) เพื่อเข้าใจ user journey
3. ปรับปรุง README ให้สะท้อนระบบจริงมากขึ้น

## 6) Checklist สั้นๆ สำหรับวันแรก

- [ ] คัดลอก `env.example` เป็น `.env.local` แล้วใส่ค่า
- [ ] รัน `npm install`
- [ ] รัน `npm run check-env`
- [ ] รัน `npm run dev`
- [ ] ทดสอบหน้า `/`, `/auth/signin`, `/dashboard`
- [ ] อ่านไฟล์ที่ระบุใน “ระดับ 2” ให้ครบ

---

ถ้าทีมต้อง onboarding คนเพิ่มบ่อย แนะนำให้ย้ายเนื้อหาเอกสารนี้ไปขยายใน `README.md` เพื่อให้เข้าถึงง่ายขึ้น
