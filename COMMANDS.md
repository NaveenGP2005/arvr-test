# 📋 CodeCraft AR - Command Reference

## 🚀 QUICK START (Copy & Paste Ready)

### Open 2 Terminals

#### Terminal 1 - Frontend (Port 3000)

```bash
cd /d/Study/Assignment/"CodeCraft AR"
npm run dev
```

**Expected Output:**

```
  VITE v5.4.21  ready in 780 ms
  ➜  Local:   http://localhost:3000/
```

#### Terminal 2 - Backend (Port 5000)

```bash
cd /d/Study/Assignment/"CodeCraft AR"
npm run server:dev
```

**Expected Output:**

```
🚀 CodeCraft AR server running on http://localhost:5000
📚 Free tier - Limited Groq API calls
```

---

## 🌐 Access Points

### Local Development

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
Health:    http://localhost:5000/health
```

### Mobile (Same WiFi)

```
Phone:     http://YOUR_IP:3000
Example:   http://192.168.1.100:3000
```

### Production (After Render Deploy)

```
Live URL:  https://codecraft-ar.onrender.com
```

---

## 📦 Dependency Management

### Install/Reinstall

```bash
cd /d/Study/Assignment/"CodeCraft AR"
npm install
```

### Update Dependencies

```bash
npm update
```

### Check Vulnerabilities

```bash
npm audit
npm audit fix  # Auto-fix
```

### Clear Cache

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 🔨 Building

### Development Build (with source maps)

```bash
npm run build
```

### Check Build Output

```bash
# File sizes
ls -lh dist/

# Detailed breakdown
npm run build 2>&1 | grep -E "(gzip|kB|error|warning)"
```

### Preview Production Build

```bash
npm run preview
```

---

## 🧪 Testing

### Run All Tests

```bash
npm test  # When test suite is added
```

### Check for Errors

```bash
npm run build  # Catches TypeScript errors
```

### Lint Check

```bash
# When ESLint is configured
npm run lint
```

---

## 🚀 Deployment Commands

### Deploy to Render

#### Step 1: Initialize Git

```bash
cd /d/Study/Assignment/"CodeCraft AR"
git init
git add .
git commit -m "Initial commit: CodeCraft AR"
```

#### Step 2: Add GitHub Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/codecraft-ar.git
git branch -M main
git push -u origin main
```

#### Step 3: On Render Dashboard

1. New → Web Service
2. Select repository: `codecraft-ar`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Click "Create Web Service"

#### Step 4: After Deployment

```
Live at: https://codecraft-ar.onrender.com
```

### Push Updates to Production

```bash
# Make changes locally
git add .
git commit -m "Update: Added new feature"
git push origin main
# Render auto-deploys!
```

---

## 🔧 Configuration

### Environment Variables

#### Create `.env` for local development

```bash
cd /d/Study/Assignment/"CodeCraft AR"
cat > .env << EOF
VITE_API_URL=http://localhost:5000
NODE_ENV=development
PORT=5000
EOF
```

#### Set on Render Dashboard

1. Service Settings → Environment
2. Add variables:
   ```
   NODE_ENV = production
   PORT = 3000
   ```

---

## 📊 Monitoring & Debugging

### Check Ports

```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
lsof -i :5000
```

### Kill Process on Port

```bash
# Windows (PowerShell)
Get-Process | Where-Object {$_.Port -eq 3000} | Stop-Process

# macOS/Linux
kill -9 $(lsof -t -i:3000)
```

### View Build Logs

```bash
npm run build 2>&1 | tee build.log
cat build.log | grep -i error
```

### Monitor Dev Server

```bash
npm run dev 2>&1 | tee dev.log
tail -f dev.log  # Live monitoring
```

---

## 📁 File Organization

### Project Structure

```bash
# List all files
ls -la

# List only source files
find src -type f -name "*.tsx" -o -name "*.ts"

# Count lines of code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l
```

### Cleanup Commands

```bash
# Remove build artifacts
rm -rf dist
rm -rf build

# Remove node_modules (use with caution!)
rm -rf node_modules
npm install

# Clean cache
npm cache clean --force
```

---

## 🐛 Debugging

### Enable Verbose Output

```bash
# Vite verbose
npm run dev -- --debug

# npm verbose
npm install --verbose

# Express logging
NODE_DEBUG=express npm run server:dev
```

### Browser DevTools (F12)

```
Console  → JavaScript errors
Network  → API calls (check /api/explain)
Elements → HTML structure
Sources  → Set breakpoints
```

### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server/index.js",
      "restart": true
    }
  ]
}
```

---

## 📝 Git Commands

### Basic Workflow

```bash
# Check status
git status

# Stage changes
git add .
git add src/  # Specific folder

# Commit
git commit -m "Description of changes"

# View history
git log --oneline

# Push to GitHub (triggers Render deploy)
git push origin main
```

### Undo Changes

```bash
# Undo unstaged changes
git checkout -- filename

# Undo staged changes
git reset HEAD filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 🔍 Search & Find

### Find Files

```bash
# Find TypeScript files
find src -name "*.tsx"

# Find by content
grep -r "algorithm" src/

# Find TODO comments
grep -r "TODO" src/
```

### View File Contents

```bash
# Show specific file
cat src/App.tsx

# First 10 lines
head -n 10 src/App.tsx

# Last 20 lines
tail -n 20 src/App.tsx

# Search in file
grep "useState" src/pages/AlgorithmVisualizer.tsx
```

---

## 📊 Project Statistics

### Quick Stats

```bash
# Total lines of code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Total files
find src -type f | wc -l

# File count by type
find src -name "*.tsx" | wc -l  # TSX files
find src -name "*.css" | wc -l  # CSS files

# Build size
du -sh dist/

# Dependency count
npm list --depth=0
```

---

## 🌍 Network Testing

### Find Your IP Address

```bash
# Windows
ipconfig

# macOS
hostname -I
ifconfig | grep "inet " | grep -v 127.0.0.1

# Linux
hostname -I
ip addr show
```

### Test API Endpoint

```bash
# Test health check
curl http://localhost:5000/health

# Test explain endpoint
curl -X POST http://localhost:5000/explain \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "bubble-sort",
    "steps": ["swap", "compare"]
  }'
```

### Check if Port is Open

```bash
# Test port 3000
curl http://localhost:3000

# Test port 5000
curl http://localhost:5000
```

---

## 🔐 Security

### Environment Variables

```bash
# Never commit .env
echo ".env" >> .gitignore

# Use .env.example instead
cp .env .env.example
# Remove secrets from .env.example

# On production (Render)
# Use dashboard to set secrets
```

### Security Audit

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix
npm audit fix --force  # May break something

# Review changes
git diff
```

---

## 📞 Useful Links (Command Shortcuts)

### Local

```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
Network:  http://YOUR_IP:3000
```

### Online

```
GitHub:          https://github.com
Render:          https://render.com
Live App:        https://codecraft-ar.onrender.com
```

### Documentation

```
QUICKSTART.md    - 5 min quick start
DEPLOYMENT.md    - Full deployment guide
README.md        - Complete documentation
```

---

## 🎯 Common Tasks

### "App won't start"

```bash
# Kill old process
lsof -ti:3000 | xargs kill -9

# Reinstall
rm -rf node_modules
npm install

# Try again
npm run dev
```

### "Build failing"

```bash
# Clean rebuild
rm -rf dist
npm run build

# Check errors
npm run build 2>&1 | grep error
```

### "API not responding"

```bash
# Test endpoint
curl http://localhost:5000/health

# Check if running
lsof -i :5000

# Restart
npm run server:dev
```

### "Mobile can't access"

```bash
# Verify on same WiFi
ipconfig  # Get your IP

# Test from phone
http://YOUR_IP:3000

# Check firewall (Windows)
netsh advfirewall firewall add rule name="Node" dir=in action=allow program="node.exe"
```

---

## 💡 Pro Commands

### One-Liner to Setup & Run

```bash
cd /d/Study/Assignment/"CodeCraft AR" && npm install && npm run build && npm run dev &
```

### One-Liner to Deploy

```bash
git add . && git commit -m "Update" && git push origin main
# Then Render auto-deploys
```

### Monitor Both Servers

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server:dev

# Both running simultaneously
```

---

## 📚 Help & Documentation

### In-Project Help

```bash
# Read main guide
cat QUICKSTART.md

# Read deployment
cat DEPLOYMENT.md

# Read full docs
cat README.md
```

### Online Help

```bash
# Vite help
npm run dev -- --help

# npm help
npm help

# Node.js REPL (for testing)
node
> console.log('JavaScript works')
> .exit
```

---

## ✅ Command Checklist

Before going live, run:

```bash
✓ npm install          # Install deps
✓ npm run build        # Check build works
✓ npm run dev          # Check frontend
✓ npm run server:dev   # Check backend
✓ git status          # Check git
✓ npm audit           # Security check
```

---

## 🎉 Ready to Go!

You now have all the commands needed to:

- ✅ Develop locally
- ✅ Test on mobile
- ✅ Deploy to production
- ✅ Debug issues
- ✅ Manage code

**Start here:**

```bash
npm run dev
# Visit http://localhost:3000
```

**Questions?** Check docs or use online resources!

---

Last updated: March 11, 2026
