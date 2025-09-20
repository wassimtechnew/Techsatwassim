import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const language = 'fr'; // Default to French
  const content = {
    fr: {
      title: 'Ce que disent nos clients',
      subtitle: 'Plus de 5000 clients satisfaits nous font confiance',
      testimonials: [
        {
          name: 'Ahmed Ben Ali',
          location: 'Tunis',
          text: 'Excellent service ! La qualité est parfaite et le support client est très réactif. Je recommande vivement TechnSat.',
          rating: 5
        },
        {
          name: 'Fatma Trabelsi',
          location: 'Sfax',
          text: 'Installation rapide et professionnelle. Tous les canaux fonctionnent parfaitement. Prix très compétitifs.',
          rating: 5
        },
        {
          name: 'Mohamed Gharbi',
          location: 'Sousse',
          text: 'Service après-vente exceptionnel. En cas de problème, Wassim répond immédiatement. Très satisfait !',
          rating: 5
        }
      ]
    },
    ar: {
      title: 'ما يقوله عملاؤنا',
      subtitle: 'أكثر من 5000 عميل راضٍ يثقون بنا',
      testimonials: [
        {
          name: 'أحمد بن علي',
          location: 'تونس',
          text: 'خدمة ممتازة! الجودة مثالية ودعم العملاء سريع الاستجابة. أنصح بشدة بـ TechnSat.',
          rating: 5
        },
        {
          name: 'فاطمة الطرابلسي',
          location: 'صفاقس',
          text: 'تثبيت سريع ومهني. جميع القنوات تعمل بشكل مثالي. أسعار تنافسية جداً.',
          rating: 5
        },
        {
          name: 'محمد الغربي',
          location: 'سوسة',
          text: 'خدمة ما بعد البيع استثنائية. في حالة وجود مشكلة، وسيم يرد فوراً. راضٍ جداً!',
          rating: 5
        }
      ]
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600">
            {content[language].subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {content[language].testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="h-8 w-8 text-red-400" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Testimonial text */}
              <p className={`text-gray-700 mb-6 leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className={`${language === 'ar' ? 'mr-4 text-right' : 'ml-4 text-left'}`}>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex justify-center items-center space-x-8 opacity-60">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.9/5 étoiles</span>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="text-sm text-gray-600">5000+ clients satisfaits</div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="text-sm text-gray-600">Support 24/7</div>
        </div>
      </div>
    </section>
  );
}