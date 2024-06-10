/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAuthService } from '../../../core/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn:"root"
})
export class AlterarService{
     api=environment.apiUrl;
     constructor(private http: HttpClient,private User: UserAuthService){}
     newPasswd(password: any,newPasswd: any): Observable<any>{
       const data={
            id:this.User.getId(),
            password:password,
            newPassword:newPasswd
        };
        console.log(data);
        return this.http.put<any>(`${this.api}/alterar/password`,data).pipe();
     }
}