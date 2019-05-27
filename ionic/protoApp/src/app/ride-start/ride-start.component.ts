declare var platform : any;
declare var H : any;
declare var calculateRouteFromAtoB: any;

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ride-start',
  templateUrl: './ride-start.component.html',
  styleUrls: ['./ride-start.component.scss'],
})
export class RideStartComponent implements OnInit {

@ViewChild("map") public mapElement: ElementRef;

  constructor(private _elementRef : ElementRef) { }

  plat: any;
  mp: any;
  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {this.renderMap()}, 1000)
  }



renderMap(){
var mapContainer = document.getElementById('map');
  
var platform = new H.service.Platform({
  app_id: 'wfqO2AYhfdblte3PW3LZ',
  app_code: 'YAg7VwUeOmV1idPCIZUlIw',
});
this.plat = platform;

var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});
var coords = JSON.parse(sessionStorage['pickupCoords']);

var svgMarkup = '<svg width="18" height="18" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="8" cy="8" r="8" ' +
      'fill="#1b468d" stroke="white" stroke-width="1"  />' +
    '</svg>';
    var dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}});
    var marker =  new H.map.Marker({
        lat: coords.lat,
        lng: coords.lng} ,
        {icon: dotIcon});
    



var map = new H.Map(this.mapElement.nativeElement,
  defaultLayers.normal.traffic,{
  center: coords,
  zoom: 14,
  pixelRatio: pixelRatio
});

map.addObject(marker);

this.mp = map;


var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);



}

showRestaurents(){
  var search = new H.places.Search(this.plat.getPlacesService()), searchResult, error;
  var coords = JSON.parse(sessionStorage['pickupCoords']);

var params = {
    // Plain text search for places with the word "hotel"
    // associated with them:
      'q': 'restaurent',
    //  Search in the Chinatown district in San Francisco:
      'at': coords.lat+','+coords.lng
    };

    var group = new H.map.Group();

    search.request(params, {}, function(result){
        group.addObjects(result.results.items.map(function (place) {
        debugger;
        var marker = new H.map.Marker({lat: place.position[0],
          lng: place.position[1]})
        return marker;
        }));
      }, function(error){}
     );

     this.mp.addObject(group);
}


}
