import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActionDirective } from "./activ.directive";
import { AcitiveModule } from "./activete.module";
import { Component} from "@angular/core";
describe(ActionDirective.name, () => {
    let figure: ComponentFixture<compileComponent>;
    let Component: compileComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations:[  compileComponent],
            imports: [AcitiveModule]
        }).compileComponents();
        figure = TestBed.createComponent(compileComponent);
        Component = figure.componentInstance;
        figure.detectChanges();
    });
    it("criando componte de test", done => {
        expect(Component).toBeTruthy();
        done();
    });
    it("validando funções click",()=>{
        const div: HTMLElement = figure.nativeElement.querySelector(".component");
        const event: Event = new Event("click");
        figure.detectChanges();
        div.dispatchEvent(event);
        expect(Component.hasEvent()).toBe(true);
    });
    it("validando funções keyup",()=>{
        const div: HTMLElement = figure.nativeElement.querySelector(".component");
        const event: Event = new KeyboardEvent('keyup',{key:'Enter'});
        figure.detectChanges();
        div.dispatchEvent(event);
        expect(Component.hasEvent()).toBe(true);
    });
});
@Component(
    {
        template: `<div class="component" (appname)="AcitonHendle($event)"></div>`
    }
)
class compileComponent {
    public events?: Event;
    public AcitonHendle(event: Event): void {
        this.events = event;
    }
    public hasEvent(): boolean {
        return !!this.events;
    }
}