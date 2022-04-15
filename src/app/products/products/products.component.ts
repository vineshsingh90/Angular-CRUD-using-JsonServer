import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CategoriesService } from 'src/app/categories/categories.service';
import { CoreService } from 'src/app/services/core.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProductsComponent implements OnInit {
  customers = [];

  representatives: any = [];

  statuses: any = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  first = 0;

  rows = 10;
  products: any[] = [];

  categories = [];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService,
    public coreService: CoreService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  getProducts() {
    this.coreService.showLoader();
    this.productsService.getProducts().subscribe((res: any) => {
      this.coreService.hideLoader();
      res.forEach((product: any) => {
        product.category = product.categoryId;
      });
      this.products = res;
    });
  }

  confirmDelete(product: any) {
    this.confirmationService.confirm({
      message:
        'Are you sure that you want to delete product: ' + product.name + '?',
      accept: () => {
        this.deleteProduct(product);
      },
    });
  }

  deleteProduct(product: any) {
    this.coreService.showLoader();
    this.productsService.deleteProduct(product.id).subscribe(
      (res) => {
        this.coreService.hideLoader();
        this.messageService.add({
          severity: 'success',
          detail: product.name + ' deleted successfully!',
        });
        this.getProducts();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Failed to delete ' + product.name,
        });
      }
    );
  }

  getProdName(id: string) {
    if (id) {
      let cat: any = this.categories.find((c: any) => c.id == id);
      return cat.name;
    } else {
      return '';
    }
  }
}
