import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainPage } from './main/main.page';
import { DestComponent } from './dest/dest.page';
import { SelectLocationComponent } from './select-location/select-location.component';
import { SelectCarComponent } from './select-car/select-car.component';
import { RideWaitComponent } from './ride-wait/ride-wait.component';
import { RideStartComponent } from './ride-start/ride-start.component';
import { RideEndComponent } from './ride-end/ride-end.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainPage },
  { path: 'dest', component: DestComponent },
  { path: 'location', component: SelectLocationComponent },
   { path: 'selectcar', component: SelectCarComponent },
   { path: 'ridewait', component: RideWaitComponent },
   { path: 'ridestart', component: RideStartComponent },
   { path: 'rideend', component: RideEndComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
