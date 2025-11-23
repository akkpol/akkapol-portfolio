# การตั้งค่าระบบ Login ด้วย Google OAuth

## ขั้นตอนการตั้งค่า

### 1. สร้าง Google OAuth Credentials

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจกต์ใหม่หรือเลือกโปรเจกต์ที่มีอยู่
3. ไปที่ **APIs & Services** > **Credentials**
4. คลิก **Create Credentials** > **OAuth client ID**
5. เลือก **Web application**
6. ตั้งค่า:
   - **Name**: ชื่อโปรเจกต์ของคุณ
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (สำหรับ development)
     - `https://yourdomain.com` (สำหรับ production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (สำหรับ development)
     - `https://yourdomain.com/api/auth/callback/google` (สำหรับ production)
7. คลิก **Create** และคัดลอก **Client ID** และ **Client Secret**

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ใน root directory ของโปรเจกต์:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**สร้าง NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 3. สำหรับ Production

เมื่อ deploy ไปยัง production:

- เปลี่ยน `NEXTAUTH_URL` เป็น URL ของเว็บไซต์จริง
- เพิ่ม redirect URI ใน Google Cloud Console
- ตั้งค่า environment variables ใน hosting platform (Vercel, Netlify, etc.)

## โครงสร้างไฟล์ที่สร้างขึ้น

- `auth.config.ts` - Configuration สำหรับ NextAuth
- `auth.ts` - NextAuth instance
- `middleware.ts` - Middleware สำหรับตรวจสอบ authentication
- `app/api/auth/[...nextauth]/route.ts` - API route สำหรับ NextAuth
- `app/auth/signin/page.tsx` - หน้า Sign In
- `components/AuthButton.tsx` - Component สำหรับแสดงปุ่ม Login/Logout
- `components/Providers.tsx` - SessionProvider wrapper

## การใช้งาน

1. ผู้ใช้คลิกปุ่ม "Sign In" ใน header
2. ถูก redirect ไปยังหน้า `/auth/signin`
3. คลิก "Continue with Google"
4. ถูก redirect ไปยัง Google OAuth
5. หลังจาก login สำเร็จ จะกลับมาที่หน้าแรกพร้อม session

## หมายเหตุ

- **ไม่จำเป็นต้องแยก backend** - Next.js API Routes ใช้เป็น backend ได้
- ระบบใช้ NextAuth.js v5 (beta) ซึ่งเป็นเวอร์ชันล่าสุด
- Session ถูกเก็บใน cookies (default)
- สามารถปรับแต่ง callbacks และ middleware ตามต้องการ
