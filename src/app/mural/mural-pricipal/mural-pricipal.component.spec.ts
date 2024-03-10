import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuralPricipalComponent } from './mural-pricipal.component';

describe('MuralPricipalComponent', () => {
  let component: MuralPricipalComponent;
  let fixture: ComponentFixture<MuralPricipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuralPricipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuralPricipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
