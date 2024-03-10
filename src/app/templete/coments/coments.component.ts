import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coments',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatButtonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './coments.component.html',
  styleUrl: './coments.component.scss'
})
export class ComentsComponent {

}
