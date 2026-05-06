import { useState, useEffect, useRef } from 'react'
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, MessageCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Na telefononi',
    value: '067 716 1524',
    href: 'tel:0677161524',
  },
  {
    icon: MapPin,
    label: 'Na gjeni këtu',
    value: 'Rruga Bajram Tusha 14, Durrës',
    href: 'https://maps.google.com/?q=Rruga+Bajram+Tusha+14,+Durrës',
  },
  {
    icon: Mail,
    label: 'Na shkruani',
    value: 'info@serviskristi.al',
    href: 'mailto:info@serviskristi.al',
  },
  {
    icon: Clock,
    label: 'Orari i punës',
    value: 'E Hënë – E Shtunë: 08:00 – 18:00',
    href: null,
  },
]

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.me/355677161524', label: 'WhatsApp' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', phone: '', car: '', problem: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', phone: '', car: '', problem: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1500)
  }

  return (
    <section id="kontakt" ref={sectionRef} className="relative py-24 overflow-hidden" style={{ background: '#030712' }}>
      <div className="absolute inset-0 bg-grid" />

      {/* Glowing orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--neon-cyan)] rounded-full blur-[180px] opacity-[0.03]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--neon-green)] rounded-full blur-[180px] opacity-[0.03]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-label mb-4">Kontakt</div>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white">
            Na <span className="neon-text">kontaktoni</span>
          </h2>
          <div className="neon-divider w-24 mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info + Map */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              const content = (
                <div
                  key={item.label}
                  className="cyber-card reveal-left flex items-center gap-4 p-5"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="service-icon flex-shrink-0">
                    <Icon size={18} className="text-[var(--neon-cyan)]" />
                  </div>
                  <div>
                    <div className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="font-exo text-white text-sm">{item.value}</div>
                  </div>
                </div>
              )
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : content
            })}

            {/* Map */}
            <div className="reveal-left" style={{ transitionDelay: '400ms' }}>
              <div className="border border-[rgba(0,229,255,0.2)] overflow-hidden" style={{ height: '220px' }}>
                <iframe
                  title="Servis Kristi Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.7!2d19.4603!3d41.3253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135030a26dce1a59%3A0x1!2sRruga+Bajram+Tusha+14%2C+Durr%C3%ABs!5e0!3m2!1sen!2sal!4v1620000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) brightness(0.7)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.google.com/?q=Rruga+Bajram+Tusha+14,+Durrës"
                target="_blank"
                rel="noreferrer"
                className="cyber-btn-filled flex items-center justify-center gap-2 w-full mt-0 py-3 text-xs"
                style={{ clipPath: 'none' }}
              >
                <MapPin size={14} />
                Hap në Google Maps
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="cyber-card reveal-right p-8 relative" style={{ transitionDelay: '200ms' }}>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-cyan)]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--neon-cyan)]" />

            <h3 className="font-orbitron font-bold text-white text-xl mb-6">
              Dërgo një kërkesë
            </h3>

            {sent && (
              <div className="mb-4 p-4 border border-[var(--neon-green)] bg-[rgba(0,255,157,0.05)] text-[var(--neon-green)] font-orbitron text-sm text-center">
                ✓ Kërkesa u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest block mb-2">Emri juaj</label>
                  <input
                    type="text"
                    placeholder="Emri Mbiemri"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="cyber-input w-full px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest block mb-2">Nr. i telefonit</label>
                  <input
                    type="tel"
                    placeholder="06X XXX XXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="cyber-input w-full px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest block mb-2">Marka e makinës</label>
                <input
                  type="text"
                  placeholder="p.sh. BMW, Mercedes, Toyota..."
                  value={form.car}
                  onChange={(e) => setForm({ ...form, car: e.target.value })}
                  className="cyber-input w-full px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest block mb-2">Problemi / Shërbimi i kërkuar</label>
                <textarea
                  rows={5}
                  placeholder="Përshkruani problemin ose shërbimin që dëshironi..."
                  value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  className="cyber-input w-full px-4 py-3 text-sm resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={sending}
                className="cyber-btn-filled w-full flex items-center justify-center gap-2 py-4 disabled:opacity-70"
                style={{ clipPath: 'none' }}
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#030712] border-t-transparent rounded-full animate-spin" />
                    Duke dërguar...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Dërgo Kërkesën
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 reveal pt-8 border-t border-[rgba(0,229,255,0.1)]">
          <div className="font-exo text-slate-500 text-sm">
            Ndiqni Servis Kristi në rrjetet sociale
          </div>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 border border-[rgba(0,229,255,0.3)] flex items-center justify-center text-slate-400 hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
