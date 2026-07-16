export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  unit: string;
  organic?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryMethod: 'same_day' | 'next_day' | 'scheduled' | 'pickup';
  deliveryStatus: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  date: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  trackingNumber: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
