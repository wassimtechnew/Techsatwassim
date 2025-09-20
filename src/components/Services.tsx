import { useEffect } from 'react';
import { Tv, Smartphone, Monitor, Download, Loader2, RefreshCw, ShoppingCart } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface ServicesProps {
  language: 'ar' | 'fr';
}

export default function Services({ language }: ServicesProps) {
  const { iptvOffers, androidBoxes, loading, refreshData } = useAdmin();

  useEffect(() => {
    refreshData();
  }, []);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const content = {
    fr: {
      title: 'Nos Services IPTV Premium',
      subtitle: 'Découvrez notre gamme complète de services IPTV et Android Boxes',
      iptvTitle: 'Applications IPTV',
      androidTitle: 'Android Boxes',
      cta: 'S\'abonner maintenant',
      download: 'Télécharger',
      buyNow: 'Acheter maintenant',
      loading: 'Chargement des services...',
      refresh: 'Actualiser',
      lastUpdated: 'Dernière mise à jour',
      whatsappContact: 'Contacter sur WhatsApp'
    },
    ar: {
      title: 'خدمات IPTV المتميزة',
      subtitle: 'اكتشف مجموعتنا الكاملة من خدمات IPTV وصناديق الأندرويد',
      iptvTitle: 'تطبيقات IPTV',
      androidTitle: 'صناديق الأندرويد',
      cta: 'اشترك الآن',
      download: 'تحميل',
      buyNow: 'اشتري الآن',
      loading: 'جاري تحميل الخدمات...',
      refresh: 'تحديث',
      lastUpdated: 'آخر تحديث',
      whatsappContact: 'تواصل عبر واتساب'
    }
  };

  const handleDownload = (offer: any) => {
    if (offer.download_url) {
      window.open(offer.download_url, '_blank');
    } else {
      // Contact via WhatsApp
      const message = encodeURIComponent(`Hello! I would like to download ${offer.name}. Please provide the download link.`);
      window.open(`https://wa.me/21655338664?text=${message}`, '_blank');
    }
  };

  const handlePurchase = (box: any) => {
    if (box.purchase_url) {
      window.open(box.purchase_url, '_blank');
    } else {
      // Contact via WhatsApp
      const message = encodeURIComponent(`Hello! I'm interested in purchasing ${box.name}. Price: ${box.price}. Please provide more details.`);
      window.open(`https://wa.me/21655338664?text=${message}`, '_blank');
    }
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Hello! I\'m interested in your IPTV services. Can you help me?');
    window.open(`https://wa.me/21655338664?text=${message}`, '_blank');
  };

  const handleRefresh = () => {
    refreshData();
  };

  if (loading) {
    return (
      <section id="section-1" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto mb-4" />
              <p className="text-gray-600">{content[language].loading}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-1" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {content[language].title}
            </h2>
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              title={content[language].refresh}
            >
              <RefreshCw className="h-5 w-5" />
              <span className="text-sm">{content[language].refresh}</span>
            </button>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {content[language].subtitle}
          </p>
          
          {/* WhatsApp Contact Button */}
          <button
            onClick={handleWhatsAppContact}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto mb-8"
          >
            <Smartphone className="h-5 w-5" />
            <span>{content[language].whatsappContact}</span>
          </button>
        </div>

        {/* IPTV Services Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Tv className="h-6 w-6 mr-2 text-red-600" />
            {content[language].iptvTitle}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {iptvOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-red-200 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 flex-1">
                    <img 
                      src={offer.image_url} 
                      alt={offer.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors">
                        {offer.name}
                      </h4>
                      {offer.price && (
                        <p className="text-red-600 font-bold text-sm">{offer.price}</p>
                      )}
                      {offer.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{offer.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(offer)}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm">{content[language].download}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Android Boxes Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Monitor className="h-6 w-6 mr-2 text-blue-600" />
            {content[language].androidTitle}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {androidBoxes.filter(box => box.is_available).map((box) => (
              <div key={box.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-blue-200">
                <img 
                  src={box.image_url} 
                  alt={box.name}
                  className="w-full h-48 rounded-lg object-cover mb-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <h4 className="font-semibold text-gray-900 text-lg mb-2">{box.name}</h4>
                <p className="text-blue-600 font-bold text-xl mb-2">{box.price}</p>
                {box.description && (
                  <p className="text-gray-600 text-sm mb-3">{box.description}</p>
                )}
                {box.specifications && (
                  <p className="text-gray-500 text-xs mb-4">{box.specifications}</p>
                )}
                <button
                  onClick={() => handlePurchase(box)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{content[language].buyNow}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Update Indicator */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live updates - {content[language].lastUpdated}: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button 
            onClick={handleWhatsAppContact}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {content[language].cta}
          </button>
        </div>
      </div>
    </section>
  );
}