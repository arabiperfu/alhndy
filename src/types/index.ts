export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}