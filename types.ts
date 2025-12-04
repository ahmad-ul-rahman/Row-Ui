export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  author_image?: string;
  image_url: string;
  category: 'Tech' | 'Design' | 'Tools' | 'Guides';
  created_at: string;
  excerpt?: string; // Optional, can be derived from content
  tags?: string[];
  read_time?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  description?: string;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  category: string;
  created_at: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  old_price: number;
  new_price: number;
  coupon_code: string;
  expiry: string;
  image_url: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
}
