import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, MessageCircle } from 'lucide-react'

// 🔑 REPLACE THESE WITH YOUR REAL VALUES FROM EMAILJS
const EMAILJS_SERVICE_ID = 'service_jeupy7d'
const EMAILJS_TEMPLATE_ID = 'template_v7c7c55'
const EMAILJS_PUBLIC_KEY = 'X2HHKnDKK3lUnIe3W'

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
    value: 'kristi06042000@icloud.com',
    href: 'mailto:kristi06042000@icloud.com',
  },
  {
    icon: Clock,
    label: 'Orari i punës',
    value: 'E Hënë – E Shtunë: 08:00 – 18:00',
    href: null,
  },
]

const socials = [
  { icon: Facebook, href: 'https://www.tiktok.com/@kristi.servis', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/kristi.servis/', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.me/355677161524', label: 'WhatsApp' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', phone: '', car: '', problem: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

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

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    setError(false)

    // Basic validation
    if (!form.name.trim() || !form.phone.trim()) {
      setError(true)
      return
    }

    setSending(true)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          phone: form.phone,
          car: form.car || 'E paspecifikuar',
          message: form.problem || 'E paspecifikuar',
          to_email: 'kristi06042000@icloud.com',
        },
        EMAILJS_PUBLIC_KEY
      )

      setSent(true)
      setForm({ name: '', phone: '', car: '', problem: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="kontakt" ref={sectionRef} className="relative py-24 overflow-hidden" style={{ background: '#030712' }}>
      <div className="absolute inset-0 bg-grid" />

      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--neon-cyan)] rounded-full blur-[180px] opacity-[0.03]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--neon-green)] rounded-full blur-[180px] opacity-[0.03]" />

      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="mb-4 section-label">Kontakt</div>
          <h2 className="text-4xl font-bold text-white font-orbitron md:text-5xl">
            Na <span className="neon-text">kontaktoni</span>
          </h2>
          <div className="w-24 mt-6 neon-divider" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              const content = (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-5 cyber-card reveal-left"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0 service-icon">
                    <Icon size={18} className="text-[var(--neon-cyan)]" />
                  </div>
                  <div>
                    <div className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-sm text-white font-exo">{item.value}</div>
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
                className="flex items-center justify-center w-full gap-2 py-3 mt-0 text-xs cyber-btn-filled"
                style={{ clipPath: 'none' }}
              >
                <MapPin size={14} />
                Hap në Google Maps
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="relative p-8 cyber-card reveal-right" style={{ transitionDelay: '200ms' }}>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-cyan)]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--neon-cyan)]" />

            <h3 className="mb-6 text-xl font-bold text-white font-orbitron">
              Dërgo një kërkesë
            </h3>

            {/* Success message */}
            {sent && (
              <div className="mb-4 p-4 border border-[var(--neon-green)] bg-[rgba(0,255,157,0.05)] text-[var(--neon-green)] font-orbitron text-sm text-center">
                ✓ Kërkesa u dërgua me sukses! Do t'ju kontaktojmë së shpejti.
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mb-4 p-4 border border-red-500 bg-[rgba(255,0,0,0.05)] text-red-400 font-orbitron text-sm text-center">
                ✗ {!form.name.trim() || !form.phone.trim()
                  ? 'Ju lutem plotësoni emrin dhe numrin e telefonit.'
                  : 'Ndodhi një gabim. Provoni përsëri ose na telefononi.'}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest block mb-2">
                    Emri juaj <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Emri Mbiemri"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm cyber-input"
                  />
                </div>
                <div>
                  <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest block mb-2">
                    Nr. i telefonit <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="06X XXX XXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm cyber-input"
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
                  className="w-full px-4 py-3 text-sm cyber-input"
                />
              </div>

              <div>
                <label className="font-orbitron text-[10px] text-slate-500 uppercase tracking-widest block mb-2">Problemi / Shërbimi i kërkuar</label>
                <textarea
                  rows={5}
                  placeholder="Përshkruani problemin ose shërbimin që dëshironi..."
                  value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  className="w-full px-4 py-3 text-sm resize-none cyber-input"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={sending}
                className="flex items-center justify-center w-full gap-2 py-4 cyber-btn-filled disabled:opacity-70"
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

              <p className="text-xs text-center font-exo text-slate-600">
                Ose na telefononi direkt:{' '}
                <a href="tel:0677161524" className="text-[var(--neon-cyan)] hover:underline">
                  067 716 1524
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 reveal pt-8 border-t border-[rgba(0,229,255,0.1)]">
          <div className="text-sm font-exo text-slate-500">
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