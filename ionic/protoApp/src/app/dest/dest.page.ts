declare var platform : any;
declare var H : any;

import { Component } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import {NgForm} from '@angular/forms';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';

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
  
	constructor(private api: ApiService){ }
  
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
      this.text1 = label;
    }else if(this.isDrop){
      this.dropCoords = coords;
      this.text2 = label;
    }

    console.log(this.pickCoords);
    console.log(this.dropCoords);

  })
  
}
	
}
