import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  bItems: any[] = [[]];
  sItems: any[] = [[]];
  isBankVisible: boolean = true;
  isShopVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  	this.bItems[0] = ["item1", "item2", "item3", "item3"];
  	this.bItems[1] = ["item4", "item5", "item6", "item3"];
  	this.bItems[2] = ["item7", "item8", "item9", "item3"];
    this.bItems[3] = ["item7", "item8", "item9", "item3"];
  }

  segmentChanged(ev: any) {
  	let val = ev.detail.value;
  	if(val == "BANK"){
  		this.isBankVisible = true;
  		this.isShopVisible = false;
  	}else{
  		this.isShopVisible = true;
  		this.isBankVisible = false;
  	}
    console.log('Segment changed', ev);
  }

}
