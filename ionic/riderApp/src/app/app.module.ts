import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { MainPage } from './main/main.page';
import { MapComponent } from './map/map.page';
import { DestComponent } from './dest/dest.page';
import { AppRoutingModule } from './app-routing.module';
import { SelectLocationComponent } from './select-location/select-location.component';
import { SelectCarComponent } from './select-car/select-car.component';
import { RideWaitComponent } from './ride-wait/ride-wait.component';
import { RideStartComponent } from './ride-start/ride-start.component';
import { RideEndComponent } from './ride-end/ride-end.component';

@NgModule({
  declarations: [AppComponent, MainPage, MapComponent, DestComponent, SelectLocationComponent, SelectCarComponent,
  RideWaitComponent, RideStartComponent, RideEndComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
