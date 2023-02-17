import { Component,OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { Pangolin } from 'src/app/pangolin';
import { PangolinService } from 'src/app/services/pangolin.service';
import { CookieService } from 'ngx-cookie-service';
import  roles from '../../roles.json'

@Component({
  selector: 'app-my-pangolin',
  templateUrl: './my-pangolin.component.html',
  styleUrls: ['./my-pangolin.component.scss']
})
export class MyPangolinComponent implements OnInit {
  private cookie:string;
  playerPangolin:Pangolin;
  imagePath:string;
  showRoles:boolean = false;
  roles:any = Object.values(roles)

  constructor(private pangolinService:PangolinService, private cookieService: CookieService){
    this.cookie = this.cookieService.get('user')
  }

  ngOnInit(): void {
      if (this.cookie){
        this.pangolinService.getPangolin(this.cookie).subscribe((pangolin) => (this.playerPangolin = pangolin))
      }
  }

  changeRole(pangolin:Pangolin, role:"Guerrier" | "Alchimiste" | "Sorcier" | "Espion" | "Enchanteur"){
    pangolin.role = role
    this.pangolinService.updatePangolin(pangolin._id, pangolin).subscribe()
  }

  onClick(){
    this.showRoles=!this.showRoles;
  }

}
