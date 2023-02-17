import { Component, Output, EventEmitter } from '@angular/core';
import { UserInterface } from '../../../../../server/src/user';
const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @Output() onSignUp: EventEmitter<UserInterface> = new EventEmitter()
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

    const newUser:UserInterface = {
      username: this.username,
      password: newPassword
    }

    this.onSignUp.emit(newUser);

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
