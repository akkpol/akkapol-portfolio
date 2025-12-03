/**
 * Migration Script: profile.json → Firebase Firestore
 * 
 * This script uploads your existing profile.json data to Firebase Firestore.
 * Run this ONCE after setting up Firebase to initialize your database.
 * 
 * Usage: node scripts/migrate-to-firebase.js
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// Load profile data
const profilePath = path.join(__dirname, '../data/profile.json');
const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

// Initialize Firebase Admin (you'll need to download service account key)
// Get it from: Firebase Console > Project Settings > Service Accounts > Generate New Private Key
const serviceAccountPath = path.resolve(__dirname, 'firebase-service-account.json');

console.log('🔍 Looking for service account at:', serviceAccountPath);

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: firebase-service-account.json not found!');
  console.log('\n📝 To get your service account key:');
  console.log('1. Go to Firebase Console > Project Settings');
  console.log('2. Click "Service Accounts" tab');
  console.log('3. Click "Generate New Private Key"');
  console.log('4. Save as scripts/firebase-service-account.json\n');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function migrateData() {
  try {
    console.log('🚀 Starting migration...\n');
    
    // Upload to Firestore
    const docRef = db.collection('profiles').doc('main-profile');
    await docRef.set(profileData);
    
    console.log('✅ Successfully migrated profile data to Firestore!');
    console.log('📊 Data uploaded to: profiles/main-profile\n');
    
    // Display summary
    console.log('📈 Migration Summary:');
    console.log(`   - Experience entries: ${profileData.experience?.length || 0}`);
    console.log(`   - Skill groups: ${profileData.skills?.length || 0}`);
    console.log(`   - Certifications: ${profileData.certifications?.length || 0}`);
    console.log(`   - Education entries: ${profileData.education?.length || 0}`);
    
    console.log('\n✨ Migration complete! You can now delete:');
    console.log('   - data/profile.json (if you want)');
    console.log('   - scripts/firebase-service-account.json (keep it safe!)\n');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
