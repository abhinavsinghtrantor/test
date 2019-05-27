declare var platform : any;
declare var H : any;
declare var calculateRouteFromAtoB: any;

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ride-wait',
  templateUrl: './ride-wait.component.html',
  styleUrls: ['./ride-wait.component.scss'],
})
export class RideWaitComponent implements OnInit {
@ViewChild("map")
    public mapElement: ElementRef;

  constructor(private _elementRef : ElementRef, private api: ApiService) { }
  isRideArrived: boolean;

  ngOnInit() {
  	 this.isRideArrived = false;
     
  }

  getRideStatus(){
  setTimeout(() => {
      this.api.getRideDetails('req001').then(function(data){
        if(data.isArrived == 'n'){
          this.getRideStatus();
        }
      })
     }, 5000);
  }

  ngAfterViewInit() {
    setTimeout(() => {this.renderMap()}, 1000)
  }

  renderMap(){
var mapContainer = document.getElementById('map');
  

var platform = new H.service.Platform({
  app_id: 'wfqO2AYhfdblte3PW3LZ',
  app_code: 'YAg7VwUeOmV1idPCIZUlIw',
});

var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

var coords = JSON.parse(sessionStorage['pickupCoords']);

var map = new H.Map(this.mapElement.nativeElement,
  defaultLayers.normal.map,{
  center: coords,
  zoom: 12,
  pixelRatio: pixelRatio
});

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);


// Now use the map as required...
 var pickup = JSON.parse(sessionStorage['pickupCoords']);
 var drop = this.api.getRideLocation();



calculateRouteFromAtoB (platform, map, pickup, drop);
var z = {"lat": 30.62765595299834, "lng":76.78081620635987};
//setTimeout(() => {calculateRouteFromAtoB (platform, map, pickup, z)}, 5000)

}

}
