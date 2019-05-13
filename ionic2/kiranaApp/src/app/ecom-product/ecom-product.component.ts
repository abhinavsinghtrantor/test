import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecom-product',
  templateUrl: './ecom-product.component.html',
  styleUrls: ['./ecom-product.component.scss'],
})
export class EcomProductComponent implements OnInit {

  products : any = {}

  constructor() { }

  ngOnInit() {
  	let productList = [];
  	productList[0] = {name : "1IPhone X", price : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off", 
  						imgUrl : ""};
  	productList[1] = {name : "2IPhone X", price : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off", 
  						imgUrl : ""};
  	productList[2] = {name : "3IPhone X", price : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off", 
  						imgUrl : ""};
  	productList[3] = {name : "4IPhone X", price : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off", 
  						imgUrl : ""};

  	this.products = {catName : "Electronics", productList : productList}
  }

}
