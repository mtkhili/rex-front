import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const url = 'http://explorenb.local:81';
const authurl = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})

export class GeneralServiceService {

  mapUrl : any;
  mapData : any;
  eventData : any;
  
  constructor(private http: HttpClient) { }

  getUrl(){
    return url;
  }

  setMapUrl(url){
    this.mapUrl = url;
  }

  getMapUrl(){
    return this.mapUrl;
  }

  setMapDataObject(data){
    this.mapData = data;
  }

  getMapDataObject(){
    return this.mapData;
  }
 
  setEventDataObject(data){
    this.eventData = data;
  }

  getEventDataObject(){
    return this.eventData;
  }
 
  getData() {
    return this.http.get(url+'/select');
  }

  getMapData(parameters){
    return this.http.get(url+'/evenements/'+parameters);
  }

  getEventData(id){
    return this.http.get(url+'/evenements/'+id);
  }

  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(authurl + 'auth/register',
      {fName: fName, lName: lName, email: email, password: password}
    )
  }
}
