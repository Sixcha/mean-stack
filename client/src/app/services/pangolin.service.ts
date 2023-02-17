import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pangolin } from '../pangolin';
import { Friendship } from '../friendship';
import { UserInterface } from '../../../../server/src/user';

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

  getPangolinByName(name:string){
    return this.httpClient.get<Pangolin>(`${this.url}/${name}`);
  }

  createPangolin(pangolin:Pangolin):Observable<Pangolin>{
    return this.httpClient.post<Pangolin>(this.url,pangolin);
  }

  updatePangolin(id:string | undefined, pangolin:Pangolin){
    return this.httpClient.put(`${this.url}/${id}`,pangolin, {responseType:'text'});
  }

  deletePangolin(id:string):Observable<Pangolin>{
    return this.httpClient.delete<Pangolin>(`${this.url}/${id}`);
  }

  getFriends(id:string):Observable<any>{
    return this.httpClient.get(`${this.url}/friends/${id}`)
  }

  addFriend(friendship:Friendship){
    return this.httpClient.post(`${this.url}/friends`, friendship, {responseType:'text'})
  }

  removeFriend(id:string, friend:Pangolin){
    return this.httpClient.delete(`${this.url}/friends/${id}/${friend._id}`,{responseType:'text'})
  }

  addUser(user:UserInterface){
    return this.httpClient.post(`${this.url}/register`, user, {responseType:'text'} )
  }

  connect(user:UserInterface){
    return this.httpClient.post(`${this.url}/authenticate`, user, {responseType:'json'})
  }
}
