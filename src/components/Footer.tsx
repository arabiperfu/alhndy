import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-green-500 text-white p-2 rounded-lg ml-3">
                <div className="w-8 h-8 flex items-center justify-center font-bold text-xl">ن</div>
              </div>
              <div>
                <h3 className="text-xl font-bold">صيدلية النهدي</h3>
                <p className="text-sm text-gray-400">صحتك أولويتنا</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              أكبر سلسلة صيدليات في المملكة العربية السعودية، نخدمك منذ أكثر من 30 عاماً
              بأعلى معايير الجودة والمهنية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                'الرئيسية',
                'المنتجات',
                'الخدمات',
                'الفروع',
                'من نحن',
                'اتصل بنا',
                'الأسئلة الشائعة',
                'سياسة الخصوصية'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">خدماتنا</h4>
            <ul className="space-y-3">
              {[
                'التوصيل السريع',
                'استشارة صيدلي',
                'الفحوصات الطبية',
                'برنامج الولاء',
                'الأدوية المزمنة',
                'منتجات الأطفال',
                'العناية بالبشرة',
                'المكملات الغذائية'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">
                    المملكة العربية السعودية
                    <br />
                    أكثر من 1000 فرع في جميع المناطق
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-white font-medium">خدمة العملاء</p>
                  <p className="text-gray-400 text-sm">متاح 24/7</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-white">info@nahdi.sa</p>
                  <p className="text-gray-400 text-sm">للاستفسارات والشكاوى</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-semibold mb-3">اشترك في النشرة الإخبارية</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  اشترك
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 صيدلية النهدي. جميع الحقوق محفوظة.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                الشروط والأحكام
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                سياسة الإرجاع
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                خريطة الموقع
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;