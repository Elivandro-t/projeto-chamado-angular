import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChamdoComponent } from './lista-chamdo.component';

describe('ListaChamdoComponent', () => {
  let component: ListaChamdoComponent;
  let fixture: ComponentFixture<ListaChamdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaChamdoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaChamdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
