import { Component, Output, EventEmitter } from '@angular/core';
import { UserInterface } from '../../../../../server/src/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() onLogIn: EventEmitter<UserInterface> = new EventEmitter()
  username: string;
  password: string;

  onSubmit(){
    if(!this.username){
      alert("Enter a username")
      return
    }
    
    if (!this.password){
      alert("Enter a password")
      return
    }

    let newPassword = this.escapeHtml(this.password)

    const user:UserInterface = {
      username: this.username,
      password: newPassword
    }

    this.onLogIn.emit(user);

    this.username = "";
    this.password = ""
  }

  escapeHtml(text:any) {
    let map:any = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m:any) { return map[m]; });
  }

}
