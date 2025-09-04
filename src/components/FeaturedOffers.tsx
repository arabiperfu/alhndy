import React from 'react';
import { Clock, Tag } from 'lucide-react';

const FeaturedOffers: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: 'خصم 30% على الفيتامينات',
      description: 'خصم كبير على جميع المكملات الغذائية والفيتامينات',
      discount: '30%',
      validUntil: '31 ديسمبر 2024',
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=600',
      bgColor: 'from-orange-400 to-orange-500'
    },
    {
      id: 2,
      title: 'عرض 2+1 على منتجات العناية',
      description: 'اشتري قطعتين واحصل على الثالثة مجاناً',
      discount: '2+1',
      validUntil: '25 ديسمبر 2024',
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600',
      bgColor: 'from-purple-400 to-purple-500'
    },
    {
      id: 3,
      title: 'توصيل مجاني',
      description: 'توصيل مجاني لجميع الطلبات بدون حد أدنى',
      discount: 'مجاني',
      validUntil: 'لفترة محدودة',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600',
      bgColor: 'from-green-400 to-green-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">العروض المميزة</h2>
          <p className="text-xl text-gray-600">لا تفوت هذه العروض الحصرية</p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Background Image */}
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${offer.bgColor} opacity-80`}></div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full font-bold text-lg shadow-lg">
                  {offer.discount}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{offer.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>ساري حتى {offer.validUntil}</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">عرض محدود</span>
                  </div>
                </div>

                <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                  استفد من العرض
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">اشترك في النشرة الإخبارية</h3>
          <p className="text-lg mb-6 opacity-90">احصل على أحدث العروض والخصومات مباشرة في بريدك الإلكتروني</p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              اشترك
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;