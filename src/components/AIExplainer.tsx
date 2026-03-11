import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface AIExplainerProps {
  algorithm: string
  steps: string[]
}

export default function AIExplainer({ algorithm, steps }: AIExplainerProps) {
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchExplanation = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ algorithm, steps })
        })
        const data = await response.json()
        setExplanation(data.explanation || 'Explanation not available')
      } catch (error) {
        setExplanation('Error fetching explanation. Free tier may be limited.')
      } finally {
        setLoading(false)
      }
    }

    if (algorithm && steps.length > 0) {
      fetchExplanation()
    } else {
      setExplanation('Select an algorithm and start visualization to see AI explanations.')
    }
  }, [algorithm, steps])

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col h-full">
      <h3 className="font-semibold mb-4">AI Explainer</h3>
      
      <div className="flex-1 overflow-y-auto bg-slate-900 p-4 rounded text-sm text-slate-300 space-y-2">
        {loading ? (
          <div className="flex items-center gap-2 justify-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading explanation...</span>
          </div>
        ) : (
          <p>{explanation}</p>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded text-xs text-blue-300">
        💡 Powered by Groq API (Free Tier)
      </div>
    </div>
  )
}
