import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { NewCategoriesComponent } from './new-categories/new-categories.component';

const categoriesRoutes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'new', component: NewCategoriesComponent },
  { path: 'edit/:id', component: NewCategoriesComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(categoriesRoutes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
