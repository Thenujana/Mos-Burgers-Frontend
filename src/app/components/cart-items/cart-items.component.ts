import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Item } from '../../models/item.model';
import { CartService } from '../../service/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  cartItems: Item[] = [];
  selectedItems: Item[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  toggleSelection(item: Item, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
  }
 getTotalPrice(): number {
    return this.selectedItems.reduce((total, item) => total + (item.price || 0), 0);
  }
  confirmOrder(): void {
    if (this.selectedItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No items selected!',
        text: 'Please select at least one item to confirm your order.',
      });
      return;
    }

    const orderList = this.selectedItems.map(i => i.name).join('<br>');

    Swal.fire({
      title: 'Order Confirmed! 🎉',
      html: `<b>You ordered:</b><br>${orderList}`,
      icon: 'success',
      confirmButtonText: 'OK'
    });

    this.cartService.clearCart();
    this.cartItems = [];
    this.selectedItems = [];
  }
}
