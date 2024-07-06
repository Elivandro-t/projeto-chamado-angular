/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";

const key = "acesstoken";
const keyrefresh = "refreshtoken";
const image = "image";

@Injectable({
    providedIn: 'root'
})
export class Auth {

    recebiToken(token: string, refreshtoken: string) {
        localStorage.setItem(key, token);
        localStorage.setItem(keyrefresh, refreshtoken);
    }
    Removeimage() {

        return localStorage.removeItem(image);

    }
    setImage() {

        return localStorage.setItem("image",image);

    }
    RemoveToken() {

        return localStorage.removeItem(key);

    }
    RemoveRefreshToken() {

        return localStorage.removeItem(keyrefresh);

    }
    returnRefreshToken() {
        if (typeof localStorage !== "undefined") {
            return localStorage.getItem(keyrefresh);
        }
        return;
    }
    returnToken() {
        if (typeof localStorage !== "undefined") {
            return localStorage.getItem(key);
        }
        return;
    }
    PossuiToken() {

        return this.returnToken() ? true : false;

    }
}