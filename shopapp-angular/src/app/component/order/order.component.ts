import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';
import { OrderService } from '../../service/order.service';
import { TokenService } from '../../service/token.service';
import { environment } from '../../environment/environment';
import { OrderDTO } from '../../dto/order/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../../model/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  orderForm: FormGroup; // FormGroup object to manage data of form
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = ''; // Voucher
  totalAmount: number = 0; // Total money
  orderData: OrderDTO = {
    user_id: 5,
    fullname: '', 
    email: '', 
    phone_number: '', 
    address: '', 
    status: 'pending',
    note: '', 
    total_money: 0, 
    payment_method: 'cod', 
    shipping_method: 'express', 
    coupon_code: '', 
    cart_items: []
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // Create FormGroup and FormControl
    this.orderForm = this.formBuilder.group({
      fullname: ['', Validators.required], // fullname is required FormControl      
      email: ['', [Validators.email]], //Using Validators.email for email type test
      phone_number: ['', [Validators.required, Validators.minLength(6)]], // phone_number required and atleast 6 characters
      address: ['', [Validators.required, Validators.minLength(5)]], // address required and atleast 5 characters
      note: [''],
      shipping_method: ['express'],
      payment_method: ['cod']
    });
  }
  
  ngOnInit(): void {  
    debugger
    //this.cartService.clearCart();
    this.orderData.user_id = this.tokenService.getUserId();    
    // Get products list from cart
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); // Transfer ID list from Map cart   

    // Call service to get product data base on ID list
    debugger
    if(productIds.length === 0) {
      return;
    }    
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {            
        debugger
        // get product data and quantity from product list and cart
        this.cartItems = productIds.map((productId) => {
          debugger
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }          
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
      },
      complete: () => {
        debugger;
        this.calculateTotal()
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });        
  }
  placeOrder() {
    debugger
    if (this.orderForm.valid) {
      // Set value from form to orderData object
      /*
      this.orderData.fullname = this.orderForm.get('fullname')!.value;
      this.orderData.email = this.orderForm.get('email')!.value;
      this.orderData.phone_number = this.orderForm.get('phone_number')!.value;
      this.orderData.address = this.orderForm.get('address')!.value;
      this.orderData.note = this.orderForm.get('note')!.value;
      this.orderData.shipping_method = this.orderForm.get('shipping_method')!.value;
      this.orderData.payment_method = this.orderForm.get('payment_method')!.value;
      */

      // Using spread operator (...) to copy value from form to orderDate
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      this.orderData.total_money =  this.totalAmount;
      // Corrected data, you can send order
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response:Order) => {
          debugger;          
          alert('Đặt hàng thành công');
          this.cartService.clearCart();
          this.router.navigate(['/']);
        },
        complete: () => {
          debugger;
          this.calculateTotal();
        },
        error: (error: any) => {
          debugger;
          alert(`Lỗi khi đặt hàng: ${error}`);
        },
      });
    } else {
      // Display error notification or something else
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    }       
  }  
  
  // Function to caculate total
  calculateTotal(): void {
      this.totalAmount = this.cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity, 0
      );
  }

  // Function handle apply voucher
  applyCoupon(): void {
    //Not develop yet
  }
}
