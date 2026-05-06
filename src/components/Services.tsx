import { useEffect, useRef } from 'react'
import {
  Monitor, Wrench, Droplets, Zap, Disc, RefreshCw,
  Wind, Radio, ScanLine, Car, Settings, Battery
} from 'lucide-react'

const services = [
  {
    icon: Monitor,
    title: 'Diagnostikim Kompjuterik',
    desc: 'Skanim i plotë i sistemeve elektronike me teknologji të avancuar.',
    color: 'rgba(0, 229, 255, 1)',
  },
  {
    icon: Wrench,
    title: 'Riparim Motorri',
    desc: 'Riparim dhe mirëmbajtje e motorit nga teknikë të certifikuar.',
    color: 'rgba(0, 255, 157, 1)',
  },
  {
    icon: Droplets,
    title: 'Ndërrim Vajrash dhe Filtrash',
    desc: 'Ndërrim i rregullt i vajit dhe filtrash për performancë maksimale.',
    color: 'rgba(0, 229, 255, 1)',
  },
  {
    icon: Disc,
    title: 'Frenat',
    desc: 'Kontrollo dhe zëvendëso frenat për siguri optimale në rrugë.',
    color: 'rgba(0, 255, 157, 1)',
  },
  {
    icon: RefreshCw,
    title: 'Kambio',
    desc: 'Riparim dhe mirëmbajtje e sistemit të transmisionit.',
    color: 'rgba(0, 229, 255, 1)',
  },
  {
    icon: Wind,
    title: 'Kondicionier / AC',
    desc: 'Mbushje dhe riparim kondicioneri — freski perfekte gjatë gjithë vitit.',
    color: 'rgba(0, 255, 157, 1)',
  },
  {
    icon: Zap,
    title: 'Sistemi Elektrik',
    desc: 'Diagnostikim dhe riparim i sistemeve elektrike komplekse.',
    color: 'rgba(0, 229, 255, 1)',
  },
  {
    icon: ScanLine,
    title: 'Skanim dhe Kontroll Gabimesh',
    desc: 'Lexim dhe fshirje e kodeve të gabimit për çdo markë makine.',
    color: 'rgba(0, 255, 157, 1)',
  },
  {
    icon: Battery,
    title: 'Makina Elektrike',
    desc: 'Shërbim i specializuar për bateritë dhe sistemet e makinave elektrike.',
    color: 'rgba(0, 229, 255, 1)',
  },
  {
    icon: Radio,
    title: 'Xhenerike',
    desc: 'Riparime të ndryshme dhe zëvendësim i pjesëve origjinale dhe xhenerike.',
    color: 'rgba(0, 255, 157, 1)',
  },
  {
    icon: Car,
    title: 'Motorrike',
    desc: 'Shërbim i plotë edhe për motorra dhe mjete të lehta.',
    color: 'rgba(0, 229, 255, 1)',
  },
  {
    icon: Settings,
    title: 'Mirëmbajtje e Përgjithshme',
    desc: 'Kontrolle periodike dhe mirëmbajtje preventive gjithëpërfshirëse.',
    color: 'rgba(0, 255, 157, 1)',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right') ?? []
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="sherbimet" ref={sectionRef} className="relative py-24 bg-grid overflow-hidden">
      {/* bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060f1e] to-[#030712] opacity-90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-label mb-4">Shërbimet Tona</div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
            Për çdo makinë,{' '}
            <span className="neon-text">çdo lloj shërbimi</span>
          </h2>
          <div className="neon-divider w-24 mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="cyber-card reveal group p-6 cursor-pointer"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Top corner */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--neon-cyan)] opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--neon-cyan)] opacity-50 group-hover:opacity-100 transition-opacity" />

                <div
                  className="service-icon mb-4"
                  style={{ borderColor: `${service.color}33` }}
                >
                  <Icon
                    size={22}
                    style={{ color: service.color }}
                    className="group-hover:drop-shadow-[0_0_8px_var(--neon-cyan)] transition-all duration-300"
                  />
                </div>

                <h3 className="font-orbitron font-semibold text-white text-sm mb-2 leading-snug group-hover:text-[var(--neon-cyan)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-exo text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                  {service.desc}
                </p>

                {/* Hover glow line bottom */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-[var(--neon-cyan)] group-hover:w-full transition-all duration-500 shadow-[0_0_8px_var(--neon-cyan)]" />
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center reveal">
          <button
            onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
            className="cyber-btn px-12 py-4"
          >
            Shiko të Gjitha Shërbimet
          </button>
        </div>
      </div>
    </section>
  )
}
