import { Component } from '@angular/core';
import { UserInterface } from '../../../../../server/src/user';
import { PangolinService } from 'src/app/services/pangolin.service';
import { CookieService } from 'ngx-cookie-service';
import { cookieResult } from 'src/app/cookieresult';
const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedIn:boolean;
  cookie:string;

  constructor(private pangolinService: PangolinService, private cookieService: CookieService){
    this.cookie = this.cookieService.get('user')
    if (this.cookie)
    this.loggedIn = true
  }

  signUp(newUser:UserInterface){
    bcrypt.genSalt(10, (err:any, salt:any) => {
        bcrypt.hash(newUser.password, salt, (err:any, hash:any) => {
            if(err) throw err;
            newUser.password = hash;
            this.pangolinService.addUser(newUser).subscribe()
        })
    })
}

  logIn(user:UserInterface){
    this.pangolinService.connect(user).subscribe((result:any) => {this.cookie=result.cookie; this.cookieService.set('user',this.cookie); if(this.cookie) this.loggedIn=true; window.location.reload()})
  }

  disconnect(){
    this.cookie = ""
    this.loggedIn = false
    this.cookieService.delete('user')
    window.location.reload()
  }

}
