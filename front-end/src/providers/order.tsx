"use client";

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface OrderItemProps {
  id: string;
  amount: number;
  created_at: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
  };
  order: {
    id: string;
    table: number;
    name: string | null;
    draft: boolean;
    status: boolean;
  };
}

type OrderContexData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  finishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContexData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  async function onRequestOpen(order_id: string) {
    try {
      const token = await getCookieClient();

      const response = await api.get(`/api/v1/orderItem/order/${order_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(response.data);
      setIsOpen(true);
    } catch (err) {
      console.error(`Erro ao buscar os itens do pedido: ${err}`);
    }
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  async function finishOrder(order_id: string) {
    const token = getCookieClient();

    try {
      await api.patch(`/api/v1/order/${order_id}/finish`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(`Erro ao finalizar order: ${err}`);
      toast.error("Falha ao finalizar pedido!");
      return;
    }

    toast.success("Pedido finalizado com sucesso!");
    router.refresh();
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider
      value={{ isOpen, onRequestOpen, onRequestClose, order, finishOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
