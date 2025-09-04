import React, { useState } from 'react';
import { ArrowRight, CreditCard, Truck, Shield, Check, MapPin, Phone, Mail } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const shippingCost = getTotalPrice() >= 100 ? 0 : 15;
  const totalAmount = getTotalPrice() + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // محاكاة معالجة الدفع
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">تم تأكيد طلبك!</h1>
            <p className="text-xl text-gray-600 mb-8">
              شكراً لك على الطلب. سيتم توصيل طلبك خلال 2-3 أيام عمل.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">تفاصيل الطلب</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>رقم الطلب:</span>
                  <span className="font-mono">#NH{Math.random().toString().substr(2, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>المبلغ الإجمالي:</span>
                  <span className="font-bold">{totalAmount.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>طريقة الدفع:</span>
                  <span>بطاقة ائتمانية</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                العودة للرئيسية
              </button>
              <button
                onClick={() => navigate('/products')}
                className="flex-1 border border-green-500 text-green-500 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">السلة فارغة</h1>
            <p className="text-gray-600 mb-8">أضف بعض المنتجات لإتمام عملية الشراء</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              تسوق الآن
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowRight className="w-5 h-5" />
            العودة
          </button>
          <h1 className="text-3xl font-bold text-gray-900">إتمام الطلب</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <span className="mr-3 text-sm font-medium">معلومات الشحن</span>
            </div>
            <div className="w-16 h-1 bg-gray-300 mx-4">
              <div className={`h-full bg-green-500 transition-all duration-300 ${
                step >= 2 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className="mr-3 text-sm font-medium">الدفع</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات الشحن</h2>
                
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="05xxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العنوان *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="الشارع، الحي، رقم المبنى"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المدينة *
                      </label>
                      <select
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">اختر المدينة</option>
                        <option value="riyadh">الرياض</option>
                        <option value="jeddah">جدة</option>
                        <option value="dammam">الدمام</option>
                        <option value="mecca">مكة المكرمة</option>
                        <option value="medina">المدينة المنورة</option>
                        <option value="khobar">الخبر</option>
                        <option value="taif">الطائف</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الرمز البريدي
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ملاحظات إضافية
                    </label>
                    <textarea
                      rows={3}
                      value={shippingInfo.notes}
                      onChange={(e) => setShippingInfo({...shippingInfo, notes: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أي ملاحظات خاصة للتوصيل..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
                  >
                    متابعة للدفع
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات الدفع</h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {/* Payment Methods */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      طريقة الدفع
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { id: 'card', name: 'بطاقة ائتمانية', icon: CreditCard },
                        { id: 'mada', name: 'مدى', icon: CreditCard },
                        { id: 'applepay', name: 'Apple Pay', icon: CreditCard }
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            paymentInfo.method === method.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={paymentInfo.method === method.id}
                            onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value})}
                            className="sr-only"
                          />
                          <method.icon className="w-6 h-6 text-gray-600 ml-3" />
                          <span className="font-medium">{method.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم البطاقة *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                          if (value.length <= 19) {
                            setPaymentInfo({...paymentInfo, cardNumber: value});
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          تاريخ الانتهاء *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.expiryDate}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/');
                            if (value.length <= 5) {
                              setPaymentInfo({...paymentInfo, expiryDate: value});
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) {
                              setPaymentInfo({...paymentInfo, cvv: value});
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        اسم حامل البطاقة *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="الاسم كما هو مكتوب على البطاقة"
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-blue-500" />
                      <div>
                        <h4 className="font-semibold text-blue-900">دفع آمن ومشفر</h4>
                        <p className="text-sm text-blue-700">جميع معلومات الدفع محمية بتشفير SSL 256-bit</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      العودة
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'جاري المعالجة...' : `دفع ${totalAmount.toFixed(2)} ر.س`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">ملخص الطلب</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">الكمية: {item.quantity}</span>
                        <span className="font-semibold text-green-600">
                          {(item.price * item.quantity).toFixed(2)} ر.س
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{getTotalPrice().toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن:</span>
                  <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                    {shippingCost === 0 ? 'مجاني' : `${shippingCost.toFixed(2)} ر.س`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                  <span>المجموع الكلي:</span>
                  <span className="text-green-600">{totalAmount.toFixed(2)} ر.س</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="w-5 h-5 text-green-500" />
                  <span className="font-medium">معلومات التوصيل</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• توصيل خلال 2-3 أيام عمل</p>
                  <p>• تتبع الطلب مباشرة</p>
                  <p>• توصيل آمن ومضمون</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;