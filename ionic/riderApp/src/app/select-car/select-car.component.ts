declare var platform : any;
declare var H : any;
declare var calculateRouteFromAtoB: any;

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-select-car',
  templateUrl: './select-car.component.html',
  styleUrls: ['./select-car.component.scss'],
})
export class SelectCarComponent implements OnInit {

  constructor(private api: ApiService) { }

  isDrag: string;
  rideOptions: any;
  carId: string;

  ngOnInit() {
  	this.isDrag = 'n';
  	this.rideOptions = [{id: "c1",type: 'Mini', fare: 'Rs. 250'}, {id: "c2", type: 'Prime', fare: 'Rs. 350'}]
  	setTimeout(() => {this.renderMap()}, 1000)
  }

  selectRide(id){
  this.carId = id;
  	console.log(id)
  }

  

renderMap(){
var mapContainer = document.getElementById('map');
  

var platform = new H.service.Platform({
  app_id: 'wfqO2AYhfdblte3PW3LZ',
  app_code: 'YAg7VwUeOmV1idPCIZUlIw',
  useHTTPS: true
});

var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

var coords = JSON.parse(sessionStorage['pickupCoords']);

var map = new H.Map(mapContainer,
  defaultLayers.normal.map,{
  center: coords,
  zoom: 12,
  pixelRatio: pixelRatio
});

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);


// Now use the map as required...
 var pickup = JSON.parse(sessionStorage['pickupCoords']);
 var drop = JSON.parse(sessionStorage['dropCoords']);

calculateRouteFromAtoB (platform, map, pickup, drop);



}

}
