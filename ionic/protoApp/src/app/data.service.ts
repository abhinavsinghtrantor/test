import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  savePickupLocation(coords){
    sessionStorage['pickupCoords'] = JSON.stringify(coords);
  }

  saveDropLocation(coords){
    sessionStorage['dropCoords'] = JSON.stringify(coords);
  }

  savePickupLocationLabel(label){
    sessionStorage['pickup'] = label;
  }

  saveDropLocationLabel(label){
    sessionStorage['drop'] = label;
  }

  getPickupLabel(){
    return sessionStorage['pickup'];
  }

  getDropLabel(){
    return sessionStorage['drop'];
  }

  getLocType(){
    return sessionStorage['locType'];
  }

  saveLocType(type){
    sessionStorage['locType'] = type;
  }

}
