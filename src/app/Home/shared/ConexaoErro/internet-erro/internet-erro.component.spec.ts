import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetErroComponent } from './internet-erro.component';

describe('InternetErroComponent', () => {
  let component: InternetErroComponent;
  let fixture: ComponentFixture<InternetErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetErroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
