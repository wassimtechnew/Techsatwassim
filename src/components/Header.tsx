import React from 'react';
import { Menu, X, Globe, Settings } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface HeaderProps {
  language: 'ar' | 'fr';
  setLanguage: (lang: 'ar' | 'fr') => void;
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { setShowLogin, isAuthenticated, logout } = useAdmin();

  const content = {
    fr: {
      nav: ['Accueil', 'Services', 'À propos', 'Comment ça marche', 'Contact'],
      cta: 'Demander un abonnement',
      admin: 'Admin',
      logout: 'Déconnexion'
    },
    ar: {
      nav: ['الرئيسية', 'الخدمات', 'من نحن', 'كيف يعمل', 'اتصل بنا'],
      cta: 'طلب اشتراك',
      admin: 'المدير',
      logout: 'تسجيل خروج'
    }
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      // If already authenticated, this will show the dashboard
      return;
    } else {
      setShowLogin(true);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="https://i.postimg.cc/NF779kPx/image.png" 
              alt="TechnSat Logo" 
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div className="text-xl font-bold text-gray-900">
              TechnSat <span className="text-red-600">chez Wassim</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {content[language].nav.map((item, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Language Toggle, Admin & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'fr' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'ar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                AR
              </button>
            </div>

            {/* Admin Button */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                <Settings className="h-4 w-4" />
                <span>{content[language].logout}</span>
              </button>
            ) : (
              <button
                onClick={handleAdminClick}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                <Settings className="h-4 w-4" />
                <span>{content[language].admin}</span>
              </button>
            )}

            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl">
              {content[language].cta}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-600" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-3">
              {content[language].nav.map((item, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="block text-gray-700 hover:text-red-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      language === 'fr' ? 'bg-red-100 text-red-800' : 'text-gray-500'
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      language === 'ar' ? 'bg-red-100 text-red-800' : 'text-gray-500'
                    }`}
                  >
                    العربية
                  </button>
                </div>
                
                {/* Mobile Admin Button */}
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-sm"
                  >
                    <Settings className="h-4 w-4" />
                    <span>{content[language].logout}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleAdminClick}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-sm"
                  >
                    <Settings className="h-4 w-4" />
                    <span>{content[language].admin}</span>
                  </button>
                )}
              </div>
              <button className="w-full mt-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg font-medium">
                {content[language].cta}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}