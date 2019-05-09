declare var platform : any;
declare var H : any;

import { Component, Input } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapComponent {
	@ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    lat : number = 30.7333;

    @Input()
    long : number = 76.7794;

    svgMarkup : String;

	constructor(private _elementRef : ElementRef){}

	ngOnInit(){
		this.svgMarkup = '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /></svg>';
	}

	ngAfterViewInit() {
		setTimeout(() =>{
			this.renderMap();
		}, 1000);
	}
	renderMap(){
 		var platform = new H.service.Platform({
    		'app_id': 'wfqO2AYhfdblte3PW3LZ',
    		'app_code': 'YAg7VwUeOmV1idPCIZUlIw'
    	});
	    var defaultLayers = platform.createDefaultLayers();
	    // Instantiate (and display) a map object:

	    var icon = new H.map.DomIcon(this.svgMarkup),
  			marker = new H.map.DomMarker({ lat: this.lat, lng: this.long }, {icon: icon});

	    var map = new H.Map(
	      this.mapElement.nativeElement,
	      defaultLayers.normal.map,
	      {
	        zoom: 10,
	        center: { lat: this.lat, lng: this.long }
	      });
	     let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
	      map.setZoom(15);
	      map.addObject(marker);

/*
	      map.addEventListener('drag', function(ev) {
			    marker.setPosition(map.getCenter());
			    
			  }, false);
			  */
		  
	  }
}
