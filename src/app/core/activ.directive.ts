/* eslint-disable @angular-eslint/directive-selector */
import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
   selector:"[EventClick]",

})
export class ActionDirective{
    @Output() EventClick: EventEmitter<Event> = new EventEmitter();
    @HostListener('click',['$event'])
    public handleClick(event: Event){
         this.EventClick.emit(event);
    }
    @HostListener('keyup',['$event'])
    hendleKeyUp(event: KeyboardEvent): void{
           this.EventClick.emit(event);
    }
}