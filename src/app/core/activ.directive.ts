import { Component, Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
   selector:"[appname]",

})
export class Appname{
    @Output() appname: EventEmitter<any> = new EventEmitter<any>();
    @HostListener('click',['$event'])
    public valie(event:Event){
        return this.appname.emit(event);
    }
}