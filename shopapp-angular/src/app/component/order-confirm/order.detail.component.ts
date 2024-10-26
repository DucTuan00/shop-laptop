import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';
import { environment } from '../../environment/environment';
import { OrderService } from '../../service/order.service';
import { OrderDTO } from '../../dto/order/order.dto';
import { OrderResponse } from '../../response/order/order.response';
import { OrderDetail } from '../../model/order.detail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order.detail.component.html',
  styleUrl: './order.detail.component.scss'
})
export class OrderDetailComponent implements OnInit{
  orderResponse: OrderResponse = {
    id: 0, // Any number value you want
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0, // Any number value you want 
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [] // Empty array
  };  
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {        
        debugger;       
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address; 
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0], 
          response.order_date[1] - 1, 
          response.order_date[2]
        );        
        
        this.orderResponse.order_details = response.order_details
          .map((order_detail: OrderDetail) => {
          order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
          return order_detail;
        });        
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0], 
          response.shipping_date[1] - 1, 
          response.shipping_date[2]
        );
        
        this.orderResponse.shipping_method = response.shipping_method;
        
        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;
      },
      complete: () => {
        debugger;        
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });
  }
}
