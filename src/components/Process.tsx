import { useEffect, useRef } from 'react'
import { Phone, Car, Search, CalendarCheck, Wrench } from 'lucide-react'

const steps = [
  { icon: Phone, num: '01', title: 'Na kontaktoni', desc: 'Na telefononi ose dërgoni një kërkesë online.' },
  { icon: Car, num: '02', title: 'Sjellni makinën', desc: 'Sillni mjetin tuaj në adresën tonë në Durrës.' },
  { icon: Search, num: '03', title: 'Bëjmë diagnozën', desc: 'Diagnostikojmë problemin me pajisje të avancuara.' },
  { icon: CalendarCheck, num: '04', title: 'Marrja e aprovimit', desc: 'Ju informojmë për koston dhe ju merrni vendimin.' },
  { icon: Wrench, num: '05', title: 'Riparimi & dorëzimi', desc: 'Riparojmë me kujdes dhe dorëzojmë të garantuar.' },
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
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Horizontal glow line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,229,255,0.1)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="section-label justify-center mb-4">Si Funksionon?</div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white">
            Procesi ynë i{' '}
            <span className="neon-text">punës</span>
          </h2>
        </div>

        {/* Steps desktop */}
        <div className="hidden md:flex items-start gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="flex items-start flex-1">
                <div
                  className="reveal flex flex-col items-center text-center flex-1"
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

                  <h3 className="font-orbitron font-semibold text-white text-sm mb-2 px-2">{step.title}</h3>
                  <p className="font-exo text-slate-500 text-xs leading-relaxed px-2">{step.desc}</p>
                </div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="step-connector mt-10 mx-2 flex-shrink-0" style={{ width: '40px' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Steps mobile */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="cyber-card reveal-left flex items-center gap-5 p-5"
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
                  <h3 className="font-orbitron font-semibold text-white text-sm mb-1">{step.title}</h3>
                  <p className="font-exo text-slate-500 text-xs leading-relaxed">{step.desc}</p>
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
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/18395898/pexels-photo-18395898.jpeg?auto=compress&cs=tinysrgb&w=1920')" }} />
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[var(--neon-cyan)] opacity-40" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[var(--neon-cyan)] opacity-40" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="section-label mb-3">Teknologjia e ardhme</div>
              <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-white mb-2">
                Shërbim për{' '}
                <span className="neon-text">makina elektrike</span>
              </h3>
              <p className="font-exo text-slate-400 text-sm max-w-md">
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
