import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')))

// API Routes

// Explain endpoint - uses Groq API (free tier)
app.post('/explain', async (req, res) => {
  try {
    const { algorithm, steps } = req.body

    // Free tier placeholder - returns a basic explanation
    const explanations: Record<string, string> = {
      'bubble-sort': 'Bubble sort compares adjacent elements and swaps them if they are in the wrong order. This process repeats until the array is sorted.',
      'quick-sort': 'Quick sort picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
      'merge-sort': 'Merge sort divides the array into halves, recursively sorts them, and then merges the sorted halves.',
      'binary-search': 'Binary search repeatedly divides the search space in half, comparing the target with the middle element.',
      'linear-search': 'Linear search goes through each element sequentially until finding the target.',
      'bfs': 'Breadth-First Search explores a graph level by level, visiting all neighbors before moving deeper.',
      'dfs': 'Depth-First Search explores a graph by going as deep as possible before backtracking.',
      'linked-list': 'Linked List operations involve traversing or modifying nodes connected by pointers.',
    }

    const explanation = explanations[algorithm] || 'Algorithm explanation not available'

    res.json({ 
      explanation,
      timestamp: new Date().toISOString(),
      source: 'free-tier'
    })
  } catch (error) {
    console.error('Explain endpoint error:', error)
    res.status(500).json({ error: 'Failed to generate explanation' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 CodeCraft AR server running on http://localhost:${PORT}`)
  console.log(`📚 Free tier - Limited Groq API calls`)
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`)
})
