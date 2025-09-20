import { MessageCircle, CreditCard, Settings, Play } from 'lucide-react';

interface HowItWorksProps {
  language: 'ar' | 'fr';
}

export default function HowItWorks({ language }: HowItWorksProps) {
  const content = {
    fr: {
      title: 'Comment ça marche ?',
      subtitle: 'Commencez à profiter de nos services IPTV en 4 étapes simples',
      steps: [
        {
          icon: MessageCircle,
          title: 'Contact',
          description: 'Contactez-nous via WhatsApp ou téléphone pour choisir votre service IPTV préféré.'
        },
        {
          icon: CreditCard,
          title: 'Paiement',
          description: 'Effectuez le paiement sécurisé pour votre abonnement mensuel ou annuel.'
        },
        {
          icon: Settings,
          title: 'Installation',
          description: 'Notre équipe installe et configure votre service sur vos appareils.'
        },
        {
          icon: Play,
          title: 'Profitez',
          description: 'Regardez vos chaînes préférées en HD/4K avec notre support 24/7.'
        }
      ]
    },
    ar: {
      title: 'كيف يعمل الأمر؟',
      subtitle: 'ابدأ في الاستمتاع بخدمات IPTV في 4 خطوات بسيطة',
      steps: [
        {
          icon: MessageCircle,
          title: 'تواصل',
          description: 'تواصل معنا عبر واتساب أو الهاتف لاختيار خدمة IPTV المفضلة لديك.'
        },
        {
          icon: CreditCard,
          title: 'الدفع',
          description: 'قم بالدفع الآمن لاشتراكك الشهري أو السنوي.'
        },
        {
          icon: Settings,
          title: 'التثبيت',
          description: 'فريقنا يقوم بتثبيت وتكوين الخدمة على أجهزتك.'
        },
        {
          icon: Play,
          title: 'استمتع',
          description: 'شاهد قنواتك المفضلة بجودة HD/4K مع دعمنا 24/7.'
        }
      ]
    }
  };

  return (
    <section id="section-3" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content[language].steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < content[language].steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-red-300 to-blue-300 transform translate-x-4 z-0"></div>
                )}
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 relative z-10">
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="bg-gradient-to-r from-red-100 to-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-red-600" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            {language === 'fr' ? 'Commencer maintenant' : 'ابدأ الآن'}
          </button>
        </div>
      </div>
    </section>
  );
}