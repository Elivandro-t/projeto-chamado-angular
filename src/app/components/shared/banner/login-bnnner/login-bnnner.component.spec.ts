import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBnnnerComponent } from './login-bnnner.component';

describe('LoginBnnnerComponent', () => {
  let component: LoginBnnnerComponent;
  let fixture: ComponentFixture<LoginBnnnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBnnnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBnnnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
