import React from 'react';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import FeaturedOffers from '../components/FeaturedOffers';
import ProductGrid from '../components/ProductGrid';
import ServicesSection from '../components/ServicesSection';
import StatsSection from '../components/StatsSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturedOffers />
      <ProductGrid />
      <ServicesSection />
      <StatsSection />
    </div>
  );
};

export default HomePage;