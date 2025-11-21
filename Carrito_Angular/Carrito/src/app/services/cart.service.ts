import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal to hold the list of cart items
  cartItems = signal<CartItem[]>([]);

  // Computed signal for total price
  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  // Computed signal for total item count
  itemCount = computed(() => {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  });

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...items, { product, quantity: 1 }];
      }
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }
  
  updateQuantity(productId: number, quantity: number) {
      if (quantity <= 0) {
          this.removeFromCart(productId);
          return;
      }
      
      this.cartItems.update(items => 
        items.map(item => 
            item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
