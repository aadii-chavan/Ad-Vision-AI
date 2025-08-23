import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
import Services from '@/components/Services';
import Solutions from '@/components/Solutions';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import CampaignShowcase from '@/components/CampaignShowcase';
import GeneratedImagesShowcase from '@/components/GeneratedImagesShowcase';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import Threads from '@/components/Threads';
import './Index.css';

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();
  const { scrollToSection } = useSmoothScroll();

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      // slight delay to ensure sections are mounted
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  }, [location.hash, scrollToSection]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="threads-wrapper">
        <div className="threads-background">
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        </div>
        <div className="threads-content">
          <Hero />
        </div>
      </div>
      <main>
        <TrustedBy />
        <CampaignShowcase />
        <GeneratedImagesShowcase />
        <Services />
        <Solutions />
        <Pricing />
        <Contact onContactClick={handleContactClick} />
      </main>
      <Footer />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseContactModal} 
      />
    </div>
  );
};

export default Index;