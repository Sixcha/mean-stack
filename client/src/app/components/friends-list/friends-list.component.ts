import { Component,Input,OnInit } from '@angular/core';
import { PangolinService } from 'src/app/services/pangolin.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  private cookiePlaceHolder:string ="63c5b3c3dc3f21f0aad6b72b"
  playerFriends:any;

  constructor(private pangolinService:PangolinService){ }

  ngOnInit():void{
    this.pangolinService.getFriends(this.cookiePlaceHolder).subscribe((friends) => this.playerFriends = friends)
  }

}
