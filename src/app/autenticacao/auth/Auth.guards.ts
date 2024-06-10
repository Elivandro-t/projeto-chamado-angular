import { UserAuthService } from "../../core/user-auth.service";
import { inject } from '@angular/core';

export const authGua= ()=>{
  const token = inject(UserAuthService);
  if(!token.isLogout()){
    window.location.href = "/auth/login";
    return false;
  }else{
    return true;
  }
};