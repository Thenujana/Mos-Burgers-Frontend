// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { ItemService } from '../../service/item.service';
// import { Item } from '../../models/item.model';
// import { HeaderComponent } from '../header/header.component';
// import { FooterComponent } from "../footer/footer.component";
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
//   templateUrl: './menu.component.html',
//   styleUrl: './menu.component.css',
//   providers: [ItemService]
// })
// export class MenuComponent implements OnInit {
//   items: Item[] = [];
//   readonly assetPath = '/assets/images/';
//   readonly defaultImage = '/assets/images/default.png';

//   private readonly imageMapping: { [key: string]: string } = {
//     'Classic Burger': 'buger2.jpg',
//     'Turkey Burger': 'burger-img.jpg',
//     'Cheese Burger': 'burger.jpg',
//     'Veggie Burger': 'vegi burger.jpg',
//     'Chicken Burger': 'german2.jpg',
//     'Double Cheese Burger': 'double cheese burger.jpg',
//     'Shawarma Burger': 'R.jpg',
//     'Bacon Burger': 'burger1.jpg',
//     'Olive Burger': 'olive burger.jpg',
//     'Coca-Cola': 'cocacola.jpg',
//     'Crispy Chicken Burger': 'crispy burger.webp',
//     'Thai Burger': 'thai-burger.jpg',
//     'Chilli Burger': 'chilli burger',
//     'Set Menu': 'set menu.jpg',
//     'Milkshake': 'milkshakes.jpg',
//     'Mos Special': 'mos special.jpg',
//     'Bubble Tea': 'bubble tea 2.jpg',
//     'Passion': 'passion fruit.jpg'
//   };

//   constructor(private itemService: ItemService) {}

//   ngOnInit(): void {
//     this.itemService.getAll().subscribe({
//       next: (data) => {
//         this.items = data.map(item => {
//           let processedImageUrl = '';

//           if (item.image_url) {
//             if (item.image_url.startsWith('data:image/') || item.image_url.startsWith('http') || item.image_url.startsWith('/assets/') || item.image_url.startsWith('assets/')) {
//               processedImageUrl = item.image_url.startsWith('assets/') ? `/${item.image_url}` : item.image_url;
//             } else {
//               processedImageUrl = `${this.assetPath}${item.image_url}`;
//             }
//           } else {
//             processedImageUrl = this.generateImageUrl(item.name);
//           }

//           return {
//             ...item,
//             image_url: processedImageUrl
//           };
//         });
//       },
//       error: (err) => {
//         console.error('Error fetching items:', err);
//         this.handleError();
//       }
//     });
//   }

//   private generateImageUrl(itemName: string): string {
//     if (!itemName) return this.defaultImage;

//     if (this.imageMapping[itemName]) {
//       return `${this.assetPath}${this.imageMapping[itemName]}`;
//     }

//     const normalizedName = itemName.toLowerCase();
//     for (const [key, value] of Object.entries(this.imageMapping)) {
//       if (key.toLowerCase() === normalizedName) {
//         return `${this.assetPath}${value}`;
//       }
//     }

//     const filename = itemName
//       .toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^a-z0-9-]/g, '')
//       .replace(/-+/g, '-')
//       .replace(/^-|-$/g, '');

//     return `${this.assetPath}${filename}.jpg`;
//   }

//   fallbackImage(event: Event): void {
//     const img = event.target as HTMLImageElement;
//     console.warn('Image failed to load:', img.src);
//     img.src = this.defaultImage;
//   }

//   onImageLoad(event: Event): void {
//     const img = event.target as HTMLImageElement;
//     console.log('Image loaded successfully:', img.src);
//   }

//   buyNow(item: Item): void {
//     Swal.fire({
//       title: '🍔 Order Placed!',
//       html: `<strong>${item.name}</strong><br>Price: <span class="text-warning">RS${item.price?.toFixed(2) || '0.00'}</span>`,
//       imageUrl: item.image_url || this.defaultImage,
//       imageWidth: 120,
//       imageHeight: 120,
//       imageAlt: item.name,
//       confirmButtonText: 'OK',
//       confirmButtonColor: '#ffa500',
//       background: '#fffef5',
//       backdrop: `rgba(0,0,0,0.4)`
//     });
//   }

//   private handleError(): void {
//     console.log('Failed to load menu items. Please try again later.');
//     this.items = [];
//   }

//   hasValidPrice(item: Item): boolean {
//     return item.price != null && item.price > 0;
//   }

//   formatPrice(price: number | undefined): string {
//     return price ? `RS${price.toFixed(2)}` : 'Price not available';
//   }

//   isExpired(item: Item): boolean {
//     if (!item.exp_date) return false;
//     return new Date(item.exp_date) < new Date();
//   }
//   addToCart(item:Item):void{
//     Swal.fire({
//     title: 'Added to Cart!',
//     text: `${item.name} has been added to your cart.`,
//     icon: 'success',
//     confirmButtonText: 'OK',
//     timer: 2000,
//     timerProgressBar: true,
//     showConfirmButton: false,
//     position: 'top-end',
//     toast: true,
//   });
//   }
// }







import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from '../../service/item.service';
import { CartService } from '../../service/cart.service';
import { Item } from '../../models/item.model';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ItemService]
})
export class MenuComponent implements OnInit {
  items: Item[] = [];
  readonly assetPath = '/assets/images/';
  readonly defaultImage = '/assets/images/default.png';

  private readonly imageMapping: { [key: string]: string } = {
    'Classic Burger': 'buger2.jpg',
    'Turkey Burger': 'burger-img.jpg',
    'Cheese Burger': 'burger.jpg',
    'Veggie Burger': 'vegi burger.jpg',
    'Chicken Burger': 'german2.jpg',
    'Double Cheese Burger': 'double cheese burger.jpg',
    'Shawarma Burger': 'R.jpg',
    'Bacon Burger': 'burger1.jpg',
    'Olive Burger': 'olive burger.jpg',
    'Coca-Cola': 'cocacola.jpg',
    'Crispy Chicken Burger': 'crispy burger.webp',
    'Thai Burger': 'thai-burger.jpg',
    'Chilli Burger': 'chilli burger.jpg',
    'Set Menu': 'set menu.jpg',
    'Milkshake': 'milkshakes.jpg',
    'Mos Special': 'mos special.jpg',
    'Bubble Tea': 'bubble tea 2.jpg',
    'Passion': 'passion fruit.jpg'
  };

  constructor(private itemService: ItemService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  // 🔹 Fetch all menu items from backend
  private loadItems(): void {
    this.itemService.getAll().subscribe({
      next: (data) => {
        this.items = data.map(item => {
          let processedImageUrl = '';

          if (item.image_url) {
            if (
              item.image_url.startsWith('data:image/') ||
              item.image_url.startsWith('http') ||
              item.image_url.startsWith('/assets/') ||
              item.image_url.startsWith('assets/')
            ) {
              processedImageUrl = item.image_url.startsWith('assets/')
                ? `/${item.image_url}`
                : item.image_url;
            } else {
              processedImageUrl = `${this.assetPath}${item.image_url}`;
            }
          } else {
            processedImageUrl = this.generateImageUrl(item.name);
          }

          return { ...item, image_url: processedImageUrl };
        });
      },
      error: (err) => {
        console.error('Error fetching items:', err);
        this.handleError();
      }
    });
  }

  // 🔹 Generate fallback image path if missing
  private generateImageUrl(itemName: string): string {
    if (!itemName) return this.defaultImage;

    if (this.imageMapping[itemName]) {
      return `${this.assetPath}${this.imageMapping[itemName]}`;
    }

    const normalizedName = itemName.toLowerCase();
    for (const [key, value] of Object.entries(this.imageMapping)) {
      if (key.toLowerCase() === normalizedName) {
        return `${this.assetPath}${value}`;
      }
    }

    const filename = itemName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return `${this.assetPath}${filename}.jpg`;
  }

  // 🔹 Handle image load errors
  fallbackImage(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.warn('Image failed to load:', img.src);
    img.src = this.defaultImage;
  }

  // 🔹 Debugging (image loaded successfully)
  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.log('Image loaded successfully:', img.src);
  }

  // 🔹 Buy Now button
  buyNow(item: Item): void {
    Swal.fire({
      title: '🍔 Order Placed!',
      html: `<strong>${item.name}</strong><br>Price: <span class="text-warning">RS${item.price?.toFixed(2) || '0.00'}</span>`,
      imageUrl: item.image_url || this.defaultImage,
      imageWidth: 120,
      imageHeight: 120,
      imageAlt: item.name,
      confirmButtonText: 'OK',
      confirmButtonColor: '#ffa500',
      background: '#fffef5',
      backdrop: `rgba(0,0,0,0.4)`
    });
  }

  // 🔹 Add item to cart
  addToCart(item: Item): void {
    this.cartService.addToCart(item);
    Swal.fire({
      title: 'Added to Cart!',
      text: `${item.name} has been added to your cart.`,
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  }

  // 🔹 Error handler
  private handleError(): void {
    console.log('Failed to load menu items. Please try again later.');
    this.items = [];
  }

  // 🔹 Helper functions
  hasValidPrice(item: Item): boolean {
    return item.price != null && item.price > 0;
  }

  formatPrice(price: number | undefined): string {
    return price ? `RS${price.toFixed(2)}` : 'Price not available';
  }

  isExpired(item: Item): boolean {
    if (!item.exp_date) return false;
    return new Date(item.exp_date) < new Date();
  }
}
