import { OrderDetail } from "../../model/order.detail";
export interface OrderResponse {
    id: number;
    user_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    order_date: Date; // String type ISO 8601
    status: string;
    total_money: number;
    shipping_method: string;
    shipping_address: string;
    shipping_date: Date; // String type ISO 8601
    payment_method: string;
    order_details: OrderDetail[]; // Ensure have 1 interface OrderDetail
  }
  
  