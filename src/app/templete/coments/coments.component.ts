import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommetService } from '../../core/commet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coments',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './coments.component.html',
  styleUrl: './coments.component.scss'
})
export class ComentsComponent implements OnInit{
  @ViewChild('commentsContainer') private commentsContainer!: ElementRef;
  form!:FormGroup;
  cooments:string[]=[];
  constructor(public Formb:FormBuilder){}
  ngOnInit(): void {
   this.form = this.Formb.group({
    commets:['']
   })
  }
   enviar(){
     const comment = this.form.get('commets')!.value
      this.cooments.push(comment)
      this.form.reset();
      setTimeout(() => {
        this.commentsContainer.nativeElement.scrollTop = this.commentsContainer.nativeElement.scrollHeight+5;
      });
   }
}
