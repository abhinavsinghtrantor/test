import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreOwnerComponent } from './store-owner/store-owner.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { StoreActionsComponent } from './store-actions/store-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreOwnerComponent,
    ReportDetailsComponent,
    StoreActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
