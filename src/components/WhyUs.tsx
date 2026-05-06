import { useEffect, useRef } from 'react'
import { Award, Cpu, Clock, ShieldCheck } from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: 'Eksperiencë e gjerë',
    desc: 'Punojmë me çdo markë dhe model makine — nga veturat e zakonshme deri tek ato luksoze.',
  },
  {
    icon: Cpu,
    title: 'Teknologji moderne',
    desc: 'Pajisje të avancuara për diagnozë të saktë dhe riparime cilësore — rezultate të garantuara.',
  },
  {
    icon: Clock,
    title: 'Zgjidhje të shpejta',
    desc: 'Kohë e kursyer, probleme të zgjidhura. Makina juaj kthehet shpejt dhe e rregulluar plotësisht.',
  },
  {
    icon: ShieldCheck,
    title: 'Garanci shërbimi',
    desc: 'Garantojmë punën dhe pjesët e përdorura. Besueshmëria jonë është kartëvizita jonë.',
  },
]

export default function WhyUs() {
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
    <section id="pse-ne" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          filter: 'brightness(0.08) saturate(0.5)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,229,255,0.05)] to-[rgba(0,255,157,0.03)]" />
      <div className="absolute inset-0 bg-grid" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[var(--neon-cyan)] rounded-full blur-[120px] opacity-5" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[var(--neon-green)] rounded-full blur-[120px] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="section-label mb-4 reveal-left">Pse Servis Kristi?</div>
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white leading-tight mb-6 reveal-left" style={{ transitionDelay: '100ms' }}>
              Besueshmëri.<br />
              <span className="neon-text">Cilësi.</span>{' '}
              <span className="neon-text-green">Teknologji.</span>
            </h2>
            <p className="font-exo text-slate-400 text-base leading-relaxed mb-8 reveal-left" style={{ transitionDelay: '200ms' }}>
              Servis Kristi ofron shërbim premium me çmime të ndershme. Çdo makinë trajtohet me kujdesin që meriton — si e jona.
            </p>
            <div className="neon-divider w-20 reveal-left" style={{ transitionDelay: '300ms' }} />
          </div>

          {/* Right - Reasons Grid */}
          <div className="grid grid-cols-1 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon
              return (
                <div
                  key={r.title}
                  className="cyber-card reveal-right flex items-start gap-5 p-5"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="service-icon flex-shrink-0">
                    <Icon size={20} className="text-[var(--neon-cyan)]" />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-semibold text-white text-sm mb-1">{r.title}</h3>
                    <p className="font-exo text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
