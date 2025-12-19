/**
 * Environment Variables Checker
 * รัน: node scripts/check-env.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 กำลังตรวจสอบ Environment Variables...\n');

const envPath = path.join(__dirname, '../.env.local');
const envExamplePath = path.join(__dirname, '../env.example');

// อ่าน env.example เพื่อดูว่าต้องมีอะไรบ้าง
let requiredVars = [];
if (fs.existsSync(envExamplePath)) {
  const exampleContent = fs.readFileSync(envExamplePath, 'utf8');
  requiredVars = exampleContent
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#') && line.includes('='))
    .map(line => line.split('=')[0].trim());
}

// อ่าน .env.local
let envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
} else {
  console.log('❌ ไม่พบไฟล์ .env.local\n');
  console.log('💡 วิธีแก้:');
  console.log('   1. คัดลอก env.example เป็น .env.local');
  console.log('   2. ใส่ค่าจริงใน .env.local\n');
  process.exit(1);
}

console.log('📋 สรุป Environment Variables:\n');

// ตรวจสอบแต่ละตัว
let allGood = true;
const categories = {
  'NextAuth': ['NEXTAUTH_SECRET', 'NEXTAUTH_URL'],
  'Google OAuth': ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
  'Firebase': [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ]
};

Object.entries(categories).forEach(([category, vars]) => {
  console.log(`\n📦 ${category}:`);
  vars.forEach(varName => {
    const value = envVars[varName];
    if (value && value.length > 0) {
      // ซ่อนค่าจริง (แสดงแค่ 4 ตัวแรก)
      const displayValue = value.length > 8 
        ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
        : '***';
      console.log(`   ✅ ${varName} = ${displayValue}`);
    } else {
      console.log(`   ⚠️  ${varName} = (ว่าง)`);
      if (category === 'Google OAuth') {
        console.log(`      ℹ️  ไม่บังคับสำหรับ local development`);
      } else {
        allGood = false;
      }
    }
  });
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('\n✅ Environment Variables ครบถ้วน!');
  console.log('💡 รัน npm run dev เพื่อเริ่มต้น dev server\n');
} else {
  console.log('\n⚠️  มี Environment Variables บางตัวที่ยังว่าง');
  console.log('💡 กรุณาเติมค่าที่ขาดในไฟล์ .env.local\n');
}

