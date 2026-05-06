import { useEffect, useRef } from 'react'
import { Phone, Car, Search, CalendarCheck, Wrench } from 'lucide-react'

const steps = [
  { icon: Phone, num: '01', title: 'Na kontaktoni', desc: 'Na telefononi ose dërgoni një kërkesë online.' },
  { icon: Car, num: '02', title: 'Dorzoni makiën', desc: 'Dorzoni mjetin tuaj në adresën tonë në Durrës.' },
  { icon: Search, num: '03', title: 'Diagnoza', desc: 'Diagnostikojmë problemin me pajisje të avancuara.' },
  { icon: CalendarCheck, num: '04', title: 'Marrja e aprovimit', desc: 'Ju informojmë për koston dhe ju merrni vendimin.' },
  { icon: Wrench, num: '05', title: 'Riparimi & dorëzimi', desc: 'Riparojmë mjetin tuaj dhe dorëzojmë me garanci.' },
]

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="procesi" ref={sectionRef} className="relative py-24 bg-[#060f1e] overflow-hidden">
      <div className="absolute inset-0 opacity-50 bg-grid" />

      {/* Horizontal glow line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,229,255,0.1)] to-transparent" />

      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center reveal">
          <div className="justify-center mb-4 section-label">Si Funksionon?</div>
          <h2 className="text-4xl font-bold text-white font-orbitron md:text-5xl">
            Procesi ynë i{' '}
            <span className="neon-text">punës</span>
          </h2>
        </div>

        {/* Steps desktop */}
        <div className="items-start hidden gap-0 md:flex">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="flex items-start flex-1">
                <div
                  className="flex flex-col items-center flex-1 text-center reveal"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Step icon */}
                  <div className="relative mb-6 group">
                    {/* Outer ring */}
                    <div
                      className="w-20 h-20 rounded-full border-2 border-[rgba(0,229,255,0.3)] flex items-center justify-center relative transition-all duration-500 group-hover:border-[var(--neon-cyan)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
                      style={{ background: 'rgba(6, 15, 30, 0.9)' }}
                    >
                      {/* Inner fill */}
                      <div className="w-14 h-14 rounded-full bg-[rgba(0,229,255,0.1)] flex items-center justify-center">
                        <Icon size={24} className="text-[var(--neon-cyan)]" />
                      </div>

                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--neon-cyan)] rounded-full flex items-center justify-center">
                        <span className="font-orbitron text-[10px] font-bold text-[#030712]">{i + 1}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="px-2 mb-2 text-sm font-semibold text-white font-orbitron">{step.title}</h3>
                  <p className="px-2 text-xs leading-relaxed font-exo text-slate-500">{step.desc}</p>
                </div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="flex-shrink-0 mx-2 mt-10 step-connector" style={{ width: '40px' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Steps mobile */}
        <div className="space-y-4 md:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="flex items-center gap-5 p-5 cyber-card reveal-left"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full border border-[rgba(0,229,255,0.4)] flex items-center justify-center bg-[rgba(0,229,255,0.08)]">
                    <Icon size={20} className="text-[var(--neon-cyan)]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--neon-cyan)] rounded-full flex items-center justify-center">
                    <span className="font-orbitron text-[9px] font-bold text-[#030712]">{i + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white font-orbitron">{step.title}</h3>
                  <p className="text-xs leading-relaxed font-exo text-slate-500">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Electric cars banner */}
        <div
          className="mt-20 reveal relative overflow-hidden rounded-none border border-[rgba(0,229,255,0.2)]"
          style={{ background: 'rgba(6, 15, 30, 0.9)' }}
        >
          <div className="absolute inset-0 bg-center bg-cover opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/18395898/pexels-photo-18395898.jpeg?auto=compress&cs=tinysrgb&w=1920')" }} />
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[var(--neon-cyan)] opacity-40" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[var(--neon-cyan)] opacity-40" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-6 p-8 md:p-12 md:flex-row">
            <div>
              <div className="mb-3 section-label">Teknologjia e ardhme</div>
              <h3 className="mb-2 text-2xl font-bold text-white font-orbitron md:text-3xl">
                Shërbim për{' '}
                <span className="neon-text">makina elektrike</span>
              </h3>
              <p className="max-w-md text-sm font-exo text-slate-400">
                Jemi të përgatitur për teknologjinë e së ardhmes. Servis i specializuar për bateritë dhe sistemet e makinave elektrike dhe hibride.
              </p>
            </div>
            <div className="text-6xl">
              ⚡
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
