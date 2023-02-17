import { Component,Input,OnInit } from '@angular/core';
import { PangolinService } from 'src/app/services/pangolin.service';
import { CookieService } from 'ngx-cookie-service';
import { Friendship } from 'src/app/friendship';
import { Pangolin } from 'src/app/pangolin';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  cookie:string;
  playerFriends:Pangolin[];
  friendName:string;

  constructor(private pangolinService:PangolinService, private cookieService: CookieService){
    this.cookie = this.cookieService.get('user')
  }

  ngOnInit():void{
    this.pangolinService.getFriends(this.cookie).subscribe((users) => (this.playerFriends = users))
  }

  onSubmit(){
    if(!this.friendName){
      alert("No Username Given!")
      return
    }
    

    this.pangolinService.getPangolinByName(this.friendName).subscribe((pangolin) => {let newFriendship = {
      user: this.cookie,
      friend: pangolin._id
    }; this.addFriend(pangolin,newFriendship)} )

    this.friendName="";
  }

  addFriend(pangolin:Pangolin, newFriend:Friendship){
    this.pangolinService.addFriend(newFriend).subscribe(() => (this.playerFriends.push(pangolin)))
  }

  deleteFriend(userId:string, friend:Pangolin){
    this.pangolinService.removeFriend(userId,friend).subscribe(() => (this.playerFriends = this.playerFriends.filter((elem) => elem._id !== friend._id)))
  }

}
