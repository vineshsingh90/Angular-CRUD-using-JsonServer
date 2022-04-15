import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CoreService } from 'src/app/services/core.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-new-categories',
  templateUrl: './new-categories.component.html',
  styleUrls: ['./new-categories.component.scss'],
  providers: [MessageService],
})
export class NewCategoriesComponent implements OnInit {
  id: string = '';
  categories = [];
  selectedCategoryId: string = '';
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private categoriesService: CategoriesService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.getCategoryById();
    }
  }

  getCategoryById() {
    this.coreService.showLoader();
    this.categoriesService.getCategoryById(this.id).subscribe(
      (res: any) => {
        this.categoryForm.patchValue(res);
        this.coreService.hideLoader();
      },
      (err: any) => {
        this.coreService.hideLoader();
        console.log(err);
      }
    );
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      return;
    }
    this.coreService.showLoader();
    if (this.id) {
      this.updateCategory();
    } else {
      this.categoriesService.addCategory(this.categoryForm.value).subscribe(
        (res: any) => {
          this.coreService.hideLoader();
          this.messageService.add({
            severity: 'success',
            detail: 'Category added Successfully!',
          });
          setTimeout(() => {
            this.router.navigate(['/categories']);
          }, 500);
        },
        (err: any) => {
          this.coreService.hideLoader();
          console.log(err);
          this.messageService.add({
            severity: 'error',
            detail: 'Failed to add Category!',
          });
        }
      );
    }
  }

  updateCategory() {
    this.categoriesService.updateCategory(this.categoryForm.value).subscribe(
      () => {
        this.coreService.hideLoader();
        this.messageService.add({
          severity: 'success',
          detail: 'Category updated successfully!',
        });
        setTimeout(() => {
          this.router.navigate(['/categories']);
        }, 500);
      },
      (err: any) => {
        this.coreService.hideLoader();
        console.log(err);
        this.messageService.add({
          severity: 'error',
          detail: 'Failed to update category!',
        });
      }
    );
  }
}
