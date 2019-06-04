import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

const url = 'http://explorenb.local:81';
const authurl = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})

export class GeneralServiceService {

  mapUrl : any;
  mapData : any;
  eventData : any;
  isLoggedIn = false;
  token:any;
  
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
  ) { }

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
    return this.http.get(url + '/select');
  }

  getCountry() {
    return this.http.get(url + '/pays');
  }

  getProvince(idPays) {
    return this.http.get(url + '/getprovinces/' + idPays);
  }

  getMapData(parameters){
    return this.http.get(url + '/evenements/' + parameters);
  }

  getEventData(id){
    return this.http.get(url + '/evenements/' + id);
  }

  login(email: String, password: String){
    return this.http.post(authurl + '/auth/login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(authurl + '/auth/register',
      {nom: fName, prenom: lName, email: email, password: password}
    )
  }
}
