import { useEffect, useState } from 'react'
import { Brain } from 'lucide-react'

interface AIExplainerProps {
  algorithm: string
  steps: string[]
}

const explanations: Record<string, { summary: string; complexity: string; space: string; steps: string[] }> = {
  'bubble-sort': {
    summary: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The largest values "bubble up" to the end.',
    complexity: 'O(n²)',
    space: 'O(1)',
    steps: ['Compare adjacent elements', 'Swap if left > right', 'Repeat for each pass', 'Stop when no swaps occur'],
  },
  'quick-sort': {
    summary: 'Quick Sort picks a pivot element and partitions the array so all smaller elements are left of the pivot and larger ones are right. Then recursively sorts each side.',
    complexity: 'O(n log n) avg',
    space: 'O(log n)',
    steps: ['Pick a pivot element', 'Partition: small left, large right', 'Recursively sort each partition', 'Combine results'],
  },
  'merge-sort': {
    summary: 'Merge Sort divides the array into two halves, recursively sorts each half, then merges them back together in sorted order.',
    complexity: 'O(n log n)',
    space: 'O(n)',
    steps: ['Divide array in half', 'Recursively sort left half', 'Recursively sort right half', 'Merge two sorted halves'],
  },
  'binary-search': {
    summary: 'Binary Search works on sorted arrays. It repeatedly halves the search space by comparing the target with the middle element.',
    complexity: 'O(log n)',
    space: 'O(1)',
    steps: ['Check middle element', 'If equal → found!', 'If target < mid → search left', 'If target > mid → search right'],
  },
  'linear-search': {
    summary: 'Linear Search checks every element one by one from start to end until it finds the target or reaches the end of the array.',
    complexity: 'O(n)',
    space: 'O(1)',
    steps: ['Start at index 0', 'Compare current element with target', 'If match → return index', 'Else move to next element'],
  },
  'bfs': {
    summary: 'Breadth-First Search explores a graph level by level. It uses a queue to visit all neighbors of a node before moving deeper.',
    complexity: 'O(V + E)',
    space: 'O(V)',
    steps: ['Start at root node', 'Add neighbors to queue', 'Visit each node in queue', 'Repeat until queue is empty'],
  },
  'dfs': {
    summary: 'Depth-First Search explores as far as possible along each branch before backtracking. It uses a stack (or recursion) to track the path.',
    complexity: 'O(V + E)',
    space: 'O(V)',
    steps: ['Start at root node', 'Go deep into first branch', 'Backtrack when stuck', 'Repeat for unvisited nodes'],
  },
  'linked-list': {
    summary: 'A Linked List stores elements in nodes. Each node holds a value and a pointer to the next node. It allows fast insertions but slow random access.',
    complexity: 'Search: O(n)',
    space: 'O(n)',
    steps: ['Each node has value + next pointer', 'Traverse by following pointers', 'Insert: update pointers', 'Delete: bypass the node'],
  },
  'graph-traversal': {
    summary: 'Graph Traversal visits all vertices and edges. Use BFS for shortest paths, DFS for cycle detection, topological sort, or exploring all paths.',
    complexity: 'O(V + E)',
    space: 'O(V)',
    steps: ['Mark starting node as visited', 'Explore connected nodes', 'Track visited to avoid cycles', 'Repeat until all visited'],
  },
}

export default function AIExplainer({ algorithm }: AIExplainerProps) {
  const [data, setData] = useState(explanations['bubble-sort'])

  useEffect(() => {
    const info = explanations[algorithm]
    if (info) {
      setData(info)
    } else {
      setData({
        summary: `${algorithm.replace(/-/g, ' ')} is an important algorithm in computer science. Switch to a known algorithm to see a detailed explanation.`,
        complexity: 'Varies',
        space: 'Varies',
        steps: ['Select a specific algorithm', 'to see step-by-step', 'explanation here'],
      })
    }
  }, [algorithm])

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-cyan-400" />
        <h3 className="font-semibold">AI Explainer</h3>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Summary */}
        <div className="bg-slate-900 p-4 rounded text-sm text-slate-300 leading-relaxed">
          {data.summary}
        </div>

        {/* Complexity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-900/30 border border-blue-700/50 p-3 rounded text-center">
            <p className="text-xs text-slate-400 mb-1">Time</p>
            <p className="text-blue-400 font-mono text-sm font-bold">{data.complexity}</p>
          </div>
          <div className="bg-cyan-900/30 border border-cyan-700/50 p-3 rounded text-center">
            <p className="text-xs text-slate-400 mb-1">Space</p>
            <p className="text-cyan-400 font-mono text-sm font-bold">{data.space}</p>
          </div>
        </div>

        {/* Steps */}
        <div>
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">How it works</p>
          <ol className="space-y-2">
            {data.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded text-xs text-green-400">
        ✅ Works offline — no API needed
      </div>
    </div>
  )
}
