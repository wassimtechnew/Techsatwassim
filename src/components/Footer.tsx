import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  language: 'ar' | 'fr';
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="https://i.postimg.cc/NF779kPx/image.png" 
                alt="TechnSat chez Wassim" 
                className="h-10 w-10 mr-3"
              />
              <h3 className="text-xl font-bold">TechnSat chez Wassim</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for IPTV services and Android TV boxes. 
              Quality entertainment solutions at affordable prices.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span>+216 55 338 664</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span>contact@technsat.tn</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span>Tunisia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  IPTV Services
                </a>
              </li>
              <li>
                <a href="#android-boxes" className="text-gray-400 hover:text-white transition-colors">
                  Android Boxes
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/21655338664`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 TechnSat chez Wassim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}