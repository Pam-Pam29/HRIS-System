# Firebase Setup for HRIS System

## 🔥 Firebase Configuration

Your Firebase project is already configured with the following details:
- **Project ID**: `hris-system-baa22`
- **API Key**: `AIzaSyC6ovwlhX4Mr8WpHoS045wLxHA7t8fRXPI`
- **Auth Domain**: `hris-system-baa22.firebaseapp.com`

## 📦 Install Firebase Dependencies

To enable Firebase integration, you need to install the Firebase SDK:

```bash
npm install firebase
```

## 🔧 Firebase Console Setup

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `hris-system-baa22`
3. **Enable Firestore Database**:
   - Go to "Firestore Database" in the left sidebar
   - Click "Create Database"
   - Choose "Start in test mode" (for development)
   - Select a location (choose the closest to your users)

## 📋 Firestore Security Rules

Update your Firestore security rules to allow read/write access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to employees collection
    match /employees/{document} {
      allow read, write: if true; // For development - change this for production
    }
  }
}
```

## 🚀 Enable Firebase Services

### 1. Authentication (Optional)
- Go to "Authentication" in Firebase Console
- Click "Get Started"
- Enable Email/Password authentication

### 2. Analytics (Already configured)
- Analytics is already configured in your project
- Measurement ID: `G-1DJP5DJX92`

## 🔄 Switching Between Services

The system automatically detects Firebase availability:

- **With Firebase installed**: Uses Firebase Firestore
- **Without Firebase**: Falls back to Mock service

### Manual Service Selection

You can manually control which service to use by editing `src/config/firebase.ts`:

```typescript
export const SERVICE_CONFIG = {
  defaultService: 'firebase' // or 'mock'
};
```

## 📊 Testing Firebase Integration

1. **Install Firebase**: `npm install firebase`
2. **Start the app**: `npm run dev`
3. **Go to Employee Management**
4. **Add a new employee** - it will be saved to Firebase
5. **Check Firebase Console** - you should see the data in Firestore

## 🐛 Troubleshooting

### Firebase Not Working
1. **Check installation**: `npm list firebase`
2. **Check console errors**: Open browser dev tools
3. **Verify Firestore rules**: Ensure read/write is allowed
4. **Check network**: Ensure no firewall blocking Firebase

### TypeScript Errors
If you see TypeScript errors about Firebase modules:
1. Install Firebase: `npm install firebase`
2. Restart your development server
3. Clear TypeScript cache if needed

### Fallback to Mock Service
If Firebase fails to initialize, the system automatically uses the Mock service. You'll see this message in the console:
```
⚠️ Firebase not available. Please install Firebase: npm install firebase
⚠️ Falling back to Mock service
```

## 📁 Project Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase configuration
├── services/
│   └── employeeService.ts   # Employee service with Firebase/Mock support
└── pages/Hr/CoreHr/
    └── EmployeeManagement/  # Enhanced with Firebase integration
```

## 🔒 Production Considerations

For production deployment:

1. **Update Firestore Rules**: Implement proper authentication and authorization
2. **Environment Variables**: Move Firebase config to environment variables
3. **Error Handling**: Add proper error handling for Firebase operations
4. **Backup Strategy**: Implement data backup and recovery procedures

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify Firebase project configuration
3. Ensure Firestore is enabled and accessible
4. Check network connectivity to Firebase services
