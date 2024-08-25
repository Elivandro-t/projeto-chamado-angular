/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, Input } from "@angular/core";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

@Component(
    {
        selector:"app-loading",
        standalone:true,
        templateUrl:'./loading.component.html',
        styleUrl:"./loading.component.scss",
        imports:[MatProgressSpinnerModule,MatCardModule,MatDialogModule]
    }
)
export class Loading {
   @Input() ativo =  false;
}