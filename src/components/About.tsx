import { useEffect, useRef, useState } from 'react'

const stats = [
  { end: 10, suffix: '+', label: 'Vite Përvojë' },
  { end: 1000, suffix: '+', label: 'Klientë të Kënaqur' },
  { end: 5000, suffix: '+', label: 'Makina të Riparuara' },
  { end: 100, suffix: '%', label: 'Përkushtim' },
]

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const steps = 60
          const increment = end / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="text-3xl font-black stat-number md:text-4xl">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="rreth" ref={sectionRef} className="relative py-24 bg-[#060f1e] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Decorative lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,229,255,0.2)] to-transparent" />

      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className="relative order-2 reveal-left lg:order-1">
            <div className="relative">
              {/* Main image */}
              <img
                src="https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Servis Kristi Team"
                className="w-full object-cover border border-[rgba(0,229,255,0.2)]"
                style={{ height: '480px', filter: 'brightness(0.8) saturate(0.8)' }}
              />
              {/* Corner decorations */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[var(--neon-cyan)]" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[var(--neon-cyan)]" />

              {/* Overlay badge */}
              <div className="absolute p-4 bottom-6 left-6 cyber-card">
                <div className="font-orbitron font-bold text-[var(--neon-cyan)] text-2xl">10+</div>
                <div className="text-xs tracking-widest font-exo text-slate-400">VITE EKSPERIENCË</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-4 section-label reveal">Rreth Nesh</div>
            <h2 className="mb-6 text-4xl font-bold text-white font-orbitron md:text-5xl reveal" style={{ transitionDelay: '100ms' }}>
              Kush jemi <span className="neon-text">ne?</span>
            </h2>
            <p className="mb-4 text-base leading-relaxed font-exo text-slate-400 reveal" style={{ transitionDelay: '200ms' }}>
              Servis Kristi është një servis modern në Durrës që ofron shërbime të plota për mirëmbajtjen, riparimin dhe diagnostikimin e automjeteve.
            </p>
            <p className="mb-8 text-base leading-relaxed font-exo text-slate-400 reveal" style={{ transitionDelay: '300ms' }}>
              Qëllimi ynë është kënaqësia e klientit përmes cilësisë, besueshmërisë dhe çmimeve të ndershme. Punojmë me pasion për çdo makinë — të vogël apo të madhe.
            </p>

            {/* CTA */}
            <div className="reveal" style={{ transitionDelay: '400ms' }}>
              <div className="cyber-card p-5 mb-6 border-l-2 border-l-[var(--neon-cyan)] bg-[rgba(0,229,255,0.03)]">
                <p className="mb-1 text-sm font-semibold text-white font-orbitron">
                  "Keni një problem me makinën?"
                </p>
                <p className="text-sm font-exo text-slate-400">
                  Na kontaktoni tani dhe ne do t'ju ndihmojmë menjëherë!
                </p>
              </div>
              <a
                href="tel:0677161524"
                className="inline-flex items-center gap-2 cyber-btn-filled"
              >
                📞 TELEFONONI: 067 716 1524
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-20 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative p-6 overflow-hidden text-center cyber-card reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,229,255,0.03)] to-transparent" />
              <CountUp end={stat.end} suffix={stat.suffix} />
              <div className="mt-2 text-xs tracking-widest uppercase font-exo text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
