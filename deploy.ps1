# PowerShell Deployment Script for Vaccination Management System

Write-Host "🚀 Starting Vaccination Management System Deployment Process..." -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Cyan

# Set location to project directory
Set-Location "e:\mca 3rd sem\childvaccination\vaccinnation"

# Check if git is initialized
if (!(Test-Path ".git")) {
    Write-Host "📁 Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Check current git status
Write-Host "📊 Checking current git status..." -ForegroundColor Blue
git status

# Add all files
Write-Host "📁 Adding all files to Git..." -ForegroundColor Blue
git add .

# Check if there are changes to commit
$changes = git diff --staged --name-only
if ($changes) {
    # Commit changes with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "🚀 Deployment ready - $timestamp"
    Write-Host "💾 Committing changes with message: $commitMessage" -ForegroundColor Green
    git commit -m $commitMessage
} else {
    Write-Host "ℹ️  No changes to commit." -ForegroundColor Yellow
}

# Check if remote exists
try {
    $remote = git remote get-url origin 2>$null
    if ($remote) {
        Write-Host "📤 Pushing to existing remote..." -ForegroundColor Green
        git push origin main
    }
} catch {
    Write-Host "⚠️  No remote repository configured." -ForegroundColor Yellow
    Write-Host "Please add your GitHub repository URL:" -ForegroundColor Red
    Write-Host "git remote add origin https://github.com/Rakshitha-akki/child_vaccination_management_system.git" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ Git preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Next Steps for Vercel Deployment:" -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "1. 📱 Go to https://vercel.com" -ForegroundColor White
Write-Host "2. 🔐 Sign in with your GitHub account" -ForegroundColor White
Write-Host "3. ➕ Click 'New Project'" -ForegroundColor White
Write-Host "4. 📂 Import your GitHub repository" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Backend Deployment:" -ForegroundColor Yellow
Write-Host "   - Project Name: vaccination-backend" -ForegroundColor White
Write-Host "   - Root Directory: vaccination-backend" -ForegroundColor White
Write-Host "   - Framework: Other" -ForegroundColor White
Write-Host ""
Write-Host "🎨 Frontend Deployment:" -ForegroundColor Yellow
Write-Host "   - Project Name: vaccination-frontend" -ForegroundColor White
Write-Host "   - Root Directory: vaccination-frontend" -ForegroundColor White
Write-Host "   - Framework: Create React App" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Environment Variables to Add:" -ForegroundColor Magenta
Write-Host "   Backend:" -ForegroundColor Yellow
Write-Host "   - NODE_ENV=production" -ForegroundColor White
Write-Host "   - MONGODB_URI=your-mongodb-atlas-connection-string" -ForegroundColor White
Write-Host "   - JWT_SECRET=your-64-character-secret" -ForegroundColor White
Write-Host "   - FRONTEND_URL=https://vaccination-frontend.vercel.app" -ForegroundColor White
Write-Host "   - EMAIL_USER=your-email@gmail.com" -ForegroundColor White
Write-Host "   - EMAIL_PASS=your-gmail-app-password" -ForegroundColor White
Write-Host ""
Write-Host "   Frontend:" -ForegroundColor Yellow
Write-Host "   - REACT_APP_API_URL=https://vaccination-backend.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your vaccination management system will be live after deployment!" -ForegroundColor Green

# Pause to let user read
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
