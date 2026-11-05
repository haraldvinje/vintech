import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import Hero from '@/components/sections/hero'
import Services from '@/components/sections/services'

export default function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col">
      <Hero />
      <About />
      <Services />
      <Contact />
    </div>
  )
}
