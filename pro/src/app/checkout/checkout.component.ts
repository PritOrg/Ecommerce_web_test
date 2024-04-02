import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  bagItems: any[] = []; // Initialize bagItems array to store fetched items
  subtotal: number = 0;
  total: number = 0;

  constructor() { }

  ngOnInit(): void {
    // Fetch bag items from API or any other source
    this.fetchBagItems();
  }

  fetchBagItems(): void {
    // Simulated API call or any other method to fetch bag items
    // For demonstration purpose, I'm simulating two bag items
    this.bagItems = [
      { name: 'Thinking, Fast and Slow', format: 'Digital', quantity: 2, price: 9.99, imageUrl: 'https://i.imgur.com/2DsA49b.webp' },
      { name: 'Homo Deus: A Brief History of Tomorrow', format: 'Paperback', quantity: 1, price: 13.50, imageUrl: 'https://i.imgur.com/Oj1iQUX.webp' }
    ];

    // Calculate subtotal and total
    this.calculateTotals();
  }

  updateQuantity(index: number, isIncrease: boolean): void {
    if (isIncrease) {
      this.bagItems[index].quantity++;
    } else {
      if (this.bagItems[index].quantity > 1) {
        this.bagItems[index].quantity--;
      }
    }

    // Recalculate totals
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subtotal = this.bagItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.total = this.subtotal + 2.99; // Add shipping fee for demonstration
  }
}
