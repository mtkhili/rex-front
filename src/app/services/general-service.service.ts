import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const url = 'http://explorenb.local:81';

@Injectable({
  providedIn: 'root'
})

export class GeneralServiceService {

  constructor(private http: HttpClient) { }
 
  getData() {
    return this.http.get(url+'/select');
  }

  getMapData(parameters){
    let params = new HttpParams();
    //params = params.append('eveneme', 'val1');
    return this.http.get(url+'/evenements', {params: params});
  }
}
