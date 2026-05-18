import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '#sherbimet', label: 'Shërbimet' },
  { href: '#pse-ne', label: 'Pse Ne' },
  { href: '#procesi', label: 'Procesi' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#rreth', label: 'Rreth Nesh' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [inHero, setInHero] = useState(true)

  useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 50)

  // Listen for hero scroll progress event
  const onHeroProgress = (e: Event) => {
    const progress = (e as CustomEvent).detail as number
    // Once hero scroll animation is done (progress = 1), show nav bg
    setInHero(progress < 1)
  }

  window.addEventListener('scroll', onScroll)
  window.addEventListener('heroScrollProgress', onHeroProgress)
  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('heroScrollProgress', onHeroProgress)
  }
}, [])

  const handleNav = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled && !inHero
      ? 'bg-[rgba(3,7,18,0.95)] backdrop-blur-md border-b border-[rgba(0,229,255,0.1)] py-3'
      : 'bg-transparent py-5'
  }`}
>
      <div className="flex items-center justify-between max-w-6xl px-6 mx-auto">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <img src="/logo.PNG" alt="Servis Kristi" className="object-contain w-10 h-10"  />
           
          </div>
          
        </button>

        {/* Desktop Nav */}
        <div className="items-center hidden gap-8 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="font-exo text-sm text-slate-400 hover:text-[var(--neon-cyan)] transition-colors duration-300 tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--neon-cyan)] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_var(--neon-cyan)]" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="items-center hidden gap-4 lg:flex">
          <a
            href="tel:0677161524"
            className="flex items-center gap-2 text-[var(--neon-cyan)] font-orbitron text-xs tracking-wider hover:text-white transition-colors duration-300"
          >
            <Phone size={14} />
            067 716 1524
          </a>
          <button
            onClick={() => handleNav('#kontakt')}
            className="text-xs cyber-btn-filled"
          >
            Rezervo Tani
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[var(--neon-cyan)] p-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[rgba(3,7,18,0.98)] backdrop-blur-md border-b border-[rgba(0,229,255,0.15)] transition-all duration-300 overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="font-exo text-slate-300 hover:text-[var(--neon-cyan)] transition-colors duration-300 text-left text-base py-2 border-b border-[rgba(0,229,255,0.08)]"
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:0677161524"
            className="flex items-center gap-2 text-[var(--neon-cyan)] font-orbitron text-sm tracking-wider mt-2"
          >
            <Phone size={16} />
            067 716 1524
          </a>
          <button
            onClick={() => handleNav('#kontakt')}
            className="mt-2 text-sm text-center cyber-btn-filled"
          >
            Rezervo Tani
          </button>
        </div>
      </div>
    </nav>
  )
}
