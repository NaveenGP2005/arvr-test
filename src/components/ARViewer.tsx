import { useEffect, useRef, useState } from 'react'
import { Camera, Monitor } from 'lucide-react'

interface ARViewerProps {
  algorithmId: string
}

const COLORS: Record<string, string> = {
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

export default function ARViewer({ algorithmId }: ARViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const [mode, setMode] = useState<'3d' | 'ar'>('3d')
  const [arSupported, setArSupported] = useState(false)

  useEffect(() => {
    // Check WebXR AR support
    if (navigator && 'xr' in navigator) {
      ;(navigator as any).xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setArSupported(supported)
      }).catch(() => setArSupported(false))
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Remove old scene
    const old = container.querySelector('a-scene')
    if (old) old.remove()

    const color = COLORS[algorithmId] || '#3b82f6'

    // Build scene HTML string ‚Äî A-Frame works best via innerHTML
    const isAR = mode === 'ar'

    const sceneHtml = `
      <a-scene
        ${isAR ? 'webxr="requiredFeatures: hit-test,local-floor" ar-mode-ui="enabled: true"' : 'embedded'}
        loading-screen="enabled: false"
        background="${isAR ? 'transparent: true' : `color: #0f172a`}"
        renderer="colorManagement: true; physicallyCorrectLights: true"
        style="width:100%;height:100%"
      >
        <!-- Camera -->
        <a-entity camera look-controls wasd-controls position="0 1.6 4">
          <a-cursor color="${color}" fuse="false"></a-cursor>
        </a-entity>

        <!-- Lighting -->
        <a-light type="ambient" color="#ffffff" intensity="0.6"></a-light>
        <a-light type="directional" position="2 4 3" intensity="1.2" color="#ffffff"></a-light>

        ${!isAR ? `<a-sky color="#0f172a"></a-sky>` : ''}

        <!-- Ground -->
        <a-plane position="0 0 0" rotation="-90 0 0" width="12" height="12"
          color="#1e293b" opacity="${isAR ? '0.3' : '1'}" shadow="receive: true">
        </a-plane>

        <!-- Title text -->
        <a-text value="${algorithmId.replace(/-/g, ' ').toUpperCase()}"
          position="-2 3.5 -1" color="${color}" width="6" align="left" font="monoid">
        </a-text>

        <!-- Bars representing array elements -->
        ${[38, 27, 43, 3, 9, 82, 10, 55].map((val, i) => {
          const h = (val / 100) * 3 + 0.3
          const x = (i - 3.5) * 1.1
          return `
            <a-box position="${x} ${h / 2} 0" width="0.8" height="${h}" depth="0.8"
              color="${color}" opacity="0.9" shadow="cast: true; receive: true"
              animation="property: position; from: ${x} ${h / 2} 0; to: ${x} ${h / 2 + 0.4} 0;
                          dur: ${1200 + i * 150}; loop: true; direction: alternate; easing: easeInOutSine"
              animation__rot="property: rotation; from: 0 0 0; to: 0 ${i % 2 === 0 ? 360 : -360} 0;
                               dur: ${5000 + i * 300}; loop: true; easing: linear">
            </a-box>
            <a-text value="${val}" position="${x} ${h + 0.6} 0" color="#ffffff"
              width="2" align="center" scale="0.5 0.5 0.5">
            </a-text>
          `
        }).join('')}

        <!-- Center spinning ring -->
        <a-torus position="0 2 0" radius="2.5" radius-tubular="0.05"
          color="${color}" opacity="0.4"
          animation="property: rotation; to: 0 360 0; dur: 8000; loop: true; easing: linear">
        </a-torus>

        <!-- Floating particles -->
        ${Array.from({ length: 6 }, (_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const rx = Math.cos(angle) * 2.5
          const rz = Math.sin(angle) * 2.5
          return `
            <a-sphere position="${rx} 1.5 ${rz}" radius="0.15" color="${color}"
              animation="property: position; from: ${rx} 1 ${rz}; to: ${rx} 2.5 ${rz};
                          dur: ${1800 + i * 200}; loop: true; direction: alternate; easing: easeInOutQuad">
            </a-sphere>
          `
        }).join('')}
      </a-scene>
    `

    container.innerHTML = sceneHtml
    sceneRef.current = container.querySelector('a-scene')
  }, [algorithmId, mode])

  const launchAR = () => {
    if (arSupported) {
      setMode('ar')
    } else {
      alert('AR not supported on this device/browser.\nTry Chrome on Android with ARCore.')
    }
  }

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-3">
        <button
          onClick={() => setMode('3d')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${mode === '3d' ? 'bg-blue-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
        >
          <Monitor className="w-4 h-4" /> 3D View
        </button>
        <button
          onClick={launchAR}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition"
        >
          <Camera className="w-4 h-4" /> Launch AR
        </button>
      </div>

      {!arSupported && (
        <div className="bg-yellow-900/20 border border-yellow-600 p-3 rounded text-sm text-yellow-300">
          Ì≥± For real AR: open on Android + Chrome. On iOS use Safari. Desktop shows 3D only.
        </div>
      )}

      {/* Scene container */}
      <div
        ref={containerRef}
        className="rounded-lg border border-slate-700 overflow-hidden bg-slate-900"
        style={{ height: '520px', width: '100%' }}
      />

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-sm text-slate-300">
        <p className="font-semibold text-white mb-2">Controls</p>
        <ul className="space-y-1 text-slate-400">
          <li>Ì∂±Ô∏è <strong>Desktop:</strong> Click + drag to look, WASD to move</li>
          <li>Ì≥± <strong>Mobile:</strong> Touch + drag to rotate, pinch to zoom</li>
          <li>Ì¥Æ <strong>AR:</strong> Point camera at floor, tap to place</li>
        </ul>
      </div>
    </div>
  )
}
