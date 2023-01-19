import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pangolin } from '../pangolin';

@Injectable({
  providedIn: 'root'
})
export class PangolinService {
  private url:string = 'http://localhost:5200/pangolins'

  constructor(private httpClient: HttpClient) { }

  getPangolins(){

  }

  getPangolin(id:string):Observable<Pangolin>{
    return this.httpClient.get<Pangolin>(`${this.url}/user/${id}`);

  }

  createPangolin(pangolin:Pangolin):Observable<Pangolin>{
    return this.httpClient.post<Pangolin>(this.url,pangolin);
  }

  updatePangolin(id:string, pangolin:Pangolin):Observable<Pangolin>{
    return this.httpClient.put<Pangolin>(`${this.url}/${id}`,pangolin);
  }

  deletePangolin(id:string):Observable<Pangolin>{
    return this.httpClient.delete<Pangolin>(`${this.url}/${id}`);
  }

  getFriends(id:string):Observable<Object>{
    return this.httpClient.get(`${this.url}/friends/${id}`)
  }
}
