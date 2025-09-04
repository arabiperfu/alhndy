import React from 'react';
import { MapPin, Users, Award, Clock } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: MapPin,
      number: '1000+',
      label: 'فرع في المملكة',
      description: 'نخدمك في جميع أنحاء المملكة العربية السعودية',
      color: 'text-green-500'
    },
    {
      icon: Users,
      number: '10M+',
      label: 'عميل راضي',
      description: 'ملايين العملاء يثقون بخدماتنا المتميزة',
      color: 'text-blue-500'
    },
    {
      icon: Award,
      number: '30+',
      label: 'سنة من الخبرة',
      description: 'ثلاثة عقود من التميز في الخدمات الصحية',
      color: 'text-purple-500'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'خدمة العملاء',
      description: 'فريق دعم متاح على مدار الساعة لمساعدتك',
      color: 'text-orange-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">أرقام تتحدث عن نفسها</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            نفخر بثقة عملائنا وإنجازاتنا على مدى السنوات الماضية
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto group-hover:bg-opacity-20 transition-all duration-300">
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div className="absolute inset-0 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
              </div>
              
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{stat.label}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">انضم إلى عائلة النهدي</h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              كن جزءاً من أكبر مجتمع صحي في المملكة واستمتع بتجربة تسوق مميزة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                ابدأ التسوق الآن
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold">
                تعرف على المزيد
              </button>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;