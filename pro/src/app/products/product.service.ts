import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http : HttpClient) { }

  apiUrl = 'http://localhost:1969';

  getProducts(){
    return this._http.get(this.apiUrl + '/api/products');
  }
}
