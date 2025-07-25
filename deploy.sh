#!/bin/bash

echo "🚀 Starting Vaccination Management System Deployment Process..."
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Check current git status
echo "📊 Checking current git status..."
git status

# Add all files
echo "📁 Adding all files to Git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit."
else
    # Commit changes with timestamp
    commit_message="🚀 Deployment ready - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "💾 Committing changes with message: $commit_message"
    git commit -m "$commit_message"
fi

# Check if remote exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "📤 Pushing to existing remote..."
    git push origin main
else
    echo "⚠️  No remote repository configured."
    echo "Please add your GitHub repository URL:"
    echo "git remote add origin https://github.com/Rakshitha-akki/child_vaccination_management_system.git"
    echo "git push -u origin main"
fi

echo ""
echo "✅ Git preparation complete!"
echo ""
echo "🌐 Next Steps for Vercel Deployment:"
echo "=================================================="
echo "1. 📱 Go to https://vercel.com"
echo "2. 🔐 Sign in with your GitHub account"
echo "3. ➕ Click 'New Project'"
echo "4. 📂 Import your GitHub repository"
echo ""
echo "🔧 Backend Deployment:"
echo "   - Project Name: vaccination-backend"
echo "   - Root Directory: vaccination-backend"
echo "   - Framework: Other"
echo ""
echo "🎨 Frontend Deployment:"
echo "   - Project Name: vaccination-frontend"
echo "   - Root Directory: vaccination-frontend"
echo "   - Framework: Create React App"
echo ""
echo "🔐 Environment Variables to Add:"
echo "   Backend:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your-mongodb-atlas-connection-string"
echo "   - JWT_SECRET=your-64-character-secret"
echo "   - FRONTEND_URL=https://vaccination-frontend.vercel.app"
echo "   - EMAIL_USER=your-email@gmail.com"
echo "   - EMAIL_PASS=your-gmail-app-password"
echo ""
echo "   Frontend:"
echo "   - REACT_APP_API_URL=https://vaccination-backend.vercel.app"
echo ""
echo "🎉 Your vaccination management system will be live after deployment!"

# Check if running on Windows (Git Bash)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo ""
    echo "💡 Windows detected. You can also run this in PowerShell:"
    echo "   Set-Location 'e:\\mca 3rd sem\\childvaccination\\vaccinnation'"
    echo "   git add ."
    echo "   git commit -m 'Ready for deployment'"
    echo "   git push origin main"
fi
