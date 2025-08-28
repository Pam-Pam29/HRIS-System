# Download HRIS System as ZIP

## 📦 How to Create ZIP File

### Option 1: Using File Explorer (Windows)
1. Navigate to the parent folder containing `HRIS-System-main`
2. Right-click on the `HRIS-System-main` folder
3. Select "Send to" → "Compressed (zipped) folder"
4. The ZIP file will be created in the same location

### Option 2: Using Command Line
```bash
# Navigate to the parent directory
cd ..

# Create ZIP file (Windows)
powershell Compress-Archive -Path "HRIS-System-main" -DestinationPath "HRIS-System-main.zip"

# Or using 7-Zip if installed
7z a HRIS-System-main.zip HRIS-System-main/
```

### Option 3: Using Git (if it's a git repository)
```bash
# Create a ZIP archive of the current state
git archive --format=zip --output=HRIS-System-main.zip HEAD
```

## 📋 What's Included in the ZIP

The ZIP file will contain:

```
HRIS-System-main/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Firebase configuration
│   ├── services/
│   │   └── employeeService.ts   # Employee service with Firebase/Mock support
│   ├── pages/Hr/
│   │   ├── CoreHr/
│   │   │   ├── EmployeeManagement/  # Enhanced with Firebase
│   │   │   └── TimeManagement/      # Enhanced adjustment popup
│   │   ├── Hiring/
│   │   │   └── Onboarding/          # Commented out
│   │   └── Payroll/
│   │       └── Payroll.tsx          # Only active payroll page
│   └── components/
│       └── ui/
│           ├── textarea.tsx         # New component
│           └── label.tsx            # New component
├── package.json
├── README.md
├── FIREBASE_SETUP.md
├── QUICK_FIX.md
├── MISSING_DEPENDENCIES.md
└── DOWNLOAD_INSTRUCTIONS.md
```

## 🚀 After Downloading

### 1. Extract the ZIP file
- Right-click the ZIP file
- Select "Extract All..."
- Choose a destination folder

### 2. Install Dependencies
```bash
cd HRIS-System-main
npm install
npm install firebase @radix-ui/react-label
```

### 3. Run the Application
```bash
npm run dev
```

## ✅ All Features Included

- ✅ **Onboarding page** - Commented out
- ✅ **Payroll management** - Only main page active
- ✅ **Employee management** - Enhanced with Firebase/Mock support
- ✅ **Time management** - Enhanced adjustment popup
- ✅ **Mock employees** - Commented out
- ✅ **Firebase integration** - Ready to use
- ✅ **Easy backend switching** - Between Firebase and Mock services

## 🔥 Firebase Configuration

Your Firebase project is already configured:
- **Project ID**: `hris-system-baa22`
- **API Key**: `AIzaSyC6ovwlhX4Mr8WpHoS045wLxHA7t8fRXPI`

## 📚 Documentation Included

- **README.md** - Main documentation
- **FIREBASE_SETUP.md** - Firebase setup guide
- **QUICK_FIX.md** - Quick troubleshooting guide
- **MISSING_DEPENDENCIES.md** - Dependency installation guide

## 🎯 Ready to Use

The ZIP file contains a complete, working HRIS system with:
- Modern React/TypeScript architecture
- Firebase backend integration
- Enhanced UI components
- Comprehensive documentation
- Easy setup and deployment
