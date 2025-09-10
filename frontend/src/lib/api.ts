import axios from 'axios';
import type { Item, CartItem, AuthResponse, ItemFilter, CartItemInput } from '../types';

const BASE_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const itemsApi = {
  getAll: (filters?: ItemFilter): Promise<Item[]> => 
    api.get('/items', { params: filters }).then(res => res.data),
  
  getById: (id: number): Promise<Item> => 
    api.get(`/items/${id}`).then(res => res.data),
  
  create: (data: { name: string; price: number; category: string; image?: string }): Promise<Item> => 
    api.post('/items', data).then(res => res.data),
  
  update: (id: number, data: Partial<{ name: string; price: number; category: string; image: string }>): Promise<Item> => 
    api.put(`/items/${id}`, data).then(res => res.data),
  
  delete: (id: number): Promise<void> => 
    api.delete(`/items/${id}`).then(res => res.data),
};

export const cartApi = {
  getCart: (): Promise<CartItem[]> => 
    api.get('/cart').then(res => res.data),
  
  addItem: (data: CartItemInput): Promise<CartItem> => 
    api.post('/cart', data).then(res => res.data),
  
  removeItem: (itemId: number): Promise<void> => 
    api.delete(`/cart/${itemId}`).then(res => res.data),
  
  clearCart: (): Promise<void> => 
    api.delete('/cart').then(res => res.data),
};

export const authApi = {
  signup: (email: string, password: string): Promise<AuthResponse> => 
    api.post('/auth/signup', { email, password }).then(res => res.data),
  
  login: (email: string, password: string, clientCart?: CartItemInput[]): Promise<AuthResponse> => 
    api.post('/auth/login', { email, password, clientCart }).then(res => res.data),
};

export default api;
