// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private cartItems: any[] = [];

//   addToCart(item: any) {
//     // prevent duplicates
//     const existing = this.cartItems.find(i => i.id === item.id);
//     if (!existing) {
//       this.cartItems.push({ ...item, selected: false });
//     }
//   }

//   getCartItems() {
//     return this.cartItems;
//   }

//   clearCart() {
//     this.cartItems = [];
//   }
//   getTotalPrice(): number {
//     return this.cartItems.reduce((total, item) => total + item.price, 0);
//   }
// }



import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'cart_items';

  constructor() {}

  // ✅ Get all cart items (from localStorage)
  getCartItems(): Item[] {
    const cartData = localStorage.getItem(this.CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  }

  // ✅ Add an item to the cart
  addToCart(item: Item): void {
    const cart = this.getCartItems();
    cart.push(item);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  // ✅ Clear all items from the cart
  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }

  // ✅ Remove a specific item from the cart
  removeItem(item: Item): void {
    const cart = this.getCartItems().filter(i => i.name !== item.name);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }
}
