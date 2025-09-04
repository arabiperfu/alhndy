import React from 'react';
import { ArrowLeft, Truck, Clock, Shield } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-green-500 to-green-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              صحتك
              <span className="block text-green-200">أولويتنا</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              أكبر سلسلة صيدليات في المملكة العربية السعودية
              <br />
              نخدمك في أكثر من 1000 فرع
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                تسوق الآن
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                اعرف المزيد
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: 'توصيل مجاني', desc: 'للطلبات أكثر من 100 ريال' },
                { icon: Clock, title: 'خدمة 24/7', desc: 'نخدمك على مدار الساعة' },
                { icon: Shield, title: 'منتجات أصلية', desc: 'مضمونة 100%' }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm opacity-75">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="صيدلي محترف"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💊</span>
                </div>
                <div>
                  <p className="font-semibold">50,000+</p>
                  <p className="text-sm text-gray-600">منتج متاح</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <p className="font-semibold">استشارة مجانية</p>
                  <p className="text-sm text-gray-600">مع صيادلة مختصين</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
    </section>
  );
};

export default HeroSection;