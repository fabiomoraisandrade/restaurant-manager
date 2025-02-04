export interface OrderRequest {
  table: number;
  name: string;
}

export interface AddItemToOrder {
  order_id: string;
  product_id: string;
  amount: number;
}
