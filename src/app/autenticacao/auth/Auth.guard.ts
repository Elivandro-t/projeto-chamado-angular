/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanActivateChildFn, Router } from '@angular/router';
import { UserAuthService } from "../../core/user-auth.service";
import { inject } from '@angular/core';
export const authGuard: CanActivateChildFn= (route)=>{
  const token = inject(UserAuthService);
  const routers  = inject(Router);
  if(!token.isLogout()){
    window.location.href ="/auth/login";
    return false;
  }else{
   
     const user = token.getRole() as unknown as any[];
    const ath = route.data['acess'] as string[];
  
    if(ath.some(role=>user.includes(role))){
      return true;
    
   }
    return false;
  }
};