export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
  total: number;
  checked?: boolean;
}
