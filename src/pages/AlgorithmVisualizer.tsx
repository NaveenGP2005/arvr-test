import { useState } from 'react'
import AlgorithmSelector from '@/components/AlgorithmSelector'
import DataInputPanel from '@/components/DataInputPanel'
import VisualizationCanvas from '@/components/VisualizationCanvas'
import AIExplainer from '@/components/AIExplainer'

export default function AlgorithmVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort')
  const [inputData, setInputData] = useState<number[]>([5, 2, 8, 1, 9])
  const [isRunning, setIsRunning] = useState(false)
  const [executionSteps] = useState<string[]>([])

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Left Panel - Controls */}
      <div className="lg:col-span-1 space-y-6">
        <AlgorithmSelector value={selectedAlgorithm} onChange={setSelectedAlgorithm} />
        <DataInputPanel data={inputData} onChange={setInputData} />
        
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>

      {/* Middle - 3D Canvas */}
      <div className="lg:col-span-2">
        <VisualizationCanvas data={inputData} algorithm={selectedAlgorithm} isRunning={isRunning} />
      </div>

      {/* Right Panel - AI Explainer */}
      <div className="lg:col-span-1">
        <AIExplainer algorithm={selectedAlgorithm} steps={executionSteps} />
      </div>
    </div>
  )
}
