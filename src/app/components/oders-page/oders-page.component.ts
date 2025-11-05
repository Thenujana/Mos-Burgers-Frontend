import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { OrderService } from '../../service/orders.service';
import Swal from 'sweetalert2';
import { AdminNavComponent } from '../../header/admin-nav/admin-nav.component';

@Component({
  selector: 'app-oders-page',
  imports: [CommonModule,FooterComponent,AdminNavComponent],
  templateUrl: './oders-page.component.html',
  styleUrl: './oders-page.component.css'
})
export class OdersPageComponent implements OnInit{

  orders: any[] = [];
   today: Date = new Date();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }
}