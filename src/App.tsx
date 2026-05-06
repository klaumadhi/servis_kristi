import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
