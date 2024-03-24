import {ComponentFixture, TestBed } from "@angular/core/testing";
import { ListaChamadoComponent } from "./lista-chamado.component";
import { HttpClientModule } from "@angular/common/http";
import { NativeDateModule } from "@angular/material/core";
import e from "express";

describe(ListaChamadoComponent.name,()=>{
  let fixture:ComponentFixture<ListaChamadoComponent>;
  let component:ListaChamadoComponent;
  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,NativeDateModule],
      providers:[],
    }).compileComponents();
    fixture = TestBed.createComponent(ListaChamadoComponent);
    component = fixture.componentInstance;
  });

  it('should create component in test',()=>[
     expect(component).toBeTruthy()
  ]);
  // it('should test component list-chamado',done=>{
  //   spyOn(component.PegesUpdate,'emit')
  //   fixture.detectChanges();
  //   component.PegesUpdate.subscribe(()=>{
  //     component.totalPages++;
  //     fixture.detectChanges();
  //     const countElement:HTMLElement = fixture.nativeElement.querySelector('.titulo');
  //     expect(countElement.textContent?.trim).toBe('1')
  //     done();
  //   });
  //   const like:HTMLElement = fixture.nativeElement.querySelector('.button-paginator')
  //   like.click();
  //   done();

  // });
  // it('should create test event',()=>{
  //   component.PegesUpdate.subscribe(done=>{
  //     fixture.detectChanges();
  //     component.totalPages++;
  //     fixture.detectChanges();
  //     const element:HTMLElement = fixture.nativeElement.querySelector('titulo');
  //     expect(element.textContent?.trim()).toBe('1')
  //     done();

  //   })
  //   const element:HTMLElement = fixture.nativeElement.querySelector('.titulo');
  //   const event = new KeyboardEvent('keyup',{key:'Enter'});
  //   element.dispatchEvent(event);
  // })

})