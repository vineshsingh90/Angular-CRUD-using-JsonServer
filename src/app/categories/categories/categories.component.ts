import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoreService } from 'src/app/services/core.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CategoriesComponent implements OnInit {
  categories = [];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private coreService: CoreService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.coreService.showLoader();
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.coreService.hideLoader();
      this.categories = res;
    });
  }

  confirmDelete(category: any) {
    this.confirmationService.confirm({
      message:
        'Are you sure that you want to delete category: ' + category.name + '?',
      accept: () => {
        this.deleteCategory(category);
      },
    });
  }

  deleteCategory(category: any): void {
    this.coreService.showLoader();
    this.categoriesService.deleteCategory(category.id).subscribe(
      (res) => {
        this.coreService.hideLoader();
        this.messageService.add({
          severity: 'success',
          detail: category.name + ' deleted successfully!',
        });
        this.getCategories();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Failed to delete ' + category.name,
        });
      }
    );
  }
}
