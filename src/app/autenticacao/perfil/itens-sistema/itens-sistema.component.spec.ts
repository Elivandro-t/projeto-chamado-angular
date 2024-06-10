import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensSistemaComponent } from './itens-sistema.component';

describe('ItensSistemaComponent', () => {
  let component: ItensSistemaComponent;
  let fixture: ComponentFixture<ItensSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensSistemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItensSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
