import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyButtonsComponent } from './my-buttons.component';

describe('MyButtonsComponent', () => {
  let component: MyButtonsComponent;
  let fixture: ComponentFixture<MyButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
