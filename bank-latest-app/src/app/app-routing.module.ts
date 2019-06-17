import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreOwnerComponent } from './store-owner/store-owner.component';

const routes: Routes = [
  {path: 'store-owner', component: StoreOwnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
