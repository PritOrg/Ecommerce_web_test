import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products:Product[] = [
    {
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: '$790.50',
      imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp'
    },
    {
      name: 'Canon camera 20x zoom, Black color EOS 2000',
      price: '$320.00',
      imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp'
    },
    {
      name: 'Xiaomi Redmi 8 Original Global Version 4GB',
      price: '$120.00',
      imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp'
    },
    // Add more products below
    {
      name: 'Product 4',
      price: '$200.00',
      imageUrl: 'https://example.com/product4.jpg'
    },
    {
      name: 'Product 5',
      price: '$150.00',
      imageUrl: 'https://example.com/product5.jpg'
    },
    {
      name: 'Product 6',
      price: '$180.00',
      imageUrl: 'https://example.com/product6.jpg'
    },
    // Add more products as needed
  ];
}
interface Product {
  name: string;
  price: string;
  imageUrl: string;
}
