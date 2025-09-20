import { Play, Shield, Clock, Star } from 'lucide-react';

interface HeroProps {
  language: 'ar' | 'fr';
}

export default function Hero({ language }: HeroProps) {
  const content = {
    fr: {
      title: 'Votre portail IPTV en Tunisie',
      subtitle: 'Services IPTV et streaming premium avec support technique rapide et prix compétitifs',
      cta1: 'Voir les services',
      cta2: 'Contacter maintenant',
      features: [
        { icon: Shield, text: 'Garantie qualité' },
        { icon: Clock, text: 'Support 24/7' },
        { icon: Star, text: 'Meilleurs prix' }
      ]
    },
    ar: {
      title: 'بوابتكم للـ IPTV في تونس',
      subtitle: 'خدمات IPTV والبث المباشر المتميزة مع دعم فني سريع وأسعار تنافسية',
      cta1: 'عرض الخدمات',
      cta2: 'اتصل الآن',
      features: [
        { icon: Shield, text: 'ضمان الجودة' },
        { icon: Clock, text: 'دعم 24/7' },
        { icon: Star, text: 'أفضل الأسعار' }
      ]
    }
  };

  return (
    <section id="section-0" className="relative pt-16 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="w-full h-full bg-gradient-to-l from-red-600 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="mb-6">
              <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Play className="h-4 w-4 mr-2" />
                TechnSat chez Wassim
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {content[language].title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {content[language].subtitle}
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              {content[language].features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg">
                    <Icon className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {content[language].cta1}
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-red-600 hover:text-red-600 transition-all duration-200">
                {content[language].cta2}
              </button>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* TV/Screen mockup */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
                <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20"></div>
                  <div className="relative z-10 text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 text-white/80" />
                    <p className="text-lg font-semibold">IPTV Premium</p>
                    <p className="text-sm text-white/80">HD • 4K • Sport • Movies</p>
                  </div>
                </div>
                
                {/* Control buttons */}
                <div className="flex justify-center mt-6 space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                  <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                Live
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white shadow-lg px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold text-gray-900">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}