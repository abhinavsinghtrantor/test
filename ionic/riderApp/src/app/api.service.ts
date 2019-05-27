import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  localtionListAutocompleteApi(text){
    let url = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=wfqO2AYhfdblte3PW3LZ&app_code=YAg7VwUeOmV1idPCIZUlIw&query="+text

    return this.http.get(url);
  }

  getCoords(locationId){
    let url = "http://geocoder.api.here.com/6.2/geocode.json?locationid="+locationId+"&jsonattributes=1&gen=9&app_id=wfqO2AYhfdblte3PW3LZ&app_code=YAg7VwUeOmV1idPCIZUlIw";

    return this.http.get(url);
  }

  getReverseGeocode(coords){
    console.log(coords);
    let lat = coords.lat;
    let long = coords.lng;
    let prox = lat+'%2C'+long;
    let mode = 'retrieveAddresses';
    let maxresults = '1';
    let gen = '9';
    let url = "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox="+prox+"&mode=retrieveAddresses&maxresults=1&gen=9&app_id=wfqO2AYhfdblte3PW3LZ&app_code=YAg7VwUeOmV1idPCIZUlIw";

    return this.http.get(url);
  }

  getRideLocation(){
    let cabCoords = {"lat": 30.72765595299834, "lng":76.78081620635987};
    return cabCoords;
  }
}
