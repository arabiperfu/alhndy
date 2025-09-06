import React, { useState, useEffect } from 'react';
import { BarChart3, Users, ShoppingCart, Package, Eye, Search, Download, Filter, CreditCard, Shield, Calendar, MapPin, Phone, Mail } from 'lucide-react';

interface Order {
  id: string;
  transactionId: string;
  date: string;
  dateFormatted: string;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
  payment: {
    method: string;
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    maskedCardNumber: string;
  };
  items: Array<{
    id: string;
    name: string;
    nameEn: string;
    price: number;
    quantity: number;
    total: number;
    image: string;
    category: string;
  }>;
  summary: {
    subtotal: number;
    shipping: number;
    total: number;
  };
  verification: {
    smsCode: string;
    verifiedAt: string;
  };
}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">طلبات مكتملة</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">العملاء الجدد</p>
                <p className="text-2xl font-bold text-gray-900">{JSON.parse(localStorage.getItem('customers') || '[]').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">عملاء مسجلين</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المبيعات</p>
                <p className="text-2xl font-bold text-gray-900">{orders.reduce((sum, order) => sum + order.summary.total, 0).toFixed(2)} ر.س</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">مبيعات مكتملة</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المنتجات</p>
                <p className="text-2xl font-bold text-gray-900">{orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">منتجات مباعة</p>
          </div>
        </div>