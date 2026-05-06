import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const images = [
  {
    src: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Mekanik duke punuar',
  },
  {
    src: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Servis makine',
  },
  {
    src: 'https://images.pexels.com/photos/4112196/pexels-photo-4112196.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Motorri i makinës',
  },
  {
    src: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Diagnostikim kompjuterik',
  },
  {
    src: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Veglat e punës',
  },
  {
    src: 'https://images.pexels.com/photos/4116177/pexels-photo-4116177.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Frenat e makinës',
  },
  {
    src: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Punëtor profesionist',
  },
  {
    src: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Sistemi elektrik',
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="galeria" ref={sectionRef} className="relative py-24 overflow-hidden" style={{ background: '#030712' }}>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 reveal">
          <div className="section-label mb-4">Galeria</div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white">
            Pamje nga{' '}
            <span className="neon-text">servisi ynë</span>
          </h2>
          <div className="neon-divider w-24 mt-6" />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[500px] reveal">
          {images.slice(0, 7).map((img, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              className={`relative overflow-hidden cursor-pointer group border border-[rgba(0,229,255,0.1)] hover:border-[rgba(0,229,255,0.5)] transition-all duration-300 ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ filter: 'brightness(0.7) saturate(0.8)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,7,18,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 border border-[var(--neon-cyan)] flex items-center justify-center">
                  <span className="text-[var(--neon-cyan)] text-xl">+</span>
                </div>
              </div>
              {/* Scan effect on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[var(--neon-cyan)] group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden reveal">
          <div className="relative overflow-hidden border border-[rgba(0,229,255,0.2)]" style={{ height: '280px' }}>
            <img
              src={images[current].src}
              alt={images[current].alt}
              className="w-full h-full object-cover transition-all duration-500"
              style={{ filter: 'brightness(0.7)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,7,18,0.8)] to-transparent" />

            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 border border-[var(--neon-cyan)] flex items-center justify-center bg-[rgba(3,7,18,0.8)] text-[var(--neon-cyan)]">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 border border-[var(--neon-cyan)] flex items-center justify-center bg-[rgba(3,7,18,0.8)] text-[var(--neon-cyan)]">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2 bg-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]'
                    : 'w-2 h-2 bg-slate-700'
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(3,7,18,0.95)] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-[var(--neon-cyan)] hover:text-white transition-colors">
            <X size={28} />
          </button>
          <img
            src={images[lightbox].src.replace('w=800', 'w=1200')}
            alt={images[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain border border-[rgba(0,229,255,0.3)]"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => l !== null && l > 0 ? l - 1 : images.length - 1) }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-[var(--neon-cyan)] flex items-center justify-center text-[var(--neon-cyan)] hover:bg-[rgba(0,229,255,0.1)] transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => l !== null && l < images.length - 1 ? l + 1 : 0) }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-[var(--neon-cyan)] flex items-center justify-center text-[var(--neon-cyan)] hover:bg-[rgba(0,229,255,0.1)] transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  )
}
