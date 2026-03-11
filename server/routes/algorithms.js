import express from 'express'
import cors from 'cors'

const router = express.Router()

router.use(cors())

// Example algorithm data
const algorithms = {
  'bubble-sort': {
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    description: 'Simple sorting algorithm that repeatedly steps through the array',
    pseudocode: `for i = 0 to n-1:
  for j = 0 to n-i-2:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`
  },
  'quick-sort': {
    name: 'Quick Sort',
    complexity: 'O(n log n)',
    description: 'Efficient divide-and-conquer sorting algorithm',
    pseudocode: `function quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi-1)
    quickSort(arr, pi+1, high)`
  },
  // Add more algorithms as needed
}

// Get algorithm details
router.get('/:algorithmId', (req, res) => {
  const algo = algorithms[req.params.algorithmId as keyof typeof algorithms]
  if (algo) {
    res.json(algo)
  } else {
    res.status(404).json({ error: 'Algorithm not found' })
  }
})

// List all algorithms
router.get('/', (req, res) => {
  res.json(Object.entries(algorithms).map(([id, data]) => ({ id, ...data })))
})

export default router
