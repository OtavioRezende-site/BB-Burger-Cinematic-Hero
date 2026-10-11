export type MenuCategory = 
  | 'todos'
  | 'smash'
  | 'artesanais'
  | 'combos'
  | 'sides'
  | 'sobremesas'
  | 'bebidas';

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: MenuCategory;
  image: string;
  badge?: string;
  isPopular?: boolean;
  calories?: string;
  prepTime?: string;
  ingredients: string[];
  customizable?: boolean;
}

export interface CartCustomization {
  pontoCarne?: string;
  pao?: string;
  adicionais: ExtraOption[];
  remocoes: string[];
  observacoes?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  customization?: CartCustomization;
  itemPrice: number; // base price + extras
  totalPrice: number; // itemPrice * quantity
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  orderType: 'delivery' | 'pickup';
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    reference?: string;
  };
  paymentMethod: 'pix' | 'credit' | 'debit' | 'money';
  paymentTiming: 'delivery' | 'now';
  cashChangeFor?: string;
  notes?: string;
  couponCode?: string;
  discount: number;
  deliveryFee: number;
  subtotal: number;
  total: number;
}
