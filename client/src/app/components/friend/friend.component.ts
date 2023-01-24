import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { Pangolin } from 'src/app/pangolin';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent {
  @Input() friend:Pangolin;
  @Output() removeFriend: EventEmitter<Pangolin> = new EventEmitter()

  onClick(pangolin:Pangolin){
    this.removeFriend.emit(pangolin);
  }
}
