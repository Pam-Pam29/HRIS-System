# Emergency Fix for 298 Problems

## 🚨 Immediate Action Required

You have 298 problems in your terminal. This is likely due to missing dependencies and TypeScript issues. Follow these steps immediately:

## 🔧 Step 1: Stop the Development Server

Press `Ctrl + C` in your terminal to stop the development server.

## 🔧 Step 2: Install All Missing Dependencies

Run these commands **one by one**:

```bash
# Navigate to your project
cd C:\Users\ACER\Downloads\HRIS-System-main\HRIS-System-main

# Install all missing dependencies
npm install firebase
npm install @radix-ui/react-label
npm install @tanstack/react-table
npm install @types/node
npm install @types/react
npm install @types/react-dom
```

## 🔧 Step 3: Clear Everything and Reinstall

If Step 2 doesn't work, do a complete reinstall:

```bash
# Remove everything
rm -rf node_modules
rm -rf package-lock.json

# Reinstall everything
npm install

# Install missing dependencies
npm install firebase @radix-ui/react-label @tanstack/react-table
```

## 🔧 Step 4: Fix TypeScript Configuration

Create or update your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 🔧 Step 5: Create Missing Type Definitions

Create a file `src/types/global.d.ts`:

```typescript
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.bmp' {
  const content: string;
  export default content;
}

declare module '*.tiff' {
  const content: string;
  export default content;
}
```

## 🔧 Step 6: Update Package.json

Make sure your `package.json` has these dependencies:

```json
{
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-label": "^2.2.5",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@tanstack/match-sorter-utils": "^8.19.4",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "firebase": "^10.7.0",
    "lodash": "^4.17.21",
    "lucide-react": "^0.344.0",
    "quill": "^2.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-quill": "^2.0.0",
    "react-router-dom": "^7.6.3",
    "recharts": "^3.1.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/lodash": "^4.17.20",
    "@types/node": "^24.0.14",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

## 🔧 Step 7: Restart Development Server

```bash
npm run dev
```

## 🔧 Step 8: If Still Having Issues

If you still see problems, try this nuclear option:

```bash
# Delete everything
rm -rf node_modules
rm -rf package-lock.json
rm -rf .vite
rm -rf dist

# Clear npm cache
npm cache clean --force

# Reinstall everything
npm install

# Install specific versions
npm install firebase@^10.7.0
npm install @radix-ui/react-label@^2.2.5
npm install @tanstack/react-table@^8.21.3

# Start the server
npm run dev
```

## 🎯 Expected Results

After following these steps:

1. **No more TypeScript errors**
2. **No more import errors**
3. **Development server starts successfully**
4. **All components work properly**

## 🚨 If Problems Persist

If you still have issues after following all steps:

1. **Check Node.js version**: `node --version` (should be 16+)
2. **Check npm version**: `npm --version`
3. **Try using yarn instead**: `npm install -g yarn && yarn install`
4. **Check for conflicting global packages**: `npm list -g --depth=0`

## 📞 Emergency Contact

If nothing works:
1. Create a new project folder
2. Copy only the essential files (src/, package.json, tsconfig.json)
3. Start fresh with `npm install`

The key is to ensure all dependencies are properly installed and TypeScript is configured correctly!
