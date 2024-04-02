import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private _api:ProductService){}
  
  products:any = [];

  ngOnInit(){
    this._api.getProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  
}
