import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { services } from '../data/services';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الصحية والطبية لضمان راحتك وصحتك
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 right-4">
                  <div className="text-4xl">{service.icon}</div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  اعرف المزيد
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">خدمات إضافية</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📱',
                title: 'تطبيق الهاتف المحمول',
                description: 'اطلب منتجاتك بسهولة من خلال تطبيقنا المجاني'
              },
              {
                icon: '💳',
                title: 'الدفع الآمن',
                description: 'طرق دفع متعددة وآمنة لراحتك وأمانك'
              },
              {
                icon: '🔄',
                title: 'سياسة الإرجاع',
                description: 'إرجاع مجاني خلال 30 يوم من تاريخ الشراء'
              },
              {
                icon: '🎯',
                title: 'عروض حصرية',
                description: 'خصومات وعروض خاصة لعملائنا المميزين'
              },
              {
                icon: '📞',
                title: 'دعم فني 24/7',
                description: 'فريق دعم متاح على مدار الساعة لمساعدتك'
              },
              {
                icon: '🏥',
                title: 'شراكات طبية',
                description: 'تعاون مع أفضل المستشفيات والعيادات'
              }
            ].map((service, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-100 hover:border-green-200 transition-colors">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">هل تحتاج مساعدة؟</h2>
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
      </div>
    </div>
  );
};

export default ServicesPage;