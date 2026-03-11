import { useEffect, useRef } from 'react'

interface VisualizationCanvasProps {
  data: number[]
  algorithm: string
  isRunning: boolean
}

export default function VisualizationCanvas({ data, algorithm, isRunning }: VisualizationCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Canvas will render 3D visualization using Three.js
    // For now, showing placeholder
  }, [data, algorithm, isRunning])

  return (
    <div 
      ref={canvasRef}
      className="bg-slate-800 rounded-lg border border-slate-700 p-8 flex flex-col items-center justify-center min-h-[400px]"
    >
      <div className="text-center">
        <p className="text-slate-400 mb-4">3D Visualization Canvas</p>
        <p className="text-sm text-slate-500">
          Algorithm: <span className="text-white capitalize">{algorithm.replace('-', ' ')}</span>
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Elements: <span className="text-white">{data.length}</span>
        </p>
        <div className="mt-6 space-y-2">
          {data.slice(0, 5).map((num, i) => (
            <div 
              key={i}
              className="bg-blue-600 rounded h-8 flex items-center justify-center"
              style={{ width: `${(num / 100) * 200 + 20}px` }}
            >
              <span className="text-xs font-semibold">{num}</span>
            </div>
          ))}
          {data.length > 5 && (
            <p className="text-xs text-slate-400 mt-2">+{data.length - 5} more elements</p>
          )}
        </div>
      </div>
    </div>
  )
}
