import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosTecnicosComponent } from './dados-tecnicos.component';

describe('DadosTecnicosComponent', () => {
  let component: DadosTecnicosComponent;
  let fixture: ComponentFixture<DadosTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosTecnicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
