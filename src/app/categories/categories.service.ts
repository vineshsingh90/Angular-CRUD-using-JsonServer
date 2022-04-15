import { Injectable } from '@angular/core';
import { BaseServiceService } from '../services/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(public baseService: BaseServiceService) {}

  getCategories() {
    return this.baseService.get('categories');
  }
  getCategoryById(id: string) {
    return this.baseService.get('categories/' + id);
  }
  addCategory(payload: any) {
    return this.baseService.post('categories', payload);
  }
  updateCategory(payload: any) {
    return this.baseService.put('categories/' + payload.id, payload);
  }
  deleteCategory(id: string) {
    return this.baseService.delete('categories/' + id);
  }
}
