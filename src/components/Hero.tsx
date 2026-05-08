import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Calendar, Phone, Zap, Settings, MapPin } from 'lucide-react'

const stats = [
  { value: '12+', label: 'Vite Përvojë' },
  { value: '5000+', label: 'Klientë të Kënaqur' },
  { value: '5000+', label: 'Makina të Riparuara' },
  { value: '100%', label: 'Përkushtim' },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(true)
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

  return (
    <section className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  onLoadedData={() => setVideoLoaded(true)}
  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
  style={{ filter: 'brightness(0.35) saturate(0.8)' }}
>
  <source src="/hero.mp4" type="video/mp4" />
</video>

      {/* Fallback image — hidden once video loads */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          filter: 'brightness(0.25) saturate(0.6)',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 video-overlay" />
      <div className="absolute inset-0 opacity-100 bg-grid" />

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
      <div className="absolute bottom-8 left-6 w-16 h-16 border-l-2 border-b-2 border-[var(--neon-cyan)] opacity-40" />
      <div className="absolute bottom-8 right-6 w-16 h-16 border-r-2 border-b-2 border-[var(--neon-cyan)] opacity-40" />

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

      {/* Content */}
     <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-6 pt-24 mx-auto max-w-7xl md:block md:pt-24 md:pb-16">

  <div className="max-w-4xl text-center md:text-left">
    
    
<div className="flex justify-center mt-56 md:hidden">
  <img
    src="/logo.PNG"
    alt="Logo"
    className="w-40 h-auto animate-bounce-in"
    style={{ animation: 'logoPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both' }}
  />
</div>

<h1 className="justify-center hidden mt-6 mb-6 font-black leading-none md:flex sm:ml-10 font-orbitron">
  <div
    className="text-5xl text-white md:text-7xl lg:text-7xl"
    style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}
  >
    {typed}
    <span className="animate-pulse text-[var(--neon-cyan)]">_</span>
  </div>
</h1>

          {/* <p
            className="max-w-xl mb-3 text-lg leading-relaxed font-exo text-slate-300 md:text-xl"
            style={{ animation: 'fadeUp 0.8s ease 0.6s both' }}
          >
            Zgjidhje të plota për makinën tuaj.
          </p> */}
          <p
            className="font-orbitron text-[var(--neon-cyan)] text-sm tracking-widest mb-10 pt-4 md:pt-0"
            style={{ animation: 'fadeUp 0.8s ease 0.7s both' }}
          >
            Çdo problem, tek ne ka zgjidhje.
          </p>

          <div
            className="flex flex-wrap hidden gap-3 mb-10 xs:justify-center md:flex"
            style={{ animation: 'fadeUp 0.8s ease 0.8s both' }}
          >
            {[
              { icon: Zap, text: 'Diagnozë e shpejtë' },
              { icon: Settings, text: 'Pajisje moderne' },
              { icon: MapPin, text: 'Vendndodhja Durrës' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 border border-[rgba(0,229,255,0.2)] bg-[rgba(0,229,255,0.05)] backdrop-blur-sm text-sm text-slate-300 font-exo"
              >
                <Icon size={14} className="text-[var(--neon-cyan)]" />
                {text}
              </div>
            ))}
          </div>

          <div
            className="flex flex-col gap-4 sm:flex-row"
            style={{ animation: 'fadeUp 0.8s ease 1s both' }}
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
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 gap-4 mt-20 md:grid-cols-4"
          style={{ animation: 'fadeUp 0.8s ease 1.2s both' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative p-5 text-center cyber-card corner-tl corner-br"
            >
              <div className="mb-1 text-2xl font-black stat-number md:text-3xl">{s.value}</div>
              <div className="text-xs tracking-widest uppercase font-exo text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#sherbimet')?.scrollIntoView({ behavior: 'smooth' })}
        className="relative  pt-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--neon-cyan)] opacity-70 hover:opacity-100 transition-opacity"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <span className="text-xs tracking-widest font-orbitron">Shiko më shumë</span>
        <ChevronDown size={20} />
      </button>
    </section>
  )
}