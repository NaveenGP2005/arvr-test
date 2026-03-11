# CodeCraft AR - Algorithm Visualizer

An interactive AR/VR platform for visualizing algorithms and data structures in 3D space. Perfect for students learning computer science concepts.

## 🚀 Features

- **Visual Algorithm Execution**: Watch sorting, searching, and graph algorithms execute in real-time
- **3D Data Structures**: Visualize trees, linked lists, queues, stacks as interactive 3D models
- **AI-Powered Explanations**: Get instant explanations using Groq API (free tier)
- **Mobile AR Support**: Experience algorithms in augmented reality on your phone
- **Interactive Controls**: Step through execution, adjust speed, modify input data
- **Student-Friendly**: Perfect for interview prep and understanding complexity

## 💻 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **3D Rendering**: Three.js + A-Frame VR
- **Backend**: Express.js (Node.js)
- **AI Integration**: Groq API (free tier)
- **Hosting**: Render (free tier compatible)

## 📋 Supported Algorithms

### Sorting

- Bubble Sort
- Quick Sort
- Merge Sort

### Searching

- Linear Search
- Binary Search

### Graph Algorithms

- BFS (Breadth-First Search)
- DFS (Depth-First Search)

### Data Structures

- Linked Lists
- Trees
- Queues
- Stacks

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Setup

```bash
# Clone repository
git clone <repo-url>
cd CodeCraft AR

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# In another terminal, start backend
npm run server:dev
```

### Access the App

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 📦 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deploying to Render

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Connect your repository

### Step 3: Create Web Service

1. Click "New +" → "Web Service"
2. Select your repository
3. Fill in details:
   - **Name**: `codecraft-ar`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Deploy!

### Step 4: Environment Variables

In Render Dashboard:

- Settings → Environment
- Add: `NODE_ENV=production`
- Add: `GROQ_API_KEY=your_free_tier_key`

## 📱 Testing on Mobile

### Using Local Machine

```bash
# Get your machine's IP
ipconfig getifaddr en0  # macOS
hostname -I             # Linux
ipconfig                # Windows

# Access from mobile
http://<YOUR_IP>:3000
```

### Using Render (After Deployment)

Visit: `https://your-app-name.onrender.com`

## 🎓 How It Works

1. **Select Algorithm**: Choose from 10+ algorithms
2. **Input Data**: Enter values or generate random data
3. **Execute**: Watch the algorithm execute step-by-step
4. **AI Explanation**: Get real-time explanations of each step
5. **AR Mode**: View in augmented reality on mobile

## 💡 Free Tier Limitations

- Groq API: 25 requests/day (free tier)
- Render: Spins down after 15 min of inactivity (free tier)
- A-Frame: Full VR/AR support

## 🔧 Customization

### Add New Algorithm

1. Create algorithm logic in `src/algorithms/`
2. Add to selector in `AlgorithmSelector.tsx`
3. Add explanation in backend `/explain` endpoint

### Modify Visualizer Colors

Edit Tailwind classes in `VisualizationCanvas.tsx`

### Change AR Models

Update `ARViewer.tsx` to use custom 3D models

## 📊 Performance Tips

- Limit visualization to 50 elements for smooth animation
- Use lower resolution 3D models on mobile
- Enable code splitting for faster loads

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch
3. Submit pull request

## 📄 License

MIT License - See LICENSE.md

## 🆘 Support

- Issues: GitHub Issues
- Discussions: GitHub Discussions
- Email: support@codecraft-ar.dev

## 📚 Resources

- [A-Frame Documentation](https://aframe.io/)
- [Three.js Docs](https://threejs.org/)
- [Groq API Docs](https://console.groq.com)
- [Render Docs](https://render.com/docs)

---

Made with ❤️ for Computer Science Students
