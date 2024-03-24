import { data } from './data';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Appname } from "./activ.directive";
import { AcitiveModule } from "./activete.module";
import { exec } from "child_process";
import { Component, Pipe } from "@angular/core";

describe(Appname.name,()=>{
    let fixture:ComponentFixture<TestDirectComponent>;
    let component:TestDirectComponent;
    beforeEach(async()=>{
        await TestBed.configureTestingModule({
            declarations:[TestDirectComponent],
            imports:[AcitiveModule]
        }).compileComponents();
        fixture=TestBed.createComponent(TestDirectComponent);
        component=fixture.componentInstance;

    });
    it('test component Test',()=>{
        const divElement:HTMLElement = fixture.nativeElement.querySelector(".element");
        const event = new KeyboardEvent("keyup",{key:'Enter'})
        divElement.dispatchEvent(event)
        expect(component.testeBoolen()).toBe(true)
    })
    it('test component Test s',()=>{
        const divElement:HTMLElement = fixture.nativeElement.querySelector(".element");
        const event = new Event('click')
        divElement.dispatchEvent(event)
        expect(component.testeBoolen()).toBe(true)
    })

})
@Component({
    template:`<div class="element" (Appname)="testes($event)"></div>`
})
class TestDirectComponent{
    private event!:Event;
    testes(event:Event):void{
           this.event = event;
    }
   public testeBoolen():boolean{
       return !!this.event;
 }
}