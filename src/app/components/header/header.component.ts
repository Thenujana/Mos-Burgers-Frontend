import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface for menu items
interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image?: string;
  description?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  showResults: boolean = false;
  filteredItems: MenuItem[] = [];

  // Sample menu items - replace with your actual data or service call
  menuItems: MenuItem[] = [
    { id: 1, name: ' Classic Burger', category: 'rinks', price: 'Rs.750', image: 'assets/images/buger2.jpg' },
    { id: 2, name: 'Turkey Burger', category: 'Burgers', price: 'Rs.1600', image: 'assets/images/burger-img.jpg' },
    { id: 3, name: 'Chicken Burger', category: 'Burgers', price: 'Rs.1400', image: 'assets/images/german2.jpg' },
    { id: 4, name: 'Bacon Burger', category: 'Burgers', price: 'Rs.650', image: 'assets/images/burger1.jpg' },
    { id: 5, name: 'Shawarma Burger', category: 'Burger', price: 'Rs.800', image: 'assets/images/R.jpg' },
    { id: 6, name: 'Olive Burger', category: 'Burger', price: 'Rs.1800', image: 'assets/images/olive burger.jpg' },
    { id: 7, name: 'Double Cheese Burger', category: 'Burger', price: 'RS.1250', image: 'assets/images/double cheese burger.jpg' },
    { id: 8, name: 'Crispy Chicken Burger', category: 'Burger', price: 'RS.1600', image: 'assets/images/crispy burger.webp' },
    { id: 9, name: 'Coca-cola', category: 'Drinks', price: 'RS.350', image: 'assets/images/cocacola.jpg' },
    { id: 10, name: 'Sprite', category: 'Drinks', price: 'RS.350', image: 'assets/images/sprite.jpg' },
    { id: 11, name: 'set menu', category: 'Burger', price: 'RS.1850', image: 'assets/images/set menu.jpg' },
    { id: 12, name: 'bubble tea', category: 'Drinks', price: 'RS.1300', image: 'assets/images/bubble tea 2.jpg' },

  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize filtered items
    this.filteredItems = [];
  }

  // Handle search input changes
  onSearchChange(): void {
    if (this.searchTerm.trim().length > 0) {
      this.filteredItems = this.menuItems.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.showResults = true;
    } else {
      this.filteredItems = [];
      this.showResults = false;
    }
  }

  // Handle search form submission
  onSearchSubmit(): void {
    if (this.searchTerm.trim()) {
      this.onSearchChange();
      // Optionally navigate to a search results page
      // this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }

  // Handle item selection from dropdown
  onItemSelect(item: MenuItem): void {
    console.log('Selected item:', item);
    this.showResults = false;
    this.searchTerm = '';
    
    // Navigate to item detail page or add to cart
    // this.router.navigate(['/menu', item.id]);
    
    // Or show item details in a modal/popup
    alert(`Selected: ${item.name} - ${item.price}`);
  }

  // Clear search
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredItems = [];
    this.showResults = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const searchContainer = document.querySelector('.search-container');
    
    if (searchContainer && !searchContainer.contains(target)) {
      this.showResults = false;
    }
  }

  // Handle image load error
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/images/placeholder-food.jpg';
    }
  }

  // Handle Enter key press in search input
  onSearchKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSearchSubmit();
    }
  }

  // Original logout function
  logout(): void {
    // Clear local storage or session if needed
    localStorage.clear();
    sessionStorage.clear();
    
    // Navigate to login
    this.router.navigate(['/login']);
  }

  // Helper method to get placeholder image if item image is not available
  getItemImage(item: MenuItem): string {
    return item.image || 'assets/images/placeholder-food.jpg';
  }

  // Method to get item count text
  getResultsText(): string {
    const count = this.filteredItems.length;
    return count === 1 ? '1 item found' : `${count} items found`;
  }
}