import './polyfills.server.mjs';
import{d as h}from"./chunk-5XOWGK4W.mjs";import{a as b,d as R}from"./chunk-56KTQCKC.mjs";import{Ka as A,La as E,Na as I,Oa as O,Pa as H,Ta as g,Va as z,Xa as U}from"./chunk-2JZHARYX.mjs";import{$a as l,L as u,O as n,Oc as j,Qc as w,Sb as y,Tc as D,U as a,Za as m,_a as c,k as C,mc as M,oc as S,pc as F,qc as T,sb as d,u as k,vc as B,xb as x,xc as P,yb as s}from"./chunk-FTIY6OAY.mjs";var $=(()=>{let t=class t{constructor(){this.title="projetoCd116Frontend"}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=a({type:t,selectors:[["app-root"]],standalone:!0,features:[x([]),s],decls:3,vars:0,template:function(o,p){o&1&&l(0,"app-figure")(1,"router-outlet")(2,"app-rodape")},dependencies:[j,h,g,E],styles:["body[_ngcontent-%COMP%]{max-height:900px}"]});let e=t;return e})();var L=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=a({type:t,selectors:[["app-error"]],standalone:!0,features:[s],decls:3,vars:0,consts:[[1,"imgs"],["src","assets/banner404.png","alt","banner 404",1,"img"]],template:function(o,p){o&1&&(m(0,"app-mural-pricipal")(1,"figure",0),l(2,"img",1),c()())},dependencies:[z],styles:[".imgs[_ngcontent-%COMP%]{width:100%;margin:0%;padding:0}.imgs[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]{width:100%;height:50rem}"]});let e=t;return e})();var N=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=a({type:t,selectors:[["app-relatorio"]],standalone:!0,features:[s],decls:2,vars:0,template:function(o,p){o&1&&(m(0,"p"),d(1,"relatorio works!"),c())}});let e=t;return e})();var G=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=a({type:t,selectors:[["app-about"]],standalone:!0,features:[s],decls:2,vars:0,template:function(o,p){o&1&&(m(0,"div"),d(1,"tela about"),c())}});let e=t;return e})();var J=[{path:"",pathMatch:"full",redirectTo:"/cards"},{path:"",loadChildren:()=>import("./chunk-YXPHJH6N.mjs").then(e=>e.routes)},{path:"relatorio",component:N},{path:"about",component:G},{path:"**",component:L}];var K=(()=>{let t=class t{constructor(i){this._snackBar=i,this.horizontalPosition="start",this.verticalPosition="bottom"}openSnackBar(i){this._snackBar.open(i,"x",{duration:3e3,horizontalPosition:this.horizontalPosition,verticalPosition:this.verticalPosition})}};t.\u0275fac=function(o){return new(o||t)(n(A))},t.\u0275prov=u({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var Q=(()=>{let t=class t{constructor(i,o,p,r,v,X){this.snackBar=i,this.auth=o,this.authApi=p,this.router=r,this.User=v,this.dialog=X}intercept(i,o){let p=this.auth.returnRefreshToken()??"";return this.auth.PossuiToken()&&!i.url.includes("/refreshToken")&&(i=i.clone({setHeaders:{Authorization:`Bearer ${this.auth.returnToken()}`}})),o.handle(i).pipe(k(r=>(r.status===500&&confirm("Sess\xE3o expirada! deseja continuar?")&&this.authApi.$refreshtoken.next(!0),r.status===401&&(this.router.navigate(["/auth/login"]),this.auth.RemoveToken(),this.auth.RemoveRefreshToken()),r.status===400&&this.snackBar.openSnackBar(r.error.msg),r.status===502&&this.snackBar.openSnackBar(r.message),r.status===501&&this.snackBar.openSnackBar("Erro 501 servi\xE7o em manuten\xE7\xE3o"),r.status===503&&this.snackBar.openSnackBar(r.message),C(void 0))))}};t.\u0275fac=function(o){return new(o||t)(n(K),n(I),n(H),n(w),n(O),n(U))},t.\u0275prov=u({token:t,factory:t.\u0275fac});let e=t;return e})();var V={providers:[{provide:M,useClass:Q,multi:!0},D(J),S(F(),T()),P(),b()]};var Z={providers:[R()]},W=y(V,Z);var q=()=>B($,W),Ut=q;export{Ut as a};