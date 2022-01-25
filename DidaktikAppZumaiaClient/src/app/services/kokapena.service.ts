import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Kokapena } from '../interfaces/kokapena';

@Injectable({
  providedIn: 'root'
})
export class KokapenaService {
  private url = "http://192.168.73.58:8084/api/kokapenak"
  constructor(private http: HttpClient) { }

  getKokapenak():Observable<Kokapena[]>{
    return this.http.get<Kokapena[]>(this.url);
  }

  getKokapena(id: number): Observable<Kokapena[]> { 
    return this.http.get<Kokapena[]>(this.url + '/' + id); 
  }
}
