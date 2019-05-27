declare var platform : any;
declare var H : any;

import { Component, Input } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapComponent {
	@ViewChild("map")
    public mapElement: ElementRef;

    me: any;
    @Input()
    isDrag: string

    isDraggable: string;

    @Input()
    lat : number = 30.7333;

    @Input()
    long : number = 76.7794;

    svgMarkup : String;

	constructor(private _elementRef : ElementRef, private api : ApiService, private dataService: DataService
  , private router: Router){

  }

	ngOnInit(){
 

  this.isDraggable = this.isDrag;

		this.svgMarkup = '<svg width="15" height="15" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="15" ' +
  'height="22" /></svg>';
	}

  doneButton(){
    //alert('sdfsdf');
  }

	ngAfterViewInit() {
		setTimeout(() =>{
			this.renderMap();
		}, 1000);
	}
	renderMap(){
    var apiLocal = this.api;
    var ds = this.dataService;
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

        if(this.isDraggable == 'y'){
	      map.addEventListener('drag', function(ev) {
			    marker.setPosition(map.getCenter());


			  }, false);

        map.addEventListener('dragend', function(ev) {
          var coords = map.getCenter();
			    marker.setPosition(coords);

          apiLocal.getReverseGeocode(map.getCenter()).subscribe((data) => {
            var label = data['Response']['View'][0]['Result'][0]['Location']['Address']['Label'];
            if(ds.getLocType() == 'p'){
              ds.savePickupLocation(coords);
              ds.savePickupLocationLabel(label);
            }else if(ds.getLocType() == 'd'){
              ds.saveDropLocation(coords);
              ds.saveDropLocationLabel(label);
            }
          })
			  }, false);


}

	  }


}
