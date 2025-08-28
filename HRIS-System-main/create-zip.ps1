# HRIS System ZIP Creation Script
# This script creates a ZIP file of your HRIS system for Git upload

Write-Host "🗜️ Creating HRIS System ZIP file..." -ForegroundColor Green

# Set the paths
$projectPath = "C:\Users\ACER\Downloads\HRIS-System-main\HRIS-System-main"
$outputPath = "C:\Users\ACER\Downloads\HRIS-System-main\HRIS-System-Complete.zip"

# Check if project directory exists
if (-not (Test-Path $projectPath)) {
    Write-Host "❌ Project directory not found: $projectPath" -ForegroundColor Red
    Write-Host "Please make sure you're in the correct directory." -ForegroundColor Yellow
    exit 1
}

# Remove node_modules to reduce file size (optional)
$nodeModulesPath = Join-Path $projectPath "node_modules"
if (Test-Path $nodeModulesPath) {
    Write-Host "🗑️ Removing node_modules to reduce ZIP size..." -ForegroundColor Yellow
    Remove-Item -Path $nodeModulesPath -Recurse -Force
    Write-Host "✅ node_modules removed" -ForegroundColor Green
}

# Remove other unnecessary files
$filesToRemove = @("dist", ".vite", ".cache", "*.log")
foreach ($file in $filesToRemove) {
    $filePath = Join-Path $projectPath $file
    if (Test-Path $filePath) {
        Remove-Item -Path $filePath -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Create the ZIP file
Write-Host "📦 Creating ZIP file..." -ForegroundColor Yellow
try {
    Compress-Archive -Path $projectPath -DestinationPath $outputPath -Force
    Write-Host "✅ ZIP file created successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Error creating ZIP file: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Get file size
$zipFile = Get-Item $outputPath
$fileSizeMB = [math]::Round($zipFile.Length / 1MB, 2)

Write-Host "📊 ZIP file details:" -ForegroundColor Cyan
Write-Host "   Location: $outputPath" -ForegroundColor White
Write-Host "   Size: $fileSizeMB MB" -ForegroundColor White
Write-Host "   Created: $($zipFile.CreationTime)" -ForegroundColor White

# Verify the ZIP file
Write-Host "🔍 Verifying ZIP file..." -ForegroundColor Yellow
try {
    $zipContent = Get-ChildItem -Path $outputPath -ErrorAction Stop
    Write-Host "✅ ZIP file verification successful" -ForegroundColor Green
} catch {
    Write-Host "❌ ZIP file verification failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Your HRIS System ZIP file is ready for Git upload!" -ForegroundColor Green
Write-Host "📁 File location: $outputPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Go to your GitHub repository" -ForegroundColor White
Write-Host "   2. Click 'Releases' or 'Add file' → 'Upload files'" -ForegroundColor White
Write-Host "   3. Upload the ZIP file" -ForegroundColor White
Write-Host "   4. Add a commit message and publish" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tip: The ZIP file is ready to be shared or uploaded to any Git platform!" -ForegroundColor Cyan
