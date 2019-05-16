import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const url = 'http://explorenb.local:81';

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
}
