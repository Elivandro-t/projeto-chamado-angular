import { Injectable } from "@angular/core";

const key =  "acesstoken";
const keyrefresh =  "refreshtoken";
@Injectable({
  providedIn: 'root'
})
export class Auth {
    
    recebiToken(token: string,refreshtoken: string) {
            localStorage.setItem(key,token);
            localStorage.setItem(keyrefresh,refreshtoken);
    }
    RemoveToken() {
      
             return localStorage.removeItem(key);
      
    }
    RemoveRefreshToken() {
      
        return localStorage.removeItem(keyrefresh);
 
}
    returnRefreshToken() {
        if(typeof localStorage !=="undefined"){
            return localStorage.getItem(keyrefresh);
        }
        return;
    }
    returnToken() {
        if(typeof localStorage !=="undefined"){
            return localStorage.getItem(key);
        }
        return;
    }
    PossuiToken() {
       
            return this.returnToken()?true:false;
        
    }
}