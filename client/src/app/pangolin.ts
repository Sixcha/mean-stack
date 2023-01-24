export interface Pangolin {
    _id?:string;
    username:string;
    role:"Guerrier" | "Alchimiste" | "Sorcier" | "Espion" | "Enchanteur";
    level:number;
}
