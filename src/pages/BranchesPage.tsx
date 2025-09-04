import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { branches } from '../data/branches';

const BranchesPage: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">فروعنا</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نخدمك في أكثر من 1000 فرع في جميع أنحاء المملكة العربية السعودية
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Branches List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">اختر الفرع</h2>
            <div className="space-y-4">
              {branches.map(branch => (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedBranch.id === branch.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{branch.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span>{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branch Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Map Placeholder */}
              <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedBranch.name}</h3>
                  <p className="text-gray-600">خريطة تفاعلية للفرع</p>
                </div>
              </div>

              {/* Branch Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedBranch.name}</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">العنوان</h4>
                        <p className="text-gray-600">{selectedBranch.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">الهاتف</h4>
                        <p className="text-gray-600">{selectedBranch.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">ساعات العمل</h4>
                        <p className="text-gray-600">{selectedBranch.hours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">الخدمات المتاحة</h4>
                    <div className="space-y-2">
                      {[
                        'صيدلية شاملة',
                        'استشارة صيدلي',
                        'فحوصات طبية',
                        'منتجات العناية',
                        'أجهزة طبية',
                        'توصيل سريع'
                      ].map((service, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                    <Navigation className="w-5 h-5" />
                    احصل على الاتجاهات
                  </button>
                  <button className="flex-1 border border-green-500 text-green-500 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    اتصل بالفرع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '1000+', label: 'فرع في المملكة' },
            { number: '24/7', label: 'خدمة العملاء' },
            { number: '2 ساعة', label: 'توصيل سريع' },
            { number: '50,000+', label: 'منتج متاح' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;