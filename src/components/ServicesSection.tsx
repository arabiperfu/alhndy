import React from 'react';
import { Truck, UserCheck, Gift, Stethoscope, ArrowLeft } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: 'التوصيل السريع',
      description: 'توصيل مجاني خلال ساعتين لجميع الطلبات أكثر من 100 ريال',
      features: ['توصيل خلال ساعتين', 'تتبع الطلب مباشرة', 'توصيل آمن ومضمون'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: UserCheck,
      title: 'استشارة صيدلي',
      description: 'استشارة مجانية مع صيادلة مرخصين ومختصين على مدار الساعة',
      features: ['استشارة مجانية', 'صيادلة مرخصون', 'متاح 24/7'],
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Gift,
      title: 'برنامج الولاء',
      description: 'اكسب نقاط مع كل عملية شراء واستبدلها بخصومات وهدايا',
      features: ['نقاط مع كل شراء', 'خصومات حصرية', 'هدايا مجانية'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Stethoscope,
      title: 'الفحوصات الطبية',
      description: 'فحوصات طبية شاملة في جميع فروعنا مع نتائج فورية',
      features: ['فحص السكري', 'قياس الضغط', 'فحص الكوليسترول'],
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">خدماتنا المميزة</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الصحية والطبية لضمان راحتك وصحتك
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-green-200"
            >
              <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="text-green-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                اعرف المزيد
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">هل تحتاج مساعدة؟</h3>
          <p className="text-xl mb-8 opacity-90">
            فريقنا المختص جاهز لمساعدتك في أي وقت
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              تواصل معنا
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              تواصل معنا
            </button>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: '📱', title: 'تطبيق الهاتف', desc: 'اطلب بسهولة' },
            { icon: '💳', title: 'الدفع الآمن', desc: 'طرق دفع متعددة' },
            { icon: '🔄', title: 'سياسة الإرجاع', desc: 'إرجاع خلال 30 يوم' },
            { icon: '🎯', title: 'عروض حصرية', desc: 'خصومات مميزة' },
            { icon: '📞', title: 'دعم فني', desc: 'متاح 24/7' },
            { icon: '🏥', title: 'شراكات طبية', desc: 'مع أفضل المستشفيات' }
          ].map((item, index) => (
            <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h4>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;