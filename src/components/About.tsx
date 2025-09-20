import { Award, Users, Headphones, Zap } from 'lucide-react';

interface AboutProps {
  language: 'ar' | 'fr';
}

export default function About({ language }: AboutProps) {
  const content = {
    fr: {
      title: 'À propos de TechnSat chez Wassim',
      description: 'Expert en solutions IPTV en Tunisie, nous offrons des services de streaming premium avec un support technique exceptionnel. Notre mission est de vous fournir la meilleure expérience de divertissement numérique.',
      stats: [
        { icon: Users, value: '5000+', label: 'Clients satisfaits' },
        { icon: Award, value: '5+', label: 'Années d\'expérience' },
        { icon: Headphones, value: '24/7', label: 'Support client' },
        { icon: Zap, value: '99%', label: 'Temps de fonctionnement' }
      ]
    },
    ar: {
      title: 'حول TechnSat chez Wassim',
      description: 'خبراء في حلول IPTV في تونس، نقدم خدمات البث المتميزة مع دعم فني استثنائي. مهمتنا هي تزويدكم بأفضل تجربة ترفيه رقمي.',
      stats: [
        { icon: Users, value: '5000+', label: 'عميل راضٍ' },
        { icon: Award, value: '5+', label: 'سنوات خبرة' },
        { icon: Headphones, value: '24/7', label: 'دعم العملاء' },
        { icon: Zap, value: '99%', label: 'وقت التشغيل' }
      ]
    }
  };

  return (
    <section id="section-2" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={language === 'ar' ? 'text-right' : 'text-left'}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {content[language].title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {content[language].description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {content[language].stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-r from-red-500 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-gray-400"></div>
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Service actif</p>
                      <p className="text-sm text-gray-600">Streaming HD/4K</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Headphones className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Support disponible</p>
                      <p className="text-sm text-gray-600">Réponse rapide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}