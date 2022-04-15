import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { CategoriesService } from '../../categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss'],
  providers: [MessageService],
})
export class NewProductsComponent implements OnInit {
  id: string = '';
  categories = [];
  selectedCategoryId: string = '';
  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCategories();
    if (this.id) {
      this.getProductById();
    }
  }

  getProductById() {
    this.coreService.showLoader();
    this.productsService.getProductById(this.id).subscribe(
      (res: any) => {
        this.productForm.patchValue(res);
        this.coreService.hideLoader();
      },
      (err: any) => {
        this.coreService.hideLoader();
        console.log(err);
      }
    );
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  addProduct() {
    if (this.productForm.invalid) {
      return;
    }
    this.coreService.showLoader();
    if (this.productForm.value.id) {
      this.updateProduct();
    } else {
      this.productsService.addProduct(this.productForm.value).subscribe(
        () => {
          this.coreService.hideLoader();
          this.messageService.add({
            severity: 'success',
            detail: 'Product added successfully!',
          });
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        },
        (err: any) => {
          this.coreService.hideLoader();
          console.log(err);
          this.messageService.add({
            severity: 'error',
            detail: 'Failed to add Product!',
          });
        }
      );
    }
  }

  updateProduct() {
    this.productsService.updateProduct(this.productForm.value).subscribe(
      () => {
        this.coreService.hideLoader();
        this.messageService.add({
          severity: 'success',
          detail: 'Product updated Successfully!',
        });
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1000);
      },
      (err: any) => {
        this.coreService.hideLoader();
        console.log(err);
        this.messageService.add({
          severity: 'error',
          detail: 'Failed to update Product!',
        });
      }
    );
  }
}
