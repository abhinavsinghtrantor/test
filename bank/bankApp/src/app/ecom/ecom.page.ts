import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecom',
  templateUrl: './ecom.page.html',
  styleUrls: ['./ecom.page.scss'],
})
export class EcomPage implements OnInit {

  category : any = {};

  constructor() { }

  ngOnInit() {
  	let subCategories = [];
  	subCategories[0] = {name : "Mobile Phones", imgUrl : "", offer: "30% Off"};
  	subCategories[1] = {name : "Pendrives", imgUrl : "", offer: "30% Off"};
  	subCategories[2] = {name : "Cameras", imgUrl : "", offer: "30% Off"};
  	subCategories[3] = {name : "Headphones", imgUrl : "", offer: "30% Off"};

  	this.category = {"name" : "Electronics", bannerUrl : "", subCategories : subCategories};
  }

}
