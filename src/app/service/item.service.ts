import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly BASE_URL = 'http://localhost:8080/item';

  constructor(private http: HttpClient) {}

  // Add a new item
  addItem(item: Item): Observable<string> {
    return this.http.post(`${this.BASE_URL}/add`, item, { responseType: 'text' });
  }

  // Get all items
  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.BASE_URL}/get-all`);
  }

  // Delete an item by ID
  deleteItem(id: number): Observable<string> {
    return this.http.delete(`${this.BASE_URL}/delete/${id}`, { responseType: 'text' });
  }

  // Search item by ID
  searchById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.BASE_URL}/search-by-id/${id}`);
  }

  // Search items by name
  searchByName(name: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.BASE_URL}/search-by-name/${name}`);
  }

  // Update an item
  updateItem(item: Item): Observable<string> {
    return this.http.put(`${this.BASE_URL}/update-item`, item, { responseType: 'text' });
  }
}
