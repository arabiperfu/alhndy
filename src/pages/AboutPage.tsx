import React from 'react';
import { Award, Users, MapPin, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">من نحن</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن أكبر سلسلة صيدليات في المملكة العربية السعودية، نخدم المجتمع منذ أكثر من 30 عاماً
            بأعلى معايير الجودة والمهنية
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                بدأت رحلتنا في عام 1986 برؤية واضحة: تقديم أفضل الخدمات الصحية والدوائية
                للمجتمع السعودي. من صيدلية واحدة صغيرة إلى أكثر من 1000 فرع في جميع أنحاء المملكة.
              </p>
              <p>
                نؤمن بأن الصحة حق للجميع، ولذلك نعمل بلا كلل لتوفير أجود المنتجات الطبية
                والصحية بأسعار مناسبة وخدمة متميزة.
              </p>
              <p>
                اليوم، نفخر بكوننا الخيار الأول لملايين العملاء في المملكة، ونواصل الابتكار
                والتطوير لنبقى في المقدمة دائماً.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="صيدلية النهدي"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: MapPin, number: '1000+', label: 'فرع في المملكة', color: 'text-green-500' },
            { icon: Users, number: '10M+', label: 'عميل راضي', color: 'text-blue-500' },
            { icon: Award, number: '30+', label: 'سنة من الخبرة', color: 'text-purple-500' },
            { icon: Clock, number: '24/7', label: 'خدمة العملاء', color: 'text-orange-500' }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-sm">
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="text-4xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h3>
            <p className="text-gray-600 leading-relaxed">
              تقديم أفضل الخدمات الصحية والدوائية للمجتمع السعودي من خلال شبكة واسعة من الفروع
              المتخصصة، مع الالتزام بأعلى معايير الجودة والمهنية والابتكار المستمر.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="text-4xl mb-6">👁️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h3>
            <p className="text-gray-600 leading-relaxed">
              أن نكون الرائد الأول في مجال الصيدليات والخدمات الصحية في المنطقة، ونساهم في
              بناء مجتمع صحي ومعافى من خلال الابتكار والتميز في الخدمة.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">قيمنا</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤝',
                title: 'الثقة',
                description: 'نبني علاقات طويلة الأمد مع عملائنا قائمة على الثقة والشفافية'
              },
              {
                icon: '⭐',
                title: 'الجودة',
                description: 'نلتزم بأعلى معايير الجودة في جميع منتجاتنا وخدماتنا'
              },
              {
                icon: '💡',
                title: 'الابتكار',
                description: 'نواكب أحدث التطورات التقنية لتحسين تجربة العملاء'
              },
              {
                icon: '❤️',
                title: 'الرعاية',
                description: 'نهتم بصحة ورفاهية عملائنا كأولوية قصوى'
              },
              {
                icon: '🎯',
                title: 'التميز',
                description: 'نسعى للتميز في كل ما نقوم به لتحقيق رضا العملاء'
              },
              {
                icon: '🌟',
                title: 'المسؤولية',
                description: 'نتحمل مسؤوليتنا تجاه المجتمع والبيئة'
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">فريقنا</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'د. أحمد النهدي',
                position: 'الرئيس التنفيذي',
                image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300'
              },
              {
                name: 'د. فاطمة العلي',
                position: 'مديرة العمليات',
                image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300'
              },
              {
                name: 'د. محمد السعيد',
                position: 'مدير الجودة',
                image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">انضم إلى عائلتنا</h2>
          <p className="text-xl mb-8 opacity-90">
            اكتشف الفرق معنا واستمتع بتجربة تسوق صحية مميزة
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            ابدأ التسوق الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;