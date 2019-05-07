declare var platform : any;
declare var H : any;

import { Component } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	@ViewChild("map")
    public mapElement: ElementRef;

	constructor(private _elementRef : ElementRef){
		
		
	}

	ngAfterViewInit() {
		setTimeout(() =>{
			this.renderMap();
		}, 100);
		
	}

	renderMap(){
    
    
 var platform = new H.service.Platform({
    'app_id': 'wfqO2AYhfdblte3PW3LZ',
    'app_code': 'YAg7VwUeOmV1idPCIZUlIw'
    });
	    var defaultLayers = platform.createDefaultLayers();


	    // Instantiate (and display) a map object:
	    var map = new H.Map(
	      this.mapElement.nativeElement,
	      defaultLayers.normal.map,
	      {
	        zoom: 10,
	        center: { lat: 52.5, lng: 13.4 }
	      });
	     let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
	      map.setZoom(14);
	  }

	
}
