export interface OrderRequest {
  table: number;
  name: string;
}

export interface OrderUpdate {
  table: number;
  status: boolean;
  draft: boolean;
  name: string;
}
