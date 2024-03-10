import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficopizzaComponent } from './graficopizza.component';

describe('GraficopizzaComponent', () => {
  let component: GraficopizzaComponent;
  let fixture: ComponentFixture<GraficopizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficopizzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficopizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
