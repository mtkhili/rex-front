import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  url = 'http://explorenb.local:81';
 
  constructor(private http: HttpClient) { }
 
  getAmbiances() {
    return this.http.get(this.url+'/select');
  }
}
