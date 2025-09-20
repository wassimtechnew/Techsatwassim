import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { AdminProvider, useAdmin } from './contexts/AdminContext';

function AppContent() {
  const [language, setLanguage] = useState<'ar' | 'fr'>('fr');
  const { isAuthenticated, showLogin } = useAdmin();

  if (showLogin) {
    return <AdminLogin />;
  }

  if (isAuthenticated) {
    return <AdminDashboard language={language} setLanguage={setLanguage} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <Services language={language} />
      <About language={language} />
      <HowItWorks language={language} />
      <Testimonials language={language} />
      <Contact language={language} />
      <Footer language={language} />
      <WhatsAppButton language={language} />
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}

export default App;