import React, { useState, useEffect } from 'react';
import { ArrowRight, CreditCard, Truck, Shield, Check, MapPin, Phone, Mail, MessageSquare, Clock, RefreshCw, Printer, Send } from 'lucide-react';
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
  const [smsCode, setSmsCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [codeError, setCodeError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  
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

  // Generate SMS code when moving to step 3
  useEffect(() => {
    if (step === 3) {
      // Set demo code to 123456 for consistent testing
      setGeneratedCode('123456');
      setTimeLeft(120);
      setSmsCode('');
      setCodeError('');
    }
  }, [step]);

  // Timer countdown
  useEffect(() => {
    if (step === 3 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // محاكاة معالجة البطاقة
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep(3); // الانتقال لخطوة التحقق من الرقم السري
  };

  const handleSmsVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');

    if (smsCode !== generatedCode) {
      setCodeError('الرقم السري غير صحيح. يرجى المحاولة مرة أخرى.');
      return;
    }

    setIsProcessing(true);
    
    // محاكاة التحقق النهائي
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // إنشاء معرف المعاملة وتاريخها
    const txId = 'NH' + Math.random().toString().substr(2, 8);
    const now = new Date();
    setTransactionId(txId);
    setTransactionDate(now.toLocaleString('ar-SA'));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  const handleResendCode = () => {
    // Keep demo code consistent
    setGeneratedCode('123456');
    setTimeLeft(120);
    setSmsCode('');
    setCodeError('');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleEmailReceipt = () => {
    alert('تم إرسال الإيصال إلى بريدك الإلكتروني بنجاح!');
  };

  const maskPhoneNumber = (phone: string) => {
    if (phone.length < 4) return phone;
    return phone.slice(0, 3) + '***' + phone.slice(-2);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center print:shadow-none">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">تم تأكيد طلبك بنجاح!</h1>
            <p className="text-xl text-gray-600 mb-8">
              شكراً لك على الطلب. سيتم توصيل طلبك خلال 2-3 أيام عمل.
            </p>
            
            {/* تفاصيل المعاملة المحسنة */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-right">
              <h3 className="font-bold text-gray-900 mb-6 text-center text-xl">إيصال الدفع</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">رقم المعاملة:</span>
                  <span className="font-mono text-lg text-green-600">{transactionId}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">حالة الدفع:</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    مكتمل ✓
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">المبلغ الإجمالي:</span>
                  <span className="font-bold text-xl text-green-600">{totalAmount.toFixed(2)} ر.س</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">طريقة الدفع:</span>
                  <span>بطاقة ائتمانية ****{paymentInfo.cardNumber.slice(-4)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">تاريخ ووقت المعاملة:</span>
                  <span className="font-mono">{transactionDate}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-900">اسم العميل:</span>
                  <span>{shippingInfo.fullName}</span>
                </div>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 print:hidden">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                طباعة الإيصال
              </button>
              <button
                onClick={handleEmailReceipt}
                className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                إرسال بالإيميل
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 print:hidden">
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
            <div className="w-16 h-1 bg-gray-300 mx-4">
              <div className={`h-full bg-green-500 transition-all duration-300 ${
                step >= 3 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
              <span className="mr-3 text-sm font-medium">التحقق</span>
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
                      {isProcessing ? 'جاري المعالجة...' : 'متابعة للتحقق'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Professional Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 shadow-lg">
                  <div className="max-w-md mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h1 className="text-2xl font-bold">الرقم السري المؤقت</h1>
                    </div>
                    <p className="text-blue-100 text-sm">تأكيد هوية آمن</p>
                  </div>
                </div>

                <div className="max-w-md mx-auto p-6">
                  {/* iPhone SMS Mockup */}
                  <div className="mb-8">
                    <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl">
                      {/* iPhone Frame */}
                      <div className="bg-white rounded-[2rem] overflow-hidden">
                        {/* Status Bar */}
                        <div className="bg-white px-6 py-2 flex justify-between items-center text-black text-sm font-medium">
                          <div className="flex items-center gap-1">
                            <span>9:41</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                              <div className="w-1 h-1 bg-black rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            </div>
                            <span className="text-xs ml-1">STC</span>
                            <div className="w-6 h-3 border border-black rounded-sm">
                              <div className="w-4 h-2 bg-green-500 rounded-sm m-0.5"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* SMS Header */}
                        <div className="bg-gray-50 px-4 py-3 border-b">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">البنك</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">البنك الأهلي السعودي</p>
                              <p className="text-xs text-gray-500">الآن</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* SMS Content */}
                        <div className="p-4 bg-white min-h-[200px]">
                          <div className="bg-gray-100 rounded-2xl p-4 max-w-[85%] mr-auto">
                            <p className="text-gray-900 text-sm leading-relaxed" dir="rtl">
                              <span className="font-bold text-lg">123456</span> هو الرمز السري لتأكيد عمليتك من البطاقة المنتهية برقم <span className="font-bold">1234</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-2" dir="rtl">
                              صالح لمدة دقيقتين فقط. لا تشارك هذا الرمز مع أي شخص.
                            </p>
                            <div className="flex justify-end mt-2">
                              <span className="text-xs text-gray-400">9:41 ص</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Verification Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* Bank Description */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">تأكيد العملية</h2>
                      <p className="text-gray-600 leading-relaxed text-sm" dir="rtl">
                        عميلنا العزيز، نرجو إدخال الرقم السري المؤقت المرسل برسالة نصية إلى جوالك 
                        <span className="font-bold text-blue-600"> {maskPhoneNumber(shippingInfo.phone)} </span>
                        لإتمام العملية من التاجر حسب التفاصيل التالية
                      </p>
                    </div>

                    {/* OTP Input Form */}
                    <form onSubmit={handleSmsVerification}>
                      <div className="mb-8">
                        <label className="block text-center text-gray-700 font-medium mb-4">
                          أدخل الرقم السري (6 أرقام)
                        </label>
                        
                        {/* 6 Separate OTP Fields */}
                        <div className="flex justify-center gap-3 mb-4">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength={1}
                              value={smsCode[index] || ''}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                const newCode = smsCode.split('');
                                newCode[index] = value;
                                const updatedCode = newCode.join('').slice(0, 6);
                                setSmsCode(updatedCode);
                                setCodeError('');
                                
                                // Auto-advance to next field
                                if (value && index < 5) {
                                  const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
                                  if (nextInput) nextInput.focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                // Handle backspace
                                if (e.key === 'Backspace' && !smsCode[index] && index > 0) {
                                  const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
                                  if (prevInput) prevInput.focus();
                                }
                              }}
                              data-index={index}
                              className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all"
                            />
                          ))}
                        </div>
                        
                        {codeError && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <p className="text-red-600 text-sm text-center">{codeError}</p>
                          </div>
                        )}
                      </div>

                      {/* Timer and Resend */}
                      <div className="text-center mb-8">
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-900 font-medium">إعادة الإرسال خلال:</span>
                          </div>
                          <div className={`text-3xl font-bold font-mono ${timeLeft < 30 ? 'text-red-500' : 'text-blue-600'}`}>
                            {formatTime(timeLeft)}
                          </div>
                        </div>
                        
                        <button
                          type="button"
                          onClick={handleResendCode}
                          disabled={timeLeft > 0}
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RefreshCw className="w-4 h-4" />
                          إعادة إرسال الرمز
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                        >
                          العودة
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing || smsCode.length !== 6}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                          {isProcessing ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              جاري التحقق...
                            </div>
                          ) : (
                            'تأكيد'
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-1">تنبيه أمني</h4>
                          <p className="text-yellow-700 text-sm">
                            لا تشارك هذا الرمز مع أي شخص. البنك لن يطلب منك هذا الرمز عبر الهاتف أو البريد الإلكتروني.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Demo Disclaimer */}
                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
                        Demo page for development purposes only
                      </p>
                    </div>
                  </div>
                </div>
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