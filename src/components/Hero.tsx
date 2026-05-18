import { useEffect, useRef, useState, useCallback } from 'react'
import { Calendar, Phone, Zap, Settings, MapPin } from 'lucide-react'

const TOTAL_FRAMES = 240

const stats = [
  { value: '12+', label: 'Vite Përvojë' },
  { value: '5000+', label: 'Klientë të Kënaqur' },
  { value: '5000+', label: 'Makina të Riparuara' },
  { value: '100%', label: 'Përkushtim' },
]

const badges = [
  { icon: Zap, text: 'Diagnozë e shpejtë' },
  { icon: Settings, text: 'Pajisje moderne' },
  { icon: MapPin, text: 'Vendndodhja Durrës' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)

  const [loadedCount, setLoadedCount] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [typed, setTyped] = useState('')
  const fullText = 'SERVIS KRISTI'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imagesRef.current[index]
    if (!canvas || !ctx || !img?.complete || !img.naturalWidth) return

    const cw = canvas.width
    const ch = canvas.height
    const imgAspect = img.naturalWidth / img.naturalHeight
    const canvasAspect = cw / ch

    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect
      sx = (img.naturalWidth - sw) / 2
    } else {
      sh = img.naturalWidth / canvasAspect
      sy = (img.naturalHeight - sh) / 2
    }

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
  }, [])

  useEffect(() => {
  let loaded = 0
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image()
    img.src = `/image-frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

    const onLoad = () => {
      loaded++
      setLoadedCount(loaded)
      if (loaded === 1) drawFrame(0)
    }

    // If already cached, complete is true immediately — onload won't fire
    if (img.complete && img.naturalWidth) {
      loaded++
      setLoadedCount(loaded)
    } else {
      img.onload = onLoad
    }

    imagesRef.current[i - 1] = img
  }

  // Always attempt to draw frame 0 after a short delay as a safety net
  const fallback = setTimeout(() => drawFrame(0), 100)
  return () => clearTimeout(fallback)
}, [drawFrame])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(currentFrameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      const scrolled = window.scrollY - container.offsetTop
      const total = container.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / total))
      setScrollProgress(progress)
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [drawFrame])

  // Broadcast scroll progress for navbar
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('heroScrollProgress', { detail: scrollProgress }))
  }, [scrollProgress])

  const loadingProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100)
  const isLoading = loadedCount < 30

  return (
    <div ref={containerRef} style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Loading Screen */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center gap-6">
            <img
              src="/logo.PNG"
              alt="Logo"
              className="w-24 h-auto"
              style={{animation: 'flagFloat 4s ease-in-out infinite' }}
            />
            <div className="font-orbitron text-[var(--neon-cyan)] text-xs tracking-[0.4em]">
              DUKE NGARKUAR...
            </div>
            <div className="w-64 h-px bg-[rgba(0,229,255,0.15)] relative overflow-hidden">
              <div
                className="h-full bg-[var(--neon-cyan)] transition-all duration-200"
                style={{ width: `${loadingProgress}%`, boxShadow: '0 0 12px var(--neon-cyan)' }}
              />
            </div>
            <div className="text-xs font-orbitron text-slate-600">{loadingProgress}%</div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'brightness(0.38) saturate(0.75)' }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 video-overlay" />
        <div className="absolute inset-0 opacity-100 bg-grid" />

        {/* Scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-[2px] z-20 transition-all duration-75"
          style={{ width: `${scrollProgress * 100}%`, background: 'var(--neon-cyan)', boxShadow: '0 0 10px var(--neon-cyan)' }}
        />

        {/* Scan Line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="w-full h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-20"
            style={{ animation: 'scanLine 6s linear infinite' }}
          />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-[var(--neon-cyan)] opacity-40" />
        <div className="absolute top-24 right-6 w-16 h-16 border-r-2 border-t-2 border-[var(--neon-cyan)] opacity-40" />
        <div className="hidden md:block absolute bottom-1 left-6 w-16 h-16 border-l-2 border-b-2 border-[var(--neon-cyan)] opacity-40" />
<div className="hidden md:block absolute bottom-1 right-6 w-16 h-16 border-r-2 border-b-2 border-[var(--neon-cyan)] opacity-40" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute particle-dot"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        {/* ============ MOBILE LAYOUT ============ */}
        <div className="absolute inset-0 z-10 flex flex-col px-6 md:hidden">

          {/* Logo — top, small */}
          <div className="flex justify-center pt-24">
            <img
              src="/logo.PNG"
              alt="Logo"
              className="h-auto w-28 opacity-90"
              style={{
                animation: 'flagAppear 1.2s ease 0.9s both, flagFloat 8s ease-in-out 0.5s infinite',
              }}
            />
          </div>

          {/* Empty space — animation visible here */}
          <div className="flex-1" />

          {/* Bottom content */}
          <div className="flex flex-col items-center gap-5 pb-16">
            <p
              className="font-orbitron text-[var(--neon-cyan)] text-sm tracking-widest text-center"
              style={{ animation: 'slideFromLeft 0.7s ease 1.8s both' }}
            >
              Çdo problem, tek ne ka zgjidhje.
            </p>

            <div
              className="flex flex-col w-full gap-3"
              style={{ animation: 'slideFromRight 0.7s ease 2.1s both' }}
            >
              <button
  onClick={() =>
    window.open(
      'https://wa.me/355677161524?text=' +
        encodeURIComponent(
          'Pershendetje, do doja te rezervoja per makinen time.'
        ),
      '_blank'
    )
  }
  className="flex items-center justify-center w-full gap-2 cyber-btn-filled"
>
  <Calendar size={16} />
  Rezervo Tani
</button>
              <a
                href="tel:0677161524"
                className="flex items-center justify-center w-full gap-2 cyber-btn"
              >
                <Phone size={16} />
                067 716 1524
              </a>
            </div>
          </div>
        </div>

        {/* ============ DESKTOP LAYOUT ============ */}
        <div className="absolute inset-0 z-10 flex-col justify-center hidden w-full px-12 mx-auto md:flex max-w-7xl">

          {/* Heading */}
          <h1 className="pt-24 mb-4 font-black leading-none font-orbitron">
            <div
              className="text-white text-7xl lg:text-8xl"
              style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}
            >
              {typed}
              <span className="animate-pulse text-[var(--neon-cyan)]">_</span>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            className="font-orbitron text-[var(--neon-cyan)] text-sm tracking-widest mb-8"
            style={{ animation: 'slideFromLeft 0.7s ease 1.8s both' }}
          >
            Çdo problem, tek ne ka zgjidhje.
          </p>

          {/* Badges — staggered animation */}
          <div className="flex gap-3 mb-10">
            {badges.map(({ icon: Icon, text }, i) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 border border-[rgba(0,229,255,0.2)] bg-[rgba(0,229,255,0.05)] backdrop-blur-sm text-sm text-slate-300 font-exo"
                style={{ animation: `slideFromLeft 0.6s ease ${1.0 + i * 0.2}s both` }}
              >
                <Icon size={14} className="text-[var(--neon-cyan)]" />
                {text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex gap-4 mb-16"
            style={{ animation: 'slideFromRight 0.7s ease 2.1s both' }}
          >
            <button
              onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 cyber-btn-filled"
            >
              <Calendar size={16} />
              Rezervo Tani
            </button>
            <a
              href="tel:0677161524"
              className="flex items-center justify-center gap-2 cyber-btn"
            >
              <Phone size={16} />
              067 716 1524
            </a>
          </div>

          {/* Stats */}
          <div className="grid max-w-2xl grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="relative p-5 text-center cyber-card corner-tl corner-br"
                style={{ animation: `zoomFade 0.6s ease ${2.4 + i * 0.15}s both` }}
              >
                <div className="mb-1 text-2xl font-black stat-number md:text-3xl">{s.value}</div>
                <div className="text-xs tracking-widest uppercase font-exo text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <button
          onClick={() => {
            const c = containerRef.current
            if (c) window.scrollTo({ top: c.offsetTop + c.offsetHeight, behavior: 'smooth' })
          }}
          className="absolute bottom-6 left-0 right-0 mx-auto w-fit flex flex-col items-center gap-2 text-[var(--neon-cyan)] opacity-70 hover:opacity-100 transition-opacity z-20"
          style={{ animation: 'fadeUpSlow 0.7s ease 3.2s both, float 3s ease-in-out 4s infinite' }}
        >
          <span className="text-xs tracking-widest font-orbitron">Shiko më shumë</span>
          <ChevronDown size={20} />
        </button> */}

      </div>
    </div>
  )
}