import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import BranchesPage from './pages/BranchesPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/branches" element={<BranchesPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
            <Footer />
            <Cart />
            <AuthModal />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;