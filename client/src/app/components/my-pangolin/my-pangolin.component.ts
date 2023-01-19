import { Component,OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { Pangolin } from 'src/app/pangolin';
import { PangolinService } from 'src/app/services/pangolin.service';

@Component({
  selector: 'app-my-pangolin',
  templateUrl: './my-pangolin.component.html',
  styleUrls: ['./my-pangolin.component.scss']
})
export class MyPangolinComponent implements OnInit {
  private cookiePlaceHolder:string = "63c5b3c3dc3f21f0aad6b72b"
  playerPangolin:Pangolin;
  imagePath:string;


  constructor(private pangolinService:PangolinService){ }

  ngOnInit(): void {
      if (this.cookiePlaceHolder){
        this.pangolinService.getPangolin(this.cookiePlaceHolder).subscribe((pangolin) => (this.playerPangolin = pangolin))
      }
  }

}
