const bcrypt = require('bcryptjs');
const config = require('./config')
import * as mongodb from "mongodb"
import { UserInterface } from "./user";
import { PangolinService } from "../../client/src/app/services/pangolin.service"


export class User implements UserInterface{
    public username:string;
    public password:string;
    private pangolinService:PangolinService;

    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }

    addUser(newUser:User){
        bcrypt.genSalt(10, (err:any, salt:any) => {
            bcrypt.hash(newUser.password, salt, (err:any, hash:any) => {
                if(err) throw err;
                newUser.password = hash;
                let newUserSmall:UserInterface = {
                    username: newUser.username,
                    password: newUser.password
                }
                this.pangolinService.addUser(newUserSmall)
            })
        })
    }

    comparePassword(password:string, hash:string, callback:Function){
        bcrypt.compare(password,hash,(err:any, isMatch:any) => {
            if (err) throw err;
            callback(null,isMatch)
        })
    }

}