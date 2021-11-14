import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChargingStationsService {

  public _url = 'http://localhost:3000/posts/';

  constructor(private http : HttpClient) { }

  getCharginStations(){
    return this.http.get<any>(this._url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
