// manage-items.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../../../models/item.model';
import { ItemService } from '../../../service/item.service';
import { AdminNavComponent } from '../../../header/admin-nav/admin-nav.component';
@Component({
  selector: 'app-manage-items',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent],
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css']
})
export class ManageItemsComponent implements OnInit {
  items: Item[] = [];
  editingItem: Item | null = null;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getAll().subscribe({
      next: data => {
        this.items = data;
        console.log('Items loaded:', this.items);
      },
      error: err => {
        console.error('Error loading items', err);
        this.items = []; // Ensure items array is initialized even on error
      }
    });
  }

  editItem(item: Item): void {
    // Make a copy to avoid direct mutation
    this.editingItem = { ...item };
  }

  saveItem(): void {
    if (this.editingItem) {
      this.itemService.updateItem(this.editingItem).subscribe({
        next: () => {
          this.loadItems();        // reload list
          this.editingItem = null; // exit edit mode
        },
        error: err => console.error('Update error', err)
      });
    }
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id).subscribe({
        next: () => {
          this.items = this.items.filter(i => i.id !== id);
        },
        error: err => console.error('Delete error', err)
      });
    }
  }
}