import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

let adminApp: App | undefined;
let adminDb: Firestore | undefined;

function getAdminApp(): App {
  if (adminApp) {
    return adminApp;
  }

  // Check if already initialized
  const existingApp = getApps()[0];
  if (existingApp) {
    adminApp = existingApp;
    return adminApp;
  }

  let serviceAccount: any = null;

  // Option 1: Try environment variable (recommended for Vercel)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (error) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', error);
      throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT environment variable');
    }
  } 
  // Option 2: Try service account file (for local development)
  else {
    const serviceAccountPath = path.resolve(process.cwd(), 'scripts', 'firebase-service-account.json');
    if (fs.existsSync(serviceAccountPath)) {
      try {
        const fileContent = fs.readFileSync(serviceAccountPath, 'utf8');
        serviceAccount = JSON.parse(fileContent);
      } catch (error) {
        console.error('Failed to read service account file:', error);
      }
    }
  }

  // Initialize with service account
  if (serviceAccount) {
    try {
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id,
      });
    } catch (error) {
      console.error('Failed to initialize Firebase Admin with service account:', error);
      throw new Error('Firebase Admin initialization failed');
    }
  } else {
    // Fallback: Try Application Default Credentials (for some cloud environments)
    try {
      adminApp = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error);
      throw new Error(
        'Firebase Admin initialization failed. ' +
        'Please set FIREBASE_SERVICE_ACCOUNT environment variable or ' +
        'place firebase-service-account.json in scripts/ directory.'
      );
    }
  }

  return adminApp;
}

export function getAdminDb(): Firestore {
  if (adminDb) {
    return adminDb;
  }

  const app = getAdminApp();
  adminDb = getFirestore(app);
  return adminDb;
}

