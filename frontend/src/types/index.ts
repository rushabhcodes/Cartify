export interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string; // Future attribute
}

export interface CartItem {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
  item: Item;
}

export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ItemFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CartItemInput {
  itemId: number;
  quantity: number;
}
