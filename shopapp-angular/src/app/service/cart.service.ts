import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Map<number, number> = new Map(); // Using Map to storage cart, key is product id, value is quantity

  constructor() {
    // Get cart data from localStorage when initialize service 
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));      
    }
  }

  addToCart(productId: number, quantity: number = 1): void {
    debugger
    if (this.cart.has(productId)) {
      // If product was in cart, increase quantity
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      // If product was not in cart, add product with quantity
      this.cart.set(productId, quantity);
    }
     // After changing cart, storage it to localStorage
    this.saveCartToLocalStorage();
  }
  
  getCart(): Map<number, number> {
    return this.cart;
  }
  // Storage cart to localStorage
  private saveCartToLocalStorage(): void {
    debugger
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
  }  
  // Function to delete cart data and update local storage
  clearCart(): void {
    this.cart.clear(); //Delete all data from cart
    this.saveCartToLocalStorage(); // Save new cart to local storage
  }
}