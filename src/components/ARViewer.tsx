import { useEffect, useRef, useState, useCallback } from 'react'
import { Camera, Monitor, X, AlertCircle } from 'lucide-react'

interface ARViewerProps { algorithmId: string }

const COLORS: Record<string,string> = {
  'bubble-sort':'#3b82f6','quick-sort':'#06b6d4','merge-sort':'#10b981',
  'binary-search':'#f59e0b','linear-search':'#ec4899','graph-traversal':'#8b5cf6',
  'linked-list':'#14b8a6', dfs:'#6366f1', bfs:'#f472b6',
}
const VALUES = [38,27,43,3,9,82,10,55]

function buildScene(id:string, col:string):string {
  const bars = VALUES.map((v,i)=>{
    const h=((v/100)*3+0.3).toFixed(2), x=((i-3.5)*1.15).toFixed(2)
    const yh=(parseFloat(h)/2).toFixed(2), yu=(parseFloat(h)/2+0.45).toFixed(2), yt=(parseFloat(h)+0.7).toFixed(2)
    const d=1200+i*140, rd=5000+i*300
    return `<a-box position="${x} ${yh} 0" width="0.85" height="${h}" depth="0.85" color="${col}" opacity="0.92" animation="property:position;from:${x} ${yh} 0;to:${x} ${yu} 0;dur:${d};loop:true;direction:alternate;easing:easeInOutSine" animation__r="property:rotation;to:0 360 0;dur:${rd};loop:true;easing:linear"></a-box><a-text value="${v}" position="${x} ${yt} 0" color="#fff" width="2" align="center" scale="0.5 0.5 0.5"></a-text>`
  }).join('')
  const sph = Array.from({length:6},(_,i)=>{
    const a=(i/6)*Math.PI*2, rx=(Math.cos(a)*2.6).toFixed(2), rz=(Math.sin(a)*2.6).toFixed(2), sd=1800+i*220
    return `<a-sphere position="${rx} 1.5 ${rz}" radius="0.14" color="${col}" animation="property:position;from:${rx} 0.8 ${rz};to:${rx} 2.6 ${rz};dur:${sd};loop:true;direction:alternate;easing:easeInOutQuad"></a-sphere>`
  }).join('')
  const title=id.replace(/-/g,' ').toUpperCase()
  return `<a-scene embedded loading-screen="enabled:false" background="color:#0f172a" renderer="colorManagement:true" style="width:100%;height:100%"><a-entity camera look-controls wasd-controls position="0 1.6 5"><a-cursor color="${col}"></a-cursor></a-entity><a-light type="ambient" intensity="0.7"></a-light><a-light type="directional" position="3 5 3" intensity="1.2"></a-light><a-sky color="#0f172a"></a-sky><a-plane position="0 0 0" rotation="-90 0 0" width="14" height="14" color="#1e293b"></a-plane><a-text value="${title}" position="-3 3.8 0" color="${col}" width="7"></a-text>${bars}<a-torus position="0 1.8 0" radius="2.6" radius-tubular="0.04" color="${col}" opacity="0.35" animation="property:rotation;to:0 360 0;dur:7000;loop:true;easing:linear"></a-torus>${sph}</a-scene>`
}

export default function ARViewer({algorithmId}:ARViewerProps){
  const boxRef   = useRef<HTMLDivElement>(null)
  const vidRef   = useRef<HTMLVideoElement>(null)
  const cvRef    = useRef<HTMLCanvasElement>(null)
  const streamRef= useRef<MediaStream|null>(null)
  const rafRef   = useRef<number>(0)
  const [mode,setMode]     = useState<'3d'|'ar'>('3d')
  const [err,setErr]       = useState('')
  const [loading,setLoad]  = useState(false)
  const [ready,setReady]   = useState(false)
  const col = COLORS[algorithmId]??'#3b82f6'

  // 3D scene
  useEffect(()=>{
    if(mode!=='3d') return
    const c=boxRef.current; if(!c) return
    const old=c.querySelector('a-scene'); if(old) old.remove()
    c.innerHTML=buildScene(algorithmId,col)
  },[algorithmId,mode,col])

  // AR draw loop
  const draw = useCallback(()=>{
    const cv=cvRef.current, vid=vidRef.current
    if(!cv||!vid||vid.readyState<2||!vid.videoWidth){rafRef.current=requestAnimationFrame(draw);return}
    if(cv.width!==vid.videoWidth)  cv.width =vid.videoWidth
    if(cv.height!==vid.videoHeight)cv.height=vid.videoHeight
    const ctx=cv.getContext('2d'); if(!ctx){rafRef.current=requestAnimationFrame(draw);return}
    ctx.drawImage(vid,0,0,cv.width,cv.height)
    const now=Date.now(), W=cv.width, H=cv.height
    const maxH=H*0.50, barW=Math.min(W/(VALUES.length*2.5),65)
    const gap=barW*0.45, totalW=VALUES.length*(barW+gap)-gap
    const sx=(W-totalW)/2, by=H*0.80
    ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=2
    ctx.beginPath();ctx.moveTo(sx-10,by);ctx.lineTo(sx+totalW+10,by);ctx.stroke()
    VALUES.forEach((v,i)=>{
      const bh=(v/100)*maxH, ph=(now%(2400+i*280))/(2400+i*280)
      const pulse=Math.abs(Math.sin(ph*Math.PI*2))*12
      const x=sx+i*(barW+gap), y=by-bh-pulse
      ctx.fillStyle='rgba(0,0,0,0.25)'; ctx.fillRect(x+3,y+3,barW,bh+pulse)
      const g=ctx.createLinearGradient(x,y,x,by)
      g.addColorStop(0,col); g.addColorStop(1,col+'44')
      ctx.fillStyle=g; ctx.beginPath()
      const r=Math.min(5,barW*0.18)
      ctx.moveTo(x+r,y);ctx.lineTo(x+barW-r,y);ctx.arcTo(x+barW,y,x+barW,y+r,r)
      ctx.lineTo(x+barW,by);ctx.lineTo(x,by);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r)
      ctx.closePath();ctx.fill()
      ctx.strokeStyle='rgba(255,255,255,0.4)';ctx.lineWidth=1.5;ctx.stroke()
      ctx.shadowColor='rgba(0,0,0,0.9)';ctx.shadowBlur=4
      ctx.fillStyle='#fff';ctx.font='bold '+Math.max(Math.round(barW*0.34),10)+'px monospace'
      ctx.textAlign='center';ctx.fillText(String(v),x+barW/2,y-5);ctx.shadowBlur=0
    })
    const fs=Math.round(W*0.032)
    ctx.shadowColor='rgba(0,0,0,0.95)';ctx.shadowBlur=6
    ctx.font='bold '+fs+'px monospace';ctx.textAlign='left';ctx.fillStyle=col
    ctx.fillText(algorithmId.replace(/-/g,' ').toUpperCase(),16,fs+12)
    ctx.fillStyle='rgba(255,255,255,0.55)';ctx.font=Math.round(fs*0.6)+'px sans-serif'
    ctx.fillText('AR Mode • CodeCraft',16,fs*2+14);ctx.shadowBlur=0
    rafRef.current=requestAnimationFrame(draw)
  },[algorithmId,col])

  useEffect(()=>{
    if(mode==='ar'){rafRef.current=requestAnimationFrame(draw)}
    else{cancelAnimationFrame(rafRef.current)}
    return ()=>cancelAnimationFrame(rafRef.current)
  },[mode,draw])

  const startAR=async()=>{
    setErr('');setLoad(true);setReady(false)
    streamRef.current?.getTracks().forEach(t=>t.stop())
    try{
      const stream=await navigator.mediaDevices.getUserMedia({
        video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},
        audio:false
      })
      streamRef.current=stream
      setMode('ar');setLoad(false)
      const attach=(n=0)=>{
        const v=vidRef.current
        if(v){
          v.srcObject=stream
          v.onloadedmetadata=()=>v.play().then(()=>setReady(true)).catch(()=>{})
        } else if(n<30) setTimeout(()=>attach(n+1),50)
      }
      attach()
    }catch(e:unknown){
      setLoad(false)
      const er=e as{name?:string;message?:string}
      if(er.name==='NotAllowedError'||er.name==='PermissionDeniedError')
        setErr('Camera permission denied. Tap Allow when the browser asks.')
      else if(er.name==='NotFoundError'||er.name==='DevicesNotFoundError')
        setErr('No camera found on this device.')
      else if(er.name==='NotReadableError')
        setErr('Camera is in use by another app.')
      else setErr('Camera error: '+(er.message??'unknown'))
    }
  }

  const stopAR=()=>{
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach(t=>t.stop())
    streamRef.current=null
    if(vidRef.current) vidRef.current.srcObject=null
    setReady(false);setMode('3d');setErr('')
  }

  useEffect(()=>()=>{
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach(t=>t.stop())
  },[])

  return(
    <div className="space-y-4">
      {/* buttons */}
      <div className="flex gap-3 flex-wrap items-center">
        <button onClick={()=>{if(mode==='ar')stopAR()}}
          className={'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors '+(mode==='3d'?'bg-blue-600 text-white':'bg-slate-700 hover:bg-slate-600 text-slate-300')}>
          <Monitor className="w-4 h-4"/> 3D View
        </button>
        {mode!=='ar'?(
          <button onClick={startAR} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-500 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            <Camera className="w-4 h-4"/>
            {loading?'Opening camera…':'Launch AR (Camera)'}
          </button>
        ):(
          <button onClick={stopAR}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors">
            <X className="w-4 h-4"/> Stop AR
          </button>
        )}
        {mode==='ar'&&(
          <span className="flex items-center gap-1.5 text-sm font-medium" style={{color:ready?'#4ade80':'#facc15'}}>
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{backgroundColor:ready?'#4ade80':'#facc15'}}/>
            {ready?'AR Live':'Starting camera…'}
          </span>
        )}
      </div>
      {/* error */}
      {err&&(
        <div className="flex items-start gap-2 bg-red-950 border border-red-600 p-3 rounded-lg text-sm text-red-300">
          <AlertCircle className="w-4 h-4 mt-0.5 text-red-400"/>
          <div><p className="font-semibold text-red-200">{err}</p>
            <p className="mt-1 text-xs text-red-500">Chrome: tap the camera icon in the address bar and Allow. Site must be HTTPS or localhost.</p>
          </div>
        </div>
      )}
      {/* 3D */}
      {mode==='3d'&&(
        <div ref={boxRef} className="rounded-lg border border-slate-700 overflow-hidden bg-slate-900" style={{height:'520px',width:'100%'}}/>
      )}
      {/* AR */}
      {mode==='ar'&&(
        <div style={{position:'relative',height:'520px',borderRadius:8,overflow:'hidden',background:'#000',border:'2px solid '+(ready?'#22c55e':'#eab308')}}>
          <video ref={vidRef} autoPlay playsInline muted
            style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.001,zIndex:0}}/>
          <canvas ref={cvRef}
            style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:1}}/>
          <button onClick={stopAR}
            style={{position:'absolute',top:12,right:12,zIndex:10,background:'rgba(0,0,0,0.65)',border:'none',cursor:'pointer',color:'#fff',borderRadius:'50%',padding:8,display:'flex'}}>
            <X size={20}/>
          </button>
          {!ready&&(
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.75)',zIndex:5,gap:14}}>
              <div style={{width:44,height:44,border:'3px solid #3b82f6',borderTopColor:'transparent',borderRadius:'50%',animation:'spin 0.9s linear infinite'}}/>
              <p style={{fontSize:13,color:'#94a3b8'}}>Opening camera…</p>
            </div>
          )}
        </div>
      )}
      {/* info */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-sm">
        <p className="font-semibold text-white mb-2">How to use</p>
        <ul className="space-y-1 text-slate-400 text-xs">
          <li><span className="text-blue-400 font-medium">3D View</span> — Click &amp; drag to look around. Scroll to zoom.</li>
          <li><span className="text-green-400 font-medium">Launch AR (Camera)</span> — Opens your camera. Tap <strong>Allow</strong> when browser asks. Algorithm bars animate live on the real world.</li>
          <li className="text-slate-500">Works on any phone or laptop with a camera.</li>
        </ul>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
