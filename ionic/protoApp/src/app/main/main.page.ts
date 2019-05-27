declare var platform : any;
declare var H : any;

import { Component } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
})
export class MainPage {
	@ViewChild("map")
    public mapElement: ElementRef;

  isDrag: string;


	constructor(private _elementRef : ElementRef, private router: Router){


	}

  ngOnInit(){
    this.isDrag = "n";
     delete sessionStorage['pickupCoords'];
  delete sessionStorage['dropCoords'];
  delete sessionStorage['pickup'];
  delete sessionStorage['drop'];
  }

  input(){
    this.router.navigate(['/dest']);
  }

}
