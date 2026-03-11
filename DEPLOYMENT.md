# 🚀 CodeCraft AR - Complete Deployment Guide

## ✅ Project Status

Your **CodeCraft AR** application is ready for deployment on Render's free tier!

**Build Size:** 217.38 kB (69.45 kB gzipped) ✓
**Build Time:** ~5 seconds ✓
**Status:** Production ready ✓

---

## 📱 Phase 1: Local Testing (Desktop)

### Start Development Server

```bash
cd "d:\Study\Assignment\CodeCraft AR"

# Terminal 1 - Frontend (port 3000)
npm run dev

# Terminal 2 - Backend API Server (port 5000)
npm run server:dev
```

### Access Locally

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

### Test Features

1. **Home Page** → `/`
2. **Algorithm Visualizer** → `/visualizer`
   - Select algorithm from dropdown
   - Enter custom data or generate random
   - Click "Start" to execute
3. **AR Experience** → `/ar/bubble-sort` (example)

---

## 📱 Phase 2: Mobile Testing (Local Network)

### Find Your Machine's IP

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.x.x)

**macOS/Linux:**
```bash
hostname -I
```

### Access from Mobile

1. **On your phone's browser, visit:**
   ```
   http://<YOUR_IP>:3000
   ```
   Example: `http://192.168.1.100:3000`

2. **Make sure phone and computer are on same WiFi**

3. **Test on mobile:**
   - Home page loads ✓
   - Navigation works ✓
   - Visualizer interactive ✓
   - AR page accessible ✓

---

## 🌐 Phase 3: Deploy to Render (Free Tier)

### Step 1: Push Code to GitHub

```bash
cd "d:\Study\Assignment\CodeCraft AR"

# Initialize git
git init
git add .
git commit -m "Initial commit: CodeCraft AR algorithm visualizer"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/codecraft-ar.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 3: Create Web Service on Render

1. In Render Dashboard, click **"New +"** → **"Web Service"**

2. **Select Repository:**
   - Find `codecraft-ar`
   - Click Connect

3. **Configure Service:**
   ```
   Name: codecraft-ar
   Environment: Node
   Region: (choose closest to you)
   Branch: main
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Click Create Web Service**

### Step 4: Add Environment Variables

1. Go to your service dashboard
2. Click **Settings** → **Environment**
3. Add variable:
   ```
   NODE_ENV = production
   PORT = 3000
   ```
4. **Save** and service will redeploy

### Step 5: Wait for Deployment

- Build logs will show in real-time
- Takes ~2-3 minutes first time
- You'll see a green "Live" status when done

### Step 6: Access Your Live App

```
https://codecraft-ar.onrender.com
```

(Render will give you exact subdomain)

---

## 📱 Phase 4: Mobile Access (Production)

### Via Render URL

```
https://codecraft-ar.onrender.com
```

Simply open this URL on any mobile device!

### Via QR Code (Optional)

Generate a QR code pointing to your Render URL for easy sharing.

---

## ⚙️ Configuration for Production

###  `.env.production` (Optional)

```env
NODE_ENV=production
PORT=3000
GROQ_API_KEY=your_free_tier_key_here
```

### Free Tier Limitations

- **Render:** Auto-spins down after 15 min of inactivity (takes ~30s to wake)
- **Groq API:** 25 requests/day in free tier
- **Bandwidth:** 100 GB/month (plenty for learning)

### Preventing Spin-Down

Render free tier can be unreliable. Consider:
- Upgrading to $7/month to keep instance always on
- Using uptime monitoring (Pingdom, UptimeRobot)

---

## 🧪 Testing Checklist

### Before Going Live

- [ ] Local desktop (http://localhost:3000) works
- [ ] Local mobile testing works
- [ ] All routes accessible
  - [ ] `/` (Home)
  - [ ] `/visualizer` (Main app)
  - [ ] `/ar/bubble-sort` (AR page)
- [ ] Algorithm selector works
- [ ] Data input accepts numbers
- [ ] API calls complete (check network tab)
- [ ] Console has no errors
- [ ] Mobile responsive design works
- [ ] Buttons and inputs clickable

### After Deploying to Render

- [ ] Visit https://codecraft-ar.onrender.com
- [ ] Test all pages load
- [ ] Test all interactive features
- [ ] Test on mobile device
- [ ] Verify API calls work (check DevTools → Network)

---

## 🔧 Troubleshooting

### Build Fails on Render

**Error:** `npm install` fails

**Fix:**
```bash
# Locally, ensure this works:
npm install
npm run build

# Then commit and push again
git add .
git commit -m "Fix dependencies"
git push origin main
```

### App Loads but Features Don't Work

**Error:** 404 or API calls failing

**Check:**
1. Backend server started: `npm run server:dev`
2. Environment variables set in Render
3. Proxy config in `vite.config.ts` is correct
4. API endpoints match: `/api/*`

### Page Blank on Mobile

**Error:** White screen on phone

**Fix:**
1. Check mobile browser console (F12 on desktop or DevTools on phone)
2. Ensure CORS is enabled in backend
3. Try incognito/private browsing (cache issues)

### Slow on Mobile

**Optimize:**
- Render free tier can be slow
- Reduce visualization to <20 elements
- Clear browser cache
- Use cellular data instead of slow WiFi

---

## 📊 Analytics & Monitoring

### Monitor Render Deployment

- Render Dashboard shows:
  - CPU usage
  - Memory usage
  - Request count
  - Error logs
  - Redeploy history

### Free Monitoring Tools

- **Uptime:** [UptimeRobot.com](https://uptimerobot.com)
- **Error Tracking:** [Sentry.io](https://sentry.io) free tier
- **Performance:** Chrome DevTools (built-in)

---

## 🎓 Next Steps for Improvement

### Short Term
- [ ] Add more algorithms (insertion sort, heap sort)
- [ ] Implement step-by-step execution with pause/resume
- [ ] Add execution complexity counter (O(n²), etc.)
- [ ] Color-code comparisons in visualization

### Medium Term
- [ ] Connect to Groq API (paid tier) for real AI explanations
- [ ] Add custom 3D models using Three.js
- [ ] Implement user authentication
- [ ] Store user progress in database

### Long Term
- [ ] Mobile app with Capacitor/React Native
- [ ] WebAR visualization (ARCore on Android, ARKit on iOS)
- [ ] Multiplayer learning mode
- [ ] Achievement system & leaderboards

---

## 💾 Backup & Maintenance

### Git Workflow

```bash
# Make changes locally
git add .
git commit -m "Add feature: ..."

# Push to trigger Render redeploy
git push origin main
```

### Database (If Added)

- Render supports PostgreSQL free tier (limited)
- Use Supabase for managed PostgreSQL

### Regular Updates

```bash
# Update dependencies monthly
npm update

# Security audit
npm audit fix

# Rebuild and test
npm run build
```

---

## 📞 Support & Resources

### Render Docs
- [Render Web Services](https://render.com/docs/web-services)
- [Environment Variables](https://render.com/docs/environment-variables)
- [GitHub Integration](https://render.com/docs/github)

### CodeCraft AR Resources
- GitHub: [your-repo-url]
- Live: https://codecraft-ar.onrender.com
- Issues: GitHub Issues tab

### Tech Stack Docs
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [A-Frame](https://aframe.io)

---

## ✨ Final Notes

🎉 **You now have:**
- ✅ Production-ready React app
- ✅ Express backend API
- ✅ Free Render deployment
- ✅ Mobile-ready interface
- ✅ Algorithm visualizer foundation
- ✅ AR-ready architecture

📱 **To access on your phone:**
1. **Locally:** http://YOUR_IP:3000
2. **Production:** https://codecraft-ar.onrender.com

🚀 **Happy coding and learning!**

---

Made with ❤️ for Computer Science Students
Last Updated: March 11, 2026
