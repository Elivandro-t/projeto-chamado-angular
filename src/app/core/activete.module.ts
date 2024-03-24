import { NgModule } from "@angular/core";
import { Appname } from "./activ.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[Appname],
    imports:[CommonModule],
    exports:[Appname],

})
export class AcitiveModule{}