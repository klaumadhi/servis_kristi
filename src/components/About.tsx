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
    <div ref={ref} className="stat-number text-3xl md:text-4xl font-black">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative reveal-left order-2 lg:order-1">
            <div className="relative">
              {/* Main image */}
              <img
                src="https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Servis Kristi Team"
                className="w-full object-cover border border-[rgba(0,229,255,0.2)]"
                style={{ height: '480px', filter: 'brightness(0.8) saturate(0.8)' }}
              />
              {/* Corner decorations */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[var(--neon-cyan)]" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[var(--neon-cyan)]" />

              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 cyber-card p-4">
                <div className="font-orbitron font-bold text-[var(--neon-cyan)] text-2xl">10+</div>
                <div className="font-exo text-slate-400 text-xs tracking-widest">VITE EKSPERIENCË</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="section-label mb-4 reveal">Rreth Nesh</div>
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-6 reveal" style={{ transitionDelay: '100ms' }}>
              Kush jemi <span className="neon-text">ne?</span>
            </h2>
            <p className="font-exo text-slate-400 text-base leading-relaxed mb-4 reveal" style={{ transitionDelay: '200ms' }}>
              Servis Kristi është një servis modern në Durrës që ofron shërbime të plota për mirëmbajtjen, riparimin dhe diagnostikimin e automjeteve.
            </p>
            <p className="font-exo text-slate-400 text-base leading-relaxed mb-8 reveal" style={{ transitionDelay: '300ms' }}>
              Qëllimi ynë është kënaqësia e klientit përmes cilësisë, besueshmërisë dhe çmimeve të ndershme. Punojmë me pasion për çdo makinë — të vogël apo të madhe.
            </p>

            {/* CTA */}
            <div className="reveal" style={{ transitionDelay: '400ms' }}>
              <div className="cyber-card p-5 mb-6 border-l-2 border-l-[var(--neon-cyan)] bg-[rgba(0,229,255,0.03)]">
                <p className="font-orbitron text-white text-sm font-semibold mb-1">
                  "Keni një problem me makinën?"
                </p>
                <p className="font-exo text-slate-400 text-sm">
                  Na kontaktoni tani dhe ne do t'ju ndihmojmë menjëherë!
                </p>
              </div>
              <a
                href="tel:0677161524"
                className="cyber-btn-filled inline-flex items-center gap-2"
              >
                📞 TELEFONONI: 067 716 1524
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="cyber-card reveal p-6 text-center relative overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,229,255,0.03)] to-transparent" />
              <CountUp end={stat.end} suffix={stat.suffix} />
              <div className="font-exo text-xs text-slate-500 uppercase tracking-widest mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
