import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaLoginAuthComponent } from './tela-login-auth.component';

describe('TelaLoginAuthComponent', () => {
  let component: TelaLoginAuthComponent;
  let fixture: ComponentFixture<TelaLoginAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaLoginAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaLoginAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
