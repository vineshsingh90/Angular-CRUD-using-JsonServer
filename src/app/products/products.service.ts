import { Injectable } from '@angular/core';
import { BaseServiceService } from '../services/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public baseService: BaseServiceService) {}

  getProducts() {
    return this.baseService.get('products');
  }
  getProductById(id: string) {
    return this.baseService.get('products/' + id);
  }
  addProduct(payload: any) {
    return this.baseService.post('products', payload);
  }
  updateProduct(payload: any) {
    return this.baseService.put('products/' + payload.id, payload);
  }
  deleteProduct(id: string) {
    return this.baseService.delete('products/' + id);
  }
}
