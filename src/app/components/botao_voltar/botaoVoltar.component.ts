import { Component} from "@angular/core";
import { NavigatoService } from "./navigator.service";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-back-button',
    standalone:true,
    imports:[MatIcon,MatButtonModule],
    templateUrl:"./botaoVoltar.component.html",
    styleUrl:'./botaoVoltar.component.scss'
})
export class BotaoBackComponent{
    constructor(private location: NavigatoService) {
       
    }
    goBack(){
        this.location.goBack();

    }

}