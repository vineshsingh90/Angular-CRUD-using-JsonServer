import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { NewProductsComponent } from './new-products/new-products.component';

const productsRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'new', component: NewProductsComponent },
  { path: 'edit/:id', component: NewProductsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(productsRoutes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
