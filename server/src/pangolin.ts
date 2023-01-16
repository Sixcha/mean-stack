import * as mongodb from "mongodb"

export interface Pangolin{
    id?:mongodb.ObjectId;
    username:string;
    role:"Guerrier" | "Alchimiste" | "Sorcier" | "Espions" | "Enchanteur";
    level:number;
}