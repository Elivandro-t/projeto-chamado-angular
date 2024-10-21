import { Injectable } from "@angular/core";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Injectable({
    providedIn:"root"
})
export class SnackBar{
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar,private routes: Router) {}

  openSnackBar(msg: string) {
    this.routes.navigateByUrl(this.routes.url);
    this._snackBar.open(msg,undefined, {
        duration:3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }
}