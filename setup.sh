#!/bin/bash

# CodeCraft AR - Complete Setup & Launch Script
# This script will set up and launch your CodeCraft AR application

set -e

echo "🚀 CodeCraft AR - Setup & Launch Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the CodeCraft AR directory"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✓ Node.js version: $NODE_VERSION"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    npm install
    echo "✓ Dependencies installed"
fi

# Build the project
echo ""
echo "🔨 Building project..."
npm run build
echo "✓ Build successful"

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "🎯 To start the application:"
echo ""
echo "Terminal 1 - Frontend (port 3000):"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Backend API (port 5000):"
echo "  npm run server:dev"
echo ""
echo "🌐 Then visit: http://localhost:3000"
echo ""
echo "📱 For mobile testing (same WiFi):"
echo "  1. Find your computer's IP address"
echo "     Windows: ipconfig | find IPv4"
echo "     Mac/Linux: hostname -I"
echo "  2. On mobile browser visit: http://YOUR_IP:3000"
echo ""
echo "🚀 To deploy to Render:"
echo "  1. Push code to GitHub"
echo "  2. Visit render.com and create Web Service"
echo "  3. See DEPLOYMENT.md for detailed instructions"
echo ""
echo "📚 Documentation:"
echo "  - QUICKSTART.md - Quick start guide"
echo "  - DEPLOYMENT.md - Production deployment"
echo "  - README.md - Full project documentation"
echo ""
