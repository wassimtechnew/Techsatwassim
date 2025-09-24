import React, { useState } from 'react';
import { Monitor, Cpu, Wifi, Play, ShoppingCart, Check, Star, Zap } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';

interface AndroidBoxesProps {
  language: 'ar' | 'fr';
}

export default function AndroidBoxes({ language }: AndroidBoxesProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const content = {
    fr: {
      title: 'Android TV Boxes Premium',
      subtitle: 'Transformez votre télévision en Smart TV avec nos Android Boxes haute performance',
      buyNow: 'Acheter maintenant',
      features: 'Caractéristiques',
      specifications: 'Spécifications',
      whatsapp: 'Contacter sur WhatsApp',
      processing: 'Traitement...',
      boxes: [
        {
          id: 'android-box-basic',
          name: 'Android TV Box Basic',
          price: '150 TND',
          originalPrice: '200 TND',
          image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Android 11.0',
            'Streaming HD 1080p',
            '2GB RAM + 16GB Storage',
            'WiFi intégré',
            'Support IPTV',
            'Télécommande incluse'
          ],
          specs: [
            'Processeur: Quad-core ARM Cortex-A53',
            'GPU: Mali-450 MP3',
            'Connectivité: WiFi 2.4GHz, Ethernet',
            'Ports: 2x USB 2.0, HDMI, AV'
          ],
          badge: 'Populaire',
          badgeColor: 'bg-blue-500'
        },
        {
          id: 'android-box-pro',
          name: 'Android TV Box Pro',
          price: '250 TND',
          originalPrice: '320 TND',
          image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Android 12.0',
            'Streaming 4K Ultra HD',
            '4GB RAM + 32GB Storage',
            'WiFi 5GHz + Bluetooth',
            'Support IPTV Premium',
            'Télécommande vocale'
          ],
          specs: [
            'Processeur: Hexa-core ARM Cortex-A55',
            'GPU: Mali-G31 MP2',
            'Connectivité: WiFi 5GHz, Bluetooth 5.0',
            'Ports: 3x USB 3.0, HDMI 2.1, Ethernet'
          ],
          badge: 'Recommandé',
          badgeColor: 'bg-green-500'
        },
        {
          id: 'android-box-ultra',
          name: 'Android TV Box Ultra',
          price: '350 TND',
          originalPrice: '450 TND',
          image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Android 13.0',
            'Streaming 8K + HDR',
            '8GB RAM + 64GB Storage',
            'WiFi 6 + Bluetooth 5.2',
            'Support IPTV Ultra',
            'Télécommande premium'
          ],
          specs: [
            'Processeur: Octa-core ARM Cortex-A78',
            'GPU: Mali-G78 MP12',
            'Connectivité: WiFi 6, Bluetooth 5.2',
            'Ports: 4x USB 3.1, HDMI 2.1, Ethernet Gigabit'
          ],
          badge: 'Premium',
          badgeColor: 'bg-purple-500'
        }
      ]
    },
    ar: {
      title: 'صناديق Android TV المتميزة',
      subtitle: 'حول تلفزيونك إلى Smart TV مع صناديق الأندرويد عالية الأداء',
      buyNow: 'اشتري الآن',
      features: 'المميزات',
      specifications: 'المواصفات',
      whatsapp: 'تواصل عبر واتساب',
      processing: 'جاري المعالجة...',
      boxes: [
        {
          id: 'android-box-basic',
          name: 'Android TV Box Basic',
          price: '150 دينار',
          originalPrice: '200 دينار',
          image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Android 11.0',
            'بث HD 1080p',
            '2GB RAM + 16GB تخزين',
            'WiFi مدمج',
            'دعم IPTV',
            'ريموت كنترول مرفق'
          ],
          specs: [
            'المعالج: Quad-core ARM Cortex-A53',
            'كرت الرسوميات: Mali-450 MP3',
            'الاتصال: WiFi 2.4GHz, Ethernet',
            'المنافذ: 2x USB 2.0, HDMI, AV'
          ],
          badge: 'شائع',
          badgeColor: 'bg-blue-500'
        },
        {
          id: 'android-box-pro',
          name: 'Android TV Box Pro',
          price: '250 دينار',
          originalPrice: '320 دينار',
          image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Android 12.0',
            'بث 4K Ultra HD',
            '4GB RAM + 32GB تخزين',
            'WiFi 5GHz + Bluetooth',
            'دعم IPTV Premium',
            'ريموت كنترول صوتي'
          ],
          specs: [
            'المعالج: Hexa-core ARM Cortex-A55',
            'كرت الرسوميات: Mali-G31 MP2',
            'الاتصال: WiFi 5GHz, Bluetooth 5.0',
            'المنافذ: 3x USB 3.0, HDMI 2.1, Ethernet'
          ],
          badge: 'موصى به',
          badgeColor: 'bg-green-500'
        },
        {
          id: 'android-box-ultra',
          name: 'Android TV Box Ultra',
          price: '350 دينار',
          originalPrice: '450 دينار',
          image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: [
            'Android 13.0',
            'بث 8K + HDR',
            '8GB RAM + 64GB تخزين',
            'WiFi 6 + Bluetooth 5.2',
            'دعم IPTV Ultra',
            'ريموت كنترول متميز'
          ],
          specs: [
            'المعالج: Octa-core ARM Cortex-A78',
            'كرت الرسوميات: Mali-G78 MP12',
            'الاتصال: WiFi 6, Bluetooth 5.2',
            'المنافذ: 4x USB 3.1, HDMI 2.1, Ethernet Gigabit'
          ],
          badge: 'متميز',
          badgeColor: 'bg-purple-500'
        }
      ]
    }
  };

  const handlePurchase = async (boxId: string, boxName: string) => {
    try {
      setLoading(boxId);
      
      // Box pricing mapping
      const boxPricing = {
        'android-box-basic': { price: 150, name: 'Android TV Box Basic' },
        'android-box-pro': { price: 250, name: 'Android TV Box Pro' },
        'android-box-ultra': { price: 350, name: 'Android TV Box Ultra' }
      };

      const selectedBox = boxPricing[boxId as keyof typeof boxPricing];
      
      if (!selectedBox) {
        throw new Error('Product not found');
      }

      // Use the createCheckoutSession function
      await createCheckoutSession(boxId, selectedBox.name);
      
    } catch (error) {
      console.error('Error initiating purchase:', error);
      
      // Show user-friendly error message
      alert(`Payment error: ${error.message || 'Payment system temporarily unavailable'}. Redirecting to WhatsApp for assistance.`);
      
      // Fallback to WhatsApp
      const message = encodeURIComponent(`Hello! I want to purchase ${boxName}. The online payment system had an issue. Can you help me complete the purchase?`);
      window.open(`https://wa.me/21655338664?text=${message}`, '_blank');
    } finally {
      setLoading(null);
    }
  };

  const handleWhatsAppContact = (boxName: string) => {
    const message = encodeURIComponent(`Hello! I'm interested in ${boxName}. Can you provide more information?`);
    window.open(`https://wa.me/21655338664?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {content[language].title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Android Boxes Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {content[language].boxes.map((box, index) => (
            <div key={box.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
              {/* Badge */}
              <div className={`absolute top-4 right-4 ${box.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold z-10`}>
                {box.badge}
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={box.image} 
                  alt={box.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-6">
                {/* Title and Price */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{box.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-red-600">{box.price}</span>
                    <span className="text-lg text-gray-400 line-through">{box.originalPrice}</span>
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                      {language === 'fr' ? 'PROMO' : 'عرض'}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    {content[language].features}
                  </h4>
                  <ul className="space-y-2">
                    {box.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Cpu className="h-4 w-4 mr-2 text-blue-500" />
                    {content[language].specifications}
                  </h4>
                  <ul className="space-y-1">
                    {box.specs.map((spec, idx) => (
                      <li key={idx} className="text-xs text-gray-500">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handlePurchase(box.id, box.name)}
                    disabled={loading === box.id}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading === box.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>{content[language].processing}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        <span>{content[language].buyNow}</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleWhatsAppContact(box.name)}
                    className="w-full border-2 border-green-500 text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-50 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Wifi className="h-4 w-4" />
                    <span>{content[language].whatsapp}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {language === 'fr' ? 'Pourquoi choisir nos Android Boxes ?' : 'لماذا تختار صناديق الأندرويد الخاصة بنا؟'}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'fr' ? 'Streaming Premium' : 'بث متميز'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'fr' 
                  ? 'Accès à tous vos contenus préférés en haute qualité'
                  : 'الوصول إلى جميع المحتويات المفضلة بجودة عالية'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'fr' ? 'Performance Rapide' : 'أداء سريع'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'fr' 
                  ? 'Processeurs puissants pour une expérience fluide'
                  : 'معالجات قوية لتجربة سلسة'
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'fr' ? 'Installation Facile' : 'تثبيت سهل'}
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'fr' 
                  ? 'Configuration simple et support technique inclus'
                  : 'إعداد بسيط ودعم فني مشمول'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}