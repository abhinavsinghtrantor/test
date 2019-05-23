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
}
