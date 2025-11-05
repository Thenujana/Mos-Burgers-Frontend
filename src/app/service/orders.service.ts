import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Item[] = [];

  constructor() {
    // Load from localStorage if available
    const saved = localStorage.getItem('orders');
    if (saved) {
      this.orders = JSON.parse(saved);
    }
  }

  addOrder(order: Item): void {
    this.orders.push(order);
    this.saveOrders();
  }

  getOrders(): Item[] {
    return this.orders;
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  clearOrders(): void {
    this.orders = [];
    localStorage.removeItem('orders');
  }
}
