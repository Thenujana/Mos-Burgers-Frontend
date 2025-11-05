// app.routes.ts
import { Routes } from '@angular/router';
export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'menu', 
    loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent)
  },
  { 
    path: 'about', 
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
  },
  { 
    path: 'reviews', 
    loadComponent: () => import('./components/reviews/reviews.component').then(m => m.ReviewsComponent)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'add-item', 
    loadComponent: () => import('./components/add-item/add-item.component').then(m => m.AddItemComponent)
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent)
  },
   { 
    path: 'orders', 
    loadComponent: () => import('./components/oders-page/oders-page.component').then(m => m.OdersPageComponent)
  },

  { 
    path: 'cart-items', 
    loadComponent: () => import('./components/cart-items/cart-items.component').then(m => m.CartItemsComponent)
  },
  { 
    path: 'admin/manage-items', 
    loadComponent: () => import('./components/admin/manage-items/manage-items.component').then(m => m.ManageItemsComponent)
  },
  { path: '**', redirectTo: '' }
];