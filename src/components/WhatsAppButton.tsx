import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  language: 'ar' | 'fr';
}

export default function WhatsAppButton({ language }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    fr: {
      tooltip: 'Contactez-nous sur WhatsApp',
      message: 'Bonjour! Je suis intéressé par vos services IPTV.',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer sur WhatsApp'
    },
    ar: {
      tooltip: 'تواصل معنا عبر واتساب',
      message: 'مرحباً! أنا مهتم بخدمات IPTV الخاصة بكم.',
      placeholder: 'اكتب رسالتك...',
      send: 'إرسال عبر واتساب'
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '21655338664';
    const message = encodeURIComponent(content[language].message);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-110"
          title={content[language].tooltip}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 text-white p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">TechnSat chez Wassim</h3>
                <p className="text-sm text-green-100">
                  {language === 'fr' ? 'En ligne maintenant' : 'متصل الآن'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-800">
                {language === 'fr' 
                  ? 'Bonjour! Comment puis-je vous aider avec nos services IPTV?'
                  : 'مرحباً! كيف يمكنني مساعدتك بخدمات IPTV؟'
                }
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-100">
            <div className="space-y-2">
              <button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                {content[language].send}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleWhatsAppClick}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-xs transition-colors duration-200"
                >
                  {language === 'fr' ? 'Prix IPTV' : 'أسعار IPTV'}
                </button>
                <button 
                  onClick={handleWhatsAppClick}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-xs transition-colors duration-200"
                >
                  {language === 'fr' ? 'Installation' : 'التثبيت'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}