# Firebase Testing Guide - Confirm Firebase is Working

## 🔥 **How to Test Firebase Integration**

### **Step 1: Check Browser Console**

1. **Open your HRIS application** in the browser
2. **Open Developer Tools** (F12 or right-click → Inspect)
3. **Go to Console tab**
4. **Look for these messages:**

#### ✅ **Firebase Working (Good Messages):**
```
✅ Firebase initialized successfully
Using Firebase Employee Service
```

#### ❌ **Firebase Not Working (Error Messages):**
```
⚠️ Firebase not available. Please install Firebase: npm install firebase
⚠️ Falling back to Mock service
Using Mock Employee Service
```

### **Step 2: Test Employee Management with Firebase**

1. **Go to Employee Management page**
2. **Try to add a new employee:**
   - Click "Add Employee"
   - Fill in the form (Name, Email, Role, Department)
   - Click "Add Employee"
3. **Check if the employee appears in the list**
4. **Try to edit and delete employees**

### **Step 3: Check Firebase Console**

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Select your project:** `hris-system-baa22`
3. **Go to Firestore Database**
4. **Check if you see a `employees` collection**
5. **Look for employee documents being created**

## 🔧 **Manual Firebase Testing**

### **Test 1: Check Firebase Configuration**

Open your browser console and run:

```javascript
// Check if Firebase is loaded
console.log('Firebase app:', window.firebase);

// Check if Firestore is available
console.log('Firestore:', window.firebase?.firestore);

// Check your config
console.log('Firebase config:', {
  apiKey: "AIzaSyC6ovwlhX4Mr8WpHoS045wLxHA7t8fRXPI",
  projectId: "hris-system-baa22"
});
```

### **Test 2: Test Firebase Connection**

Add this test code to your browser console:

```javascript
// Test Firebase connection
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6ovwlhX4Mr8WpHoS045wLxHA7t8fRXPI",
  authDomain: "hris-system-baa22.firebaseapp.com",
  projectId: "hris-system-baa22",
  storageBucket: "hris-system-baa22.firebasestorage.app",
  messagingSenderId: "563898942372",
  appId: "1:563898942372:web:8c5ebae1dfaf072858b731",
  measurementId: "G-1DJP5DJX92"
};

try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log('✅ Firebase connection successful!');
  
  // Test adding a document
  const testDoc = await addDoc(collection(db, 'test'), {
    message: 'Firebase is working!',
    timestamp: new Date()
  });
  console.log('✅ Test document added:', testDoc.id);
  
  // Test reading documents
  const querySnapshot = await getDocs(collection(db, 'test'));
  console.log('✅ Documents read:', querySnapshot.size);
  
} catch (error) {
  console.error('❌ Firebase test failed:', error);
}
```

## 🚨 **Common Firebase Issues & Solutions**

### **Issue 1: "Firebase not available"**
**Solution:**
```bash
npm install firebase
```

### **Issue 2: "Permission denied"**
**Solution:**
1. Go to Firebase Console
2. Go to Firestore Database → Rules
3. Update rules to allow read/write:

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

### **Issue 3: "Network error"**
**Solution:**
1. Check your internet connection
2. Check if Firebase project is active
3. Verify API key is correct

### **Issue 4: "CORS error"**
**Solution:**
1. Go to Firebase Console
2. Go to Authentication → Settings → Authorized domains
3. Add your domain (localhost for development)

## 📊 **Firebase Status Indicators**

### **In Your Application:**

#### **Employee Management Page:**
- **Firebase Working:** Employees are saved and persist after refresh
- **Firebase Not Working:** Employees disappear after refresh (using Mock service)

#### **Browser Console:**
- **Firebase Working:** `✅ Firebase initialized successfully`
- **Firebase Not Working:** `⚠️ Firebase not available, falling back to Mock service`

#### **Network Tab:**
- **Firebase Working:** You'll see requests to `firestore.googleapis.com`
- **Firebase Not Working:** No external network requests

## 🔍 **Advanced Testing**

### **Test Firebase Authentication (if implemented):**
```javascript
import { getAuth, signInAnonymously } from 'firebase/auth';

const auth = getAuth();
signInAnonymously(auth)
  .then(() => console.log('✅ Firebase Auth working'))
  .catch(error => console.error('❌ Firebase Auth failed:', error));
```

### **Test Firebase Storage (if implemented):**
```javascript
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();
const storageRef = ref(storage, 'test.txt');
const testData = 'Hello Firebase!';

uploadBytes(storageRef, testData)
  .then(() => console.log('✅ Firebase Storage working'))
  .catch(error => console.error('❌ Firebase Storage failed:', error));
```

## 📋 **Quick Checklist**

- [ ] Firebase SDK installed (`npm install firebase`)
- [ ] Browser console shows "✅ Firebase initialized successfully"
- [ ] Employee Management shows "Using Firebase Employee Service"
- [ ] Employees persist after page refresh
- [ ] Firebase Console shows documents in Firestore
- [ ] No CORS or permission errors in console
- [ ] Network requests to firestore.googleapis.com visible

## 🎯 **Expected Results**

### **When Firebase is Working:**
1. ✅ Console: "Firebase initialized successfully"
2. ✅ Employee Management: "Using Firebase Employee Service"
3. ✅ Employees saved to Firebase (persist after refresh)
4. ✅ Firebase Console shows employee documents
5. ✅ No errors in browser console

### **When Firebase is Not Working:**
1. ❌ Console: "Firebase not available, falling back to Mock service"
2. ❌ Employee Management: "Using Mock Employee Service"
3. ❌ Employees disappear after page refresh
4. ❌ No documents in Firebase Console
5. ❌ Errors in browser console

## 🚀 **Quick Test Commands**

Run these in your terminal:

```bash
# Check if Firebase is installed
npm list firebase

# Check Firebase version
npm list firebase --depth=0

# Reinstall Firebase if needed
npm install firebase@latest
```

## 📞 **If Firebase Still Not Working**

1. **Check your internet connection**
2. **Verify Firebase project is active**
3. **Check API key and project ID**
4. **Clear browser cache and reload**
5. **Restart development server:**
   ```bash
   npm run dev
   ```

Your Firebase integration should now be working! 🔥
