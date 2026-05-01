import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CareerMilestones from '@/components/CareerMilestones'
import AboutSection from '@/components/AboutSection'
import TechnicalArsenal from '@/components/TechnicalArsenal'
import Education from '@/components/Education'
import CTASection from '@/components/CTASection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CareerMilestones />
      <AboutSection />
      <TechnicalArsenal />
      <Education />
      <CTASection />
      <ContactSection />
    </main>
  )
}