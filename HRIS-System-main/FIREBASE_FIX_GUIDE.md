# Firebase Fix Guide - When Firebase is Not Working

## 🚨 **Firebase Not Working - Let's Fix It!**

### **Step 1: Check What's Wrong**

First, let's identify the issue. Open your browser console (F12) and look for these messages:

#### **Common Error Messages:**
- `⚠️ Firebase not available. Please install Firebase: npm install firebase`
- `⚠️ Falling back to Mock service`
- `Using Mock Employee Service`
- `Cannot find module 'firebase/app'`
- `Permission denied`
- `Network error`

## 🔧 **Step-by-Step Fix**

### **Fix 1: Install Firebase SDK**

```bash
# Navigate to your project
cd C:\Users\ACER\Downloads\HRIS-System-main\HRIS-System-main

# Install Firebase
npm install firebase

# Check if it's installed
npm list firebase
```

### **Fix 2: Check Firebase Installation**

Run this command to verify Firebase is installed:

```bash
npm list firebase --depth=0
```

**Expected output:**
```
firebase@10.7.0
```

### **Fix 3: Restart Development Server**

```bash
# Stop the server (Ctrl + C)
# Then restart
npm run dev
```

### **Fix 4: Check Firebase Console Settings**

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Select your project:** `hris-system-baa22`
3. **Go to Project Settings** (gear icon)
4. **Check if the project is active**
5. **Verify your API key is correct**

### **Fix 5: Update Firestore Rules**

1. **Go to Firebase Console**
2. **Go to Firestore Database → Rules**
3. **Update rules to allow read/write:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // For testing only
    }
  }
}
```

4. **Click "Publish"**

### **Fix 6: Check Network Connection**

1. **Open browser Developer Tools (F12)**
2. **Go to Network tab**
3. **Refresh the page**
4. **Look for requests to `firestore.googleapis.com`**
5. **Check if there are any failed requests**

### **Fix 7: Clear Browser Cache**

1. **Hard refresh:** `Ctrl + F5`
2. **Or clear cache:** `Ctrl + Shift + Delete`
3. **Restart browser**

## 🧪 **Test Firebase After Fix**

### **Test 1: Browser Console Test**

Open browser console and run:

```javascript
// Test Firebase availability
console.log('Testing Firebase...');

// Check if Firebase is loaded
if (typeof window !== 'undefined') {
  console.log('Window available');
  
  // Try to import Firebase
  import('firebase/app').then(() => {
    console.log('✅ Firebase app module available');
  }).catch(error => {
    console.error('❌ Firebase app module not available:', error);
  });
}
```

### **Test 2: Employee Management Test**

1. **Go to Employee Management page**
2. **Add a new employee**
3. **Refresh the page**
4. **Check if employee persists**

### **Test 3: Check Console Messages**

Look for these messages in browser console:

#### ✅ **Good Messages:**
```
✅ Firebase initialized successfully
Using Firebase Employee Service
```

#### ❌ **Bad Messages:**
```
⚠️ Firebase not available
⚠️ Falling back to Mock service
Using Mock Employee Service
```

## 🚨 **Common Issues & Solutions**

### **Issue 1: "Cannot find module 'firebase/app'"**
**Solution:**
```bash
npm install firebase@latest
npm run dev
```

### **Issue 2: "Permission denied"**
**Solution:**
1. Go to Firebase Console → Firestore → Rules
2. Set rules to: `allow read, write: if true;`
3. Click "Publish"

### **Issue 3: "Network error"**
**Solution:**
1. Check internet connection
2. Check if Firebase project is active
3. Verify API key in Firebase Console

### **Issue 4: "CORS error"**
**Solution:**
1. Go to Firebase Console → Authentication → Settings
2. Add `localhost` to authorized domains

### **Issue 5: "Firebase not initialized"**
**Solution:**
1. Check if Firebase config is correct
2. Restart development server
3. Clear browser cache

## 🔍 **Advanced Debugging**

### **Check Firebase Configuration**

Open `src/config/firebase.ts` and verify:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyC6ovwlhX4Mr8WpHoS045wLxHA7t8fRXPI",
  authDomain: "hris-system-baa22.firebaseapp.com",
  projectId: "hris-system-baa22",
  storageBucket: "hris-system-baa22.firebasestorage.app",
  messagingSenderId: "563898942372",
  appId: "1:563898942372:web:8c5ebae1dfaf072858b731",
  measurementId: "G-1DJP5DJX92"
};
```

### **Check Package.json**

Make sure `package.json` has:

```json
{
  "dependencies": {
    "firebase": "^10.7.0"
  }
}
```

### **Check Node.js Version**

```bash
node --version
# Should be 16+ for Firebase v10
```

## 📋 **Complete Fix Checklist**

- [ ] Firebase SDK installed (`npm install firebase`)
- [ ] Development server restarted (`npm run dev`)
- [ ] Browser cache cleared (Ctrl + F5)
- [ ] Firebase Console project active
- [ ] Firestore rules updated to allow read/write
- [ ] API key verified in Firebase Console
- [ ] Network connection stable
- [ ] Console shows "✅ Firebase initialized successfully"
- [ ] Employee Management shows "Using Firebase Employee Service"
- [ ] Employees persist after page refresh

## 🎯 **Expected Results After Fix**

1. ✅ **Console:** "Firebase initialized successfully"
2. ✅ **Employee Management:** "Using Firebase Employee Service"
3. ✅ **Employees:** Persist after page refresh
4. ✅ **Firebase Console:** Shows employee documents
5. ✅ **Network:** Requests to firestore.googleapis.com
6. ✅ **No errors:** In browser console

## 🚀 **Quick Fix Commands**

```bash
# Complete fix sequence
cd C:\Users\ACER\Downloads\HRIS-System-main\HRIS-System-main
npm install firebase@latest
npm run dev
```

Then:
1. Open browser console (F12)
2. Look for "✅ Firebase initialized successfully"
3. Test Employee Management
4. Check if employees persist after refresh

## 📞 **If Still Not Working**

If Firebase still doesn't work after all fixes:

1. **Check your internet connection**
2. **Verify Firebase project is not suspended**
3. **Try a different browser**
4. **Check if your firewall is blocking Firebase**
5. **Contact Firebase support if needed**

Your Firebase should be working after following these steps! 🔥
