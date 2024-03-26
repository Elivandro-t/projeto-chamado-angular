import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaDialogServiceComponent } from './alerta-dialog-service.component';

describe('AlertaDialogServiceComponent', () => {
  let component: AlertaDialogServiceComponent;
  let fixture: ComponentFixture<AlertaDialogServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaDialogServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertaDialogServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
