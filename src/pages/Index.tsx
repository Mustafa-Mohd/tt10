import React, { useRef, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
// import SearchFilter from '@/components/SearchFilter';
import ListingSections from '@/components/ListingSections';


import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import AboutSection from '@/components/AboutSection';
import HowWeWorkSection from '@/components/HowWeWorkSection';
import ContactSection from '@/components/ContactFormModal';
import TermsSection from '@/components/TermsSection';
import CancelSection from '@/components/CancelSection';
import Contact from '@/pages/Contact';

const Index = () => {
  // Refs for sections
  const termsRef = useRef(null);
  const cancelRef = useRef(null);

  // State for visibility (simple: always true, or use scroll logic for animation)
  const [termsVisible, setTermsVisible] = useState(true);
  const [cancelVisible, setCancelVisible] = useState(true);

  // Accordion state for TermsSection
  const [openAccordion, setOpenAccordion] = useState(null);

  // Optionally, add scroll/viewport logic for animation
  // useEffect(() => { ... }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Search & Filter Bar */}
        {/* <SearchFilter /> */}
        
        {/* Listing Sections */}
        {/* <ListingSections /> */}
        {/* About section */}
        <AboutSection/>
        {/* How we work section */}
        <HowWeWorkSection/>
        {/* Terms & Conditions Section */}
        <TermsSection
          ref={termsRef}
          id="terms"
          isVisible={termsVisible}
          openAccordion={openAccordion}
          setOpenAccordion={setOpenAccordion}
        />

        {/* Cancel Section */}
        <CancelSection
          ref={cancelRef}
          id="cancel"
          isVisible={cancelVisible}
        />

        {/* Contact Section */}
        <Contact />

       
        
       
        
        
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
