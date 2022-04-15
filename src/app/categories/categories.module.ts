import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { NewCategoriesComponent } from './new-categories/new-categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { PrimengModule } from '../primeng-modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriesComponent, NewCategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
  ],
})
export class CategoriesModule {}
