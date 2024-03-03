import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsChamadosComponent } from './cards-chamados.component';

describe('CardsChamadosComponent', () => {
  let component: CardsChamadosComponent;
  let fixture: ComponentFixture<CardsChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsChamadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
