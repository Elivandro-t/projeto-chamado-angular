import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CardsButtonComponent } from "./cards-button.component"

describe('shoult test component card-botton',()=>{
  let fixture:ComponentFixture<CardsButtonComponent>;
  let component:CardsButtonComponent;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[CardsButtonComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CardsButtonComponent);
    component=fixture.componentInstance;
  })
  it('create test componet card-button ',()=>{
    expect(component).toBeTruthy();
  });
  it('should test component card',()=>{
    const src = "assets/pc.png";
    let element:HTMLElement = fixture.elementRef.nativeElement.querySelector('app-my-buttons');
    expect(element.getAttribute('src')).toBe(src)
  })

})