import { useEffect, useRef, useState } from 'react'
import { Camera, Monitor, X, AlertCircle } from 'lucide-react'

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

const VALUES = [38, 27, 43, 3, 9, 82, 10, 55]

function buildScene(algorithmId: string, color: string): string {
  const bars = VALUES.map((val, i) => {
    const h = ((val / 100) * 3 + 0.3).toFixed(2)
    const x = ((i - 3.5) * 1.15).toFixed(2)
    const yHalf = (parseFloat(h) / 2).toFixed(2)
    const yUp   = (parseFloat(h) / 2 + 0.45).toFixed(2)
    const yTop  = (parseFloat(h) + 0.7).toFixed(2)
    const dur  = 1200 + i * 140
    const rdur = 5000 + i * 300
    return [
      `<a-box position="${x} ${yHalf} 0" width="0.85" height="${h}" depth="0.85"`,
      `  color="${color}" opacity="0.92"`,
      `  animation="property:position; from:${x} ${yHalf} 0; to:${x} ${yUp} 0; dur:${dur}; loop:true; direction:alternate; easing:easeInOutSine"`,
      `  animation__r="property:rotation; to:0 360 0; dur:${rdur}; loop:true; easing:linear">`,
      `</a-box>`,
      `<a-text value="${val}" position="${x} ${yTop} 0" color="#fff" width="2" align="center" scale="0.5 0.5 0.5"></a-text>`,
    ].join(' ')
  }).join('')

  const spheres = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2
    const rx = (Math.cos(a) * 2.6).toFixed(2)
    const rz = (Math.sin(a) * 2.6).toFixed(2)
    const sdur = 1800 + i * 220
    return `<a-sphere position="${rx} 1.5 ${rz}" radius="0.14" color="${color}" animation="property:position; from:${rx} 0.8 ${rz}; to:${rx} 2.6 ${rz}; dur:${sdur}; loop:true; direction:alternate; easing:easeInOutQuad"></a-sphere>`
  }).join('')

  const title = algorithmId.replace(/-/g, ' ').toUpperCase()
  return [
    `<a-scene embedded loading-screen="enabled: false" background="color: #0f172a" renderer="colorManagement: true" style="width:100%;height:100%">`,
    `<a-entity camera look-controls="reverseMouseDrag: false" wasd-controls position="0 1.6 5">`,
    `<a-cursor color="${color}" fuse="false"></a-cursor></a-entity>`,
    `<a-light type="ambient" color="#fff" intensity="0.7"></a-light>`,
    `<a-light type="directional" position="3 5 3" intensity="1.2"></a-light>`,
    `<a-sky color="#0f172a"></a-sky>`,
    `<a-plane position="0 0 0" rotation="-90 0 0" width="14" height="14" color="#1e293b"></a-plane>`,
    `<a-text value="${title}" position="-3 3.8 0" color="${color}" width="7" align="left"></a-text>`,
    bars,
    `<a-torus position="0 1.8 0" radius="2.6" radius-tubular="0.04" color="${color}" opacity="0.35" animation="property:rotation; to:0 360 0; dur:7000; loop:true; easing:linear"></a-torus>`,
    spheres,
    `</a-scene>`,
  ].join('')
}

export default function ARViewer({ algorithmId }: ARViewerProps) {
  const sceneContainerRef = useRef<HTMLDivElement>(null)
  const videoRef          = useRef<HTMLVideoElement>(null)
  const canvasRef         = useRef<HTMLCanvasElement>(null)
  const streamRef         = useRef<MediaStream | null>(null)
  const animFrameRef      = useRef<number>(0)

  const [mode, setMode]           = useState<'3d' | 'ar'>('3d')
  const [camError, setCamError]   = useState('')
  const [camLoading, setCamLoading] = useState(false)

  const color = COLORS[algorithmId] ?? '#3b82f6'

  // Build A-Frame 3D scene
  useEffect(() => {
    if (mode !== '3d') return
    const container = sceneContainerRef.current
    if (!container) return
    const old = container.querySelector('a-scene')
    if (old) old.remove()
    container.innerHTML = buildScene(algorithmId, color)
  }, [algorithmId, mode, color])

  // Launch AR via getUserMedia
  const startAR = async () => {
    setCamError('')
    setCamLoading(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })
      streamRef.current = stream
      setMode('ar')
      setCamLoading(false)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      }, 80)
    } catch (err: unknown) {
      setCamLoading(false)
      const e = err as { name?: string; message?: string }
      if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
        setCamError('Camera permission denied. Tap Allow when your browser asks for camera access.')
      } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
        setCamError('No camera found on this device.')
      } else if (e.name === 'NotReadableError') {
        setCamError('Camera is already in use by another app. Close it and try again.')
      } else {
        setCamError('Could not open camera: ' + (e.message ?? 'unknown error'))
      }
    }
  }

  const stopAR = () => {
    cancelAnimationFrame(animFrameRef.current)
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setMode('3d')
    setCamError('')
  }

  // Draw camera + animated bars on canvas
  useEffect(() => {
    if (mode !== 'ar') return
    const canvas = canvasRef.current
    const video  = videoRef.current
    if (!canvas || !video) return

    let raf = 0
    const draw = () => {
      if (!canvas || !video || !video.videoWidth) { raf = requestAnimationFrame(draw); return }
      canvas.width  = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(video as CanvasImageSource, 0, 0)

      const now  = Date.now()
      const maxH = canvas.height * 0.52
      const barW = Math.min(canvas.width / (VALUES.length * 2.4), 68)
      const gap  = barW * 0.4
      const totalW = VALUES.length * (barW + gap) - gap
      const startX = (canvas.width - totalW) / 2
      const baseY  = canvas.height * 0.82

      ctx.strokeStyle = 'rgba(99,102,241,0.25)'
      ctx.lineWidth = 1
      for (let gx = 0; gx < canvas.width; gx += 60) {
        ctx.beginPath(); ctx.moveTo(gx, baseY); ctx.lineTo(gx, canvas.height); ctx.stroke()
      }
      ctx.beginPath(); ctx.moveTo(0, baseY); ctx.lineTo(canvas.width, baseY)
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.stroke()

      VALUES.forEach((val, i) => {
        const barH  = (val / 100) * maxH
        const pulse = Math.sin((now / (1200 + i * 140)) * Math.PI) * 14
        const x = startX + i * (barW + gap)
        const y = baseY - barH - pulse

        ctx.fillStyle = 'rgba(0,0,0,0.30)'
        ctx.fillRect(x + 3, y + 3, barW, barH + pulse)

        const grad = ctx.createLinearGradient(x, y, x, baseY)
        grad.addColorStop(0, color)
        grad.addColorStop(1, color + '55')
        ctx.fillStyle = grad
        ctx.beginPath()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (ctx as any).roundRect === 'function') { (ctx as any).roundRect(x, y, barW, barH + pulse, 5) }
        else { ctx.rect(x, y, barW, barH + pulse) }
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.5; ctx.stroke()

        ctx.fillStyle = '#ffffff'
        ctx.font = `bold ${Math.max(Math.round(barW * 0.36), 11)}px monospace`
        ctx.textAlign = 'center'
        ctx.fillText(String(val), x + barW / 2, y - 5)
      })

      const fs = Math.round(canvas.width * 0.034)
      ctx.font = `bold ${fs}px monospace`
      ctx.textAlign = 'left'
      ctx.fillStyle = color
      ctx.fillText(algorithmId.replace(/-/g, ' ').toUpperCase(), 18, fs + 10)
      ctx.fillStyle = 'rgba(255,255,255,0.55)'
      ctx.font = `${Math.round(fs * 0.65)}px sans-serif`
      ctx.fillText('AR Mode • CodeCraft', 18, fs * 2 + 12)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    animFrameRef.current = raf
    return () => cancelAnimationFrame(raf)
  }, [mode, algorithmId, color])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current)
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap items-center">
        <button
          onClick={() => { if (mode === 'ar') stopAR() }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === '3d' ? 'bg-blue-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
        >
          <Monitor className="w-4 h-4" /> 3D View
        </button>

        {mode !== 'ar' ? (
          <button
            onClick={startAR}
            disabled={camLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-500 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Camera className="w-4 h-4" />
            {camLoading ? 'Opening camera…' : 'Launch AR (Camera)'}
          </button>
        ) : (
          <button
            onClick={stopAR}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors"
          >
            <X className="w-4 h-4" /> Stop AR
          </button>
        )}

        {mode === 'ar' && (
          <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AR Live
          </span>
        )}
      </div>

      {camError && (
        <div className="flex items-start gap-2 bg-red-950 border border-red-600 p-3 rounded-lg text-sm text-red-300">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
          <div>
            <p className="font-semibold text-red-200 mb-0.5">Camera Error</p>
            <p>{camError}</p>
            <p className="mt-1 text-red-500 text-xs">Tip: HTTPS may be required. In Chrome go to Settings → Site Settings → Camera.</p>
          </div>
        </div>
      )}

      {mode === '3d' && (
        <div
          ref={sceneContainerRef}
          className="rounded-lg border border-slate-700 overflow-hidden bg-slate-900"
          style={{ height: '520px', width: '100%' }}
        />
      )}

      {mode === 'ar' && (
        <div className="relative rounded-lg overflow-hidden border border-green-600 bg-black" style={{ height: '520px' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
            aria-hidden="true"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={stopAR}
              className="bg-black/60 hover:bg-black/90 text-white p-2 rounded-full transition-colors"
              title="Stop AR"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-sm">
        <p className="font-semibold text-white mb-2">How to use</p>
        <ul className="space-y-1 text-slate-400 text-xs">
          <li><span className="text-blue-400 font-medium">3D View</span> — Interactive 3D scene. Click &amp; drag to look around, scroll to zoom.</li>
          <li><span className="text-green-400 font-medium">Launch AR (Camera)</span> — Opens your real device camera and draws animated algorithm bars live on top of the feed.</li>
          <li className="text-slate-500">Works on any phone or laptop with a camera. No special hardware needed.</li>
        </ul>
      </div>
    </div>
  )
}
