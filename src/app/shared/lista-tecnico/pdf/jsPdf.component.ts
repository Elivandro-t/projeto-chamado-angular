/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, EventEmitter, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector:"app-pdf",
    standalone:true,
    imports:[MatButtonModule],
    templateUrl:"./jfPdf.component.html",
    styleUrl:"./jfPdf.component.scss"
})
export class JspdfComponent{
    @Output() pdf = new EventEmitter();

    hendlepdf(){
        this.pdf.emit();
    }

}