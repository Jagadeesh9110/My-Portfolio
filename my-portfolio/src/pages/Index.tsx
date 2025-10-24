import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero'
import About from '@/components/About';
import Contact from '@/components/Contact';
import AIChatbot from '@/components/AIChatbot';

const Index= () =>{
    return (
    <div className="min-h-screen bg-dark-navy">
      <Navigation />
      <Hero />
      <About />
      <Contact />
      <AIChatbot />
    </div>
  );
}

export default Index;