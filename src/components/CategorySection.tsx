import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../data/categories';

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">تسوق حسب الفئة</h2>
          <p className="text-xl text-gray-600">اكتشف مجموعتنا الواسعة من المنتجات الصحية</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-green-200"
            >
              <div className="relative mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 mx-auto rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-1 -right-1 text-2xl">
                  {category.icon}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{category.productCount} منتج</p>
              
              <button className="text-green-600 text-sm font-medium flex items-center justify-center gap-1 mx-auto opacity-0 group-hover:opacity-100 transition-opacity">
                تسوق الآن
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
            عرض جميع الفئات
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;