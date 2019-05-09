declare var platform : any;
declare var H : any;

import { Component } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
})
export class MainPage {
	@ViewChild("map")
    public mapElement: ElementRef;

	constructor(private _elementRef : ElementRef){
		
		
	}

	

	
}
