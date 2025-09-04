import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductGrid: React.FC = () => {
  // عرض أول 8 منتجات فقط في الصفحة الرئيسية
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">المنتجات المميزة</h2>
            <p className="text-xl text-gray-600">اكتشف أفضل منتجاتنا الأكثر مبيعاً</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold">
            عرض الكل
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button - Mobile */}
        <div className="text-center mt-12 md:hidden">
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center gap-2 mx-auto">
            عرض جميع المنتجات
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Quick Access */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'الأدوية', icon: '💊', count: '1,250+' },
            { name: 'الفيتامينات', icon: '🌟', count: '650+' },
            { name: 'العناية بالبشرة', icon: '✨', count: '420+' },
            { name: 'منتجات الأطفال', icon: '👶', count: '380+' }
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count} منتج</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;