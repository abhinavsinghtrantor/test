import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { EcomPage } from './ecom.page';
import { EcomProductComponent } from '../ecom-product/ecom-product.component';

const routes: Routes = [
  {
    path: '',
    component: EcomPage
  },
  {path: 'product', component: EcomProductComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EcomPage, EcomProductComponent]
})
export class EcomPageModule {}
