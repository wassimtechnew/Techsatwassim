import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Send } from 'lucide-react';

interface ContactProps {
  language: 'ar' | 'fr';
}

export default function Contact({ language }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const content = {
    fr: {
      title: 'Contactez-nous',
      subtitle: 'Prêt à commencer ? Contactez-nous dès maintenant pour votre abonnement IPTV',
      form: {
        name: 'Nom complet',
        phone: 'Téléphone',
        service: 'Service souhaité',
        message: 'Message (optionnel)',
        submit: 'Envoyer la demande'
      },
      contact: {
        phone: '+216 55 338 664',
        email: 'contact@technsat.tn',
        whatsapp: 'WhatsApp',
        location: 'Tunisie'
      }
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'مستعد للبدء؟ اتصل بنا الآن للحصول على اشتراك IPTV',
      form: {
        name: 'الاسم الكامل',
        phone: 'رقم الهاتف',
        service: 'الخدمة المطلوبة',
        message: 'الرسالة (اختياري)',
        submit: 'إرسال الطلب'
      },
      contact: {
        phone: '+216 55 338 664',
        email: 'contact@technsat.tn',
        whatsapp: 'واتساب',
        location: 'تونس'
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="section-4" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {language === 'fr' ? 'Nos coordonnées' : 'معلومات الاتصال'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{content[language].contact.whatsapp}</p>
                    <p className="text-gray-600">{content[language].contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{language === 'fr' ? 'Téléphone' : 'الهاتف'}</p>
                    <p className="text-gray-600">{content[language].contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">{content[language].contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{language === 'fr' ? 'Localisation' : 'الموقع'}</p>
                    <p className="text-gray-600">{content[language].contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>{language === 'fr' ? 'Appeler' : 'اتصل'}</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {language === 'fr' ? 'Demande de renseignements' : 'طلب معلومات'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.service}
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">{language === 'fr' ? 'Choisir un service...' : 'اختر خدمة...'}</option>
                  <option value="iptv">IPTV Premium</option>
                  <option value="android-box">Android Box</option>
                  <option value="streaming">Streaming Apps</option>
                  <option value="support">Support technique</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>{content[language].form.submit}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}