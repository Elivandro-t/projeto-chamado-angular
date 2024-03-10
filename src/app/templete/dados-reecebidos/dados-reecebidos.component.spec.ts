import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosReecebidosComponent } from './dados-reecebidos.component';

describe('DadosReecebidosComponent', () => {
  let component: DadosReecebidosComponent;
  let fixture: ComponentFixture<DadosReecebidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosReecebidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosReecebidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
