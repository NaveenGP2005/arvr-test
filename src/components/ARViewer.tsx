import { useEffect, useRef } from 'react'
import { Smartphone, Monitor, Zap } from 'lucide-react'

interface ARViewerProps {
  algorithmId: string
}

export default function ARViewer({ algorithmId }: ARViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize A-Frame scene for 3D visualization
    if (containerRef.current && !containerRef.current.querySelector('a-scene')) {
      // Create A-Frame scene dynamically
      const scene = document.createElement('a-scene')
      scene.setAttribute('embedded', '')
      scene.setAttribute('loading-screen', 'enabled: false')
      
      // Add camera
      const camera = document.createElement('a-camera')
      camera.setAttribute('position', '0 1.6 0')
      camera.setAttribute('look-controls', '')
      camera.setAttribute('wasd-controls', '')
      scene.appendChild(camera)

      // Add light
      const light = document.createElement('a-light')
      light.setAttribute('type', 'ambient')
      light.setAttribute('color', '#ffffff')
      light.setAttribute('intensity', '1')
      scene.appendChild(light)

      // Add ground plane
      const ground = document.createElement('a-plane')
      ground.setAttribute('position', '0 0 0')
      ground.setAttribute('rotation', '-90 0 0')
      ground.setAttribute('width', '10')
      ground.setAttribute('height', '10')
      ground.setAttribute('color', '#2d3748')
      ground.setAttribute('shadow', 'cast: false; receive: true')
      scene.appendChild(ground)

      // Add algorithm-specific visualization
      addAlgorithmVisualization(scene, algorithmId)

      containerRef.current.appendChild(scene)
    }
  }, [algorithmId])

  return (
    <div className="space-y-6">
      {/* AR Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-400 mb-1">Mobile AR</h3>
            <p className="text-sm text-slate-300">Open this page on your phone to see the AR visualization in your real environment</p>
          </div>
        </div>
        <div className="bg-cyan-900/20 border border-cyan-600 p-4 rounded-lg flex items-start gap-3">
          <Monitor className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-cyan-400 mb-1">Desktop Viewer</h3>
            <p className="text-sm text-slate-300">Use your mouse to rotate and scroll to zoom the 3D scene below</p>
          </div>
        </div>
      </div>

      {/* 3D Visualization */}
      <div 
        ref={containerRef}
        className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden"
        style={{ height: '600px' }}
      />

      {/* Controls Info */}
      <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">Controls</h3>
            <ul className="text-sm text-slate-300 space-y-1">
              <li><span className="text-slate-400">• Desktop:</span> Left click + drag to rotate, scroll to zoom</li>
              <li><span className="text-slate-400">• Mobile:</span> Two-finger rotate, pinch to zoom</li>
              <li><span className="text-slate-400">• Algorithm:</span> {algorithmId?.replace('-', ' ').toUpperCase()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function addAlgorithmVisualization(scene: any, algorithmId: string) {
  const colors: { [key: string]: string } = {
    'bubble-sort': '#3b82f6',
    'quick-sort': '#06b6d4',
    'merge-sort': '#10b981',
    'binary-search': '#f59e0b',
    'linear-search': '#ec4899',
    'graph-traversal': '#8b5cf6',
    'linked-list': '#14b8a6',
    'dfs': '#6366f1',
    'bfs': '#f472b6',
  }

  const color = colors[algorithmId] || '#3b82f6'

  // Create array of boxes to represent the algorithm
  const numBoxes = 8
  const spacing = 1.2
  const startX = -(numBoxes * spacing) / 2

  for (let i = 0; i < numBoxes; i++) {
    const box = document.createElement('a-box')
    const height = 0.5 + Math.random() * 2
    
    box.setAttribute('position', `${startX + i * spacing} ${height / 2} -3`)
    box.setAttribute('scale', `0.8 ${height} 0.8`)
    box.setAttribute('color', color)
    box.setAttribute('shadow', 'cast: true; receive: true')
    box.setAttribute('animation', `
      property: rotation;
      to: 0 360 0;
      dur: 4000;
      loop: true;
      easing: linear;
    `)
    box.setAttribute('animation__scale', `
      property: scale;
      from: 0.8 ${height} 0.8;
      to: 0.8 ${height + 0.3} 0.8;
      dur: 2000;
      loop: true;
      direction: alternate;
      easing: easeInOutQuad;
    `)
    
    scene.appendChild(box)
  }

  // Add center sphere
  const sphere = document.createElement('a-sphere')
  sphere.setAttribute('position', '0 1 -3')
  sphere.setAttribute('radius', '0.3')
  sphere.setAttribute('color', color)
  sphere.setAttribute('shadow', 'cast: true; receive: true')
  sphere.setAttribute('animation', `
    property: position;
    from: 0 1 -3;
    to: 0 2 -3;
    dur: 1500;
    loop: true;
    direction: alternate;
    easing: easeInOutQuad;
  `)
  scene.appendChild(sphere)
}
