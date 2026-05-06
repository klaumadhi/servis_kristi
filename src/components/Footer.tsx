import { Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react'

const services = [
  'Mbushje Kondicioneri',
  'Riparim Motorri',
  'Xhenerike',
  'Elektroauto',
  'Diagnostikim Kompjuterik',
  'Frenat & Kambio',
]

export default function Footer() {
  return (
    <footer className="relative bg-[#030712] border-t border-[rgba(0,229,255,0.1)] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Marquee strip */}
      <div className="border-y border-[rgba(0,229,255,0.1)] py-3 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, pass) => (
            <span key={pass} className="flex items-center gap-8 px-4">
              {['SERVIS KRISTI', '⚙', 'DURRËS', '⚙', 'KUJDES PROFESIONAL', '⚙', 'TEKNOLOGJI MODERNE', '⚙', 'GARANTIM CILËSIE', '⚙', '067 716 1524', '⚙'].map((item, i) => (
                <span
                  key={i}
                  className={`font-orbitron text-xs tracking-widest ${
                    item === '⚙' ? 'text-[var(--neon-cyan)] opacity-50' : 'text-slate-600'
                  }`}
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="relative z-10 px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.PNG" alt="Servis Kristi" className="object-contain w-16 h-16" />
              <div>
                <div className="text-sm font-bold tracking-widest text-white font-orbitron">AUTO SERVICE</div>
                <div className="text-2xl font-black leading-none tracking-widest font-orbitron neon-text">KRISTI</div>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed font-exo text-slate-500">
              Servis profesional i makinave në Durrës. Besueshmëri, cilësi dhe teknologji moderne për çdo automjet.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: MessageCircle, href: 'https://wa.me/355677161524' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-[rgba(0,229,255,0.2)] flex items-center justify-center text-slate-500 hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-widest text-white font-orbitron">SHËRBIMET</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-slate-500 hover:text-[var(--neon-cyan)] transition-colors duration-300 cursor-pointer group">
                  <span className="w-px h-4 bg-[var(--neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="text-sm font-exo">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-widest text-white font-orbitron">KONTAKT</h4>
            <div className="space-y-4">
              <a href="tel:0677161524" className="flex items-start gap-3 text-slate-500 hover:text-[var(--neon-cyan)] transition-colors duration-300 group">
                <Phone size={14} className="mt-0.5 flex-shrink-0 group-hover:text-[var(--neon-cyan)]" />
                <span className="text-sm font-exo">067 716 1524</span>
              </a>
              <a
                href="https://maps.google.com/?q=Rruga+Bajram+Tusha+14,+Durrës"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-slate-500 hover:text-[var(--neon-cyan)] transition-colors duration-300 group"
              >
                <MapPin size={14} className="mt-0.5 flex-shrink-0 group-hover:text-[var(--neon-cyan)]" />
                <span className="text-sm font-exo">Rruga Bajram Tusha 14,<br />Durrës, Shqipëri</span>
              </a>
            </div>

            {/* Quick reserve */}
            <div className="mt-8">
              <button
                onClick={() => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 text-xs cyber-btn-filled"
              >
                Rezervo Tani →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(0,229,255,0.08)] py-4">
        <div className="flex flex-col items-center justify-between gap-2 px-6 mx-auto max-w-7xl sm:flex-row">
          <p className="text-xs font-exo text-slate-700">
            © 2024 Servis Kristi. Të gjitha të drejtat të rezervuara.
          </p>
          <p className="font-orbitron text-[10px] text-slate-800 tracking-widest">
            DURRËS · SHQIPËRI
          </p>
        </div>
      </div>
    </footer>
  )
}
