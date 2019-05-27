declare var platform : any;
declare var H : any;

import { Component } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import {NgForm} from '@angular/forms';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dest',
  templateUrl: 'dest.page.html',
  styleUrls: ['dest.page.scss'],
})
export class DestComponent {

  text1: string;
  text2: string;
  list: any;
  isPickup: boolean;
  isDrop: boolean;
  pickCoords : any;
  dropCoords : any;

	constructor(private api: ApiService, private router: Router, private dataService: DataService){ }

  ngOnInit(){
    this.text1 = this.dataService.getPickupLabel();
    this.text2 = this.dataService.getDropLabel();
  }

  autoCompleteLocation(type){
    this.isPickup = false;
    this.isDrop = false;
    this.list = [];

    let text = "";
    if(type == 1){
      this.isPickup = true;
      text = this.text1;
    }else{
      this.isDrop = true;
      text = this.text2;
    }
    this.api.localtionListAutocompleteApi(text).subscribe((data) => {
      this.list = data['suggestions'];
    })
  }

selectLocation(locationId, label){
  this.list = [];
  this.api.getCoords(locationId).subscribe((data) => {
    let coords = data['response']['view'][0]['result'][0]['location']['displayPosition'];
    if(this.isPickup){
      this.pickCoords = coords;
      this.dataService.savePickupLocation(coords);
      this.text1 = label;
      this.dataService.savePickupLocationLabel(label);
    }else if(this.isDrop){
      this.dropCoords = coords;
      this.dataService.saveDropLocation(coords);
      this.text2 = label;
      this.dataService.saveDropLocationLabel(label);
    }

  })

}

focus(type){
  if(type == 1){
    this.isPickup = true;
  }else{
    this.isDrop = true;
  }
}

setOnMap(){
  if(this.isPickup){
    this.dataService.saveLocType('p')
  }else{
    this.dataService.saveLocType('d')
  }
  this.router.navigate(['/location']);
}

doneButton(){
  alert('sdfsdf');
}

}
