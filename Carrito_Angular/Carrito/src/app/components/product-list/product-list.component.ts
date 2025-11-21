import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  cartService = inject(CartService);

  products: Product[] = [
    {
      id: 1,
      name: 'Laptop Gamer',
      price: 1200,
      image: 'https://via.placeholder.com/150',
      description: 'Potente laptop para juegos.'
    },
    {
      id: 2,
      name: 'Smartphone Pro',
      price: 800,
      image: 'https://via.placeholder.com/150',
      description: 'El mejor smartphone del mercado.'
    },
    {
      id: 3,
      name: 'Auriculares Bluetooth',
      price: 150,
      image: 'https://via.placeholder.com/150',
      description: 'Sonido de alta fidelidad.'
    },
    {
      id: 4,
      name: 'Monitor 4K',
      price: 400,
      image: 'https://via.placeholder.com/150',
      description: 'Resolución increíble.'
    }
  ];

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
