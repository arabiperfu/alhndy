import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      ></div>

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-green-500" />
              سلة التسوق ({getTotalItems()})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">السلة فارغة</h3>
                <p className="text-gray-600 mb-6">أضف بعض المنتجات لتبدأ التسوق</p>
                <button
                  onClick={closeCart}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  ابدأ التسوق
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-green-600 font-bold mb-2">
                        {item.price} ر.س
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-900">المجموع الفرعي:</span>
                  <span className="font-bold text-green-600">
                    {getTotalPrice().toFixed(2)} ر.س
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>الشحن:</span>
                  <span className="text-green-600 font-medium">
                    {getTotalPrice() >= 100 ? 'مجاني' : '15.00 ر.س'}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-4">
                  <span>المجموع الكلي:</span>
                  <span className="text-green-600">
                    {(getTotalPrice() + (getTotalPrice() >= 100 ? 0 : 15)).toFixed(2)} ر.س
                  </span>
                </div>

                {/* Free Shipping Notice */}
                {getTotalPrice() < 100 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-700">
                      أضف {(100 - getTotalPrice()).toFixed(2)} ر.س أخرى للحصول على توصيل مجاني!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
                >
                  إتمام الطلب
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  متابعة التسوق
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;