# วิธีตั้งค่า Environment Variables ใน Vercel (ขั้นตอนที่ 3)

## ขั้นตอนการตั้งค่า Environment Variables ใน Vercel

### 3.1 ตรวจสอบ URL ของเว็บไซต์ใน Vercel

1. ไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
2. เลือกโปรเจกต์ **akkapol-portfolio**
3. ดู URL ของเว็บไซต์ (เช่น `https://akkapol-portfolio.vercel.app` หรือ domain ที่ตั้งเอง)
   - URL นี้จะแสดงในหน้า Overview หรือใน Deployments

### 3.2 เพิ่ม Redirect URI ใน Google Cloud Console

1. กลับไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. ไปที่ **APIs & Services** > **Credentials**
3. คลิกที่ OAuth Client ID ที่สร้างไว้
4. ในส่วน **Authorized redirect URIs** เพิ่ม:
   - `https://akkapol-portfolio.vercel.app/api/auth/callback/google`
   - (แทนที่ `your-vercel-url` ด้วย URL จริงจาก Vercel)
   - ตัวอย่าง: `https://akkapol-portfolio.vercel.app/api/auth/callback/google`
5. คลิก **Save**

### 3.3 ตั้งค่า Environment Variables ใน Vercel

1. ไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
2. เลือกโปรเจกต์ **akkapol-portfolio**
3. ไปที่ **Settings** (ตั้งค่า) ในเมนูด้านบน
4. คลิก **Environment Variables** ในเมนูด้านซ้าย
5. เพิ่ม environment variables ต่อไปนี้ทีละตัว:

#### NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://akkapol-portfolio.vercel.app` (หรือ URL จริงที่คุณได้รับจาก Vercel)
  - ตัวอย่าง: `https://akkapol-portfolio.vercel.app`
- **Environment**: เลือก **Production**, **Preview**, และ **Development** (หรือเลือกทั้งหมด)
- คลิก **Save**

#### NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: คัดลอกจากไฟล์ `.env.local` ในเครื่อง (ค่าเดียวกันที่ใช้ใน development)
  - ตัวอย่าง: `ThmXS6+LDEoNiw8HuTcZvPQaY5AFc8CkxxQJRYFJTfs=`
- **Environment**: เลือก **Production**, **Preview**, และ **Development**
- คลิก **Save**

#### GOOGLE_CLIENT_ID
- **Key**: `GOOGLE_CLIENT_ID`
- **Value**: คัดลอกจาก Google Cloud Console (Client ID)
  - ตัวอย่าง: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- **Environment**: เลือก **Production**, **Preview**, และ **Development**
- คลิก **Save**

#### GOOGLE_CLIENT_SECRET
- **Key**: `GOOGLE_CLIENT_SECRET`
- **Value**: คัดลอกจาก Google Cloud Console (Client Secret)
  - ตัวอย่าง: `GOCSPX-abcdefghijklmnopqrstuvwxyz`
- **Environment**: เลือก **Production**, **Preview**, และ **Development**
- คลิก **Save**

#### ADMIN_EMAILS
- **Key**: `ADMIN_EMAILS`
- **Value**: `akkapol.kumpapug@gmail.com` (หรือหลายอีเมลคั่นด้วย comma)
  - ตัวอย่างหลายอีเมล: `email1@gmail.com,email2@gmail.com`
- **Environment**: เลือก **Production**, **Preview**, และ **Development**
- คลิก **Save**

### 3.4 Redeploy เว็บไซต์

หลังจากตั้งค่า environment variables แล้ว:

1. ไปที่ **Deployments** ในเมนูด้านบน
2. คลิกที่ deployment ล่าสุด (หรือ deployment ที่ต้องการ)
3. คลิก **...** (เมนู) ด้านขวาบน
4. เลือก **Redeploy**
5. หรือ push code ใหม่ไปที่ GitHub (Vercel จะ deploy อัตโนมัติ)
6. Vercel จะ deploy ใหม่พร้อม environment variables ที่ตั้งค่าไว้

### 3.5 ตรวจสอบการทำงาน

1. เปิดเว็บไซต์ที่ URL จาก Vercel
2. คลิกปุ่ม "Sign In" หรือไปที่ `/auth/signin`
3. ลอง login ด้วย Google
4. ตรวจสอบว่าสามารถเข้าถึง `/dashboard` ได้ (ถ้าเป็น admin)

## วิธีดู Environment Variables ที่ตั้งค่าไว้

1. ไปที่ **Settings** > **Environment Variables**
2. จะเห็นรายการ environment variables ทั้งหมดที่ตั้งค่าไว้
3. สามารถแก้ไขหรือลบได้โดยคลิกที่ตัวแปรนั้น

## หมายเหตุสำคัญ

- ✅ Environment variables จะถูกใช้ทันทีหลังจาก redeploy
- ✅ ต้อง redeploy หลังจากเพิ่มหรือแก้ไข environment variables
- ✅ ตรวจสอบให้แน่ใจว่า Redirect URI ใน Google Cloud Console ตรงกับ URL ใน Vercel
- ⚠️ ถ้า login ไม่ได้ ให้ตรวจสอบว่า:
  - Redirect URI ใน Google Cloud Console ตรงกับ URL ใน Vercel
  - Environment variables ถูกตั้งค่าถูกต้อง (ไม่มี space หรือ typo)
  - ได้ทำการ redeploy แล้ว
  - URL ใน NEXTAUTH_URL ตรงกับ URL จริงของเว็บไซต์

## ตัวอย่าง Environment Variables ที่ตั้งค่าแล้ว

```
NEXTAUTH_URL=https://akkapol-portfolio.vercel.app
NEXTAUTH_SECRET=ThmXS6+LDEoNiw8HuTcZvPQaY5AFc8CkxxQJRYFJTfs=
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
ADMIN_EMAILS=akkapol.kumpapug@gmail.com
```

