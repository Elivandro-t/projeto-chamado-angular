/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ItensComponent } from '../itens/itens.component';
import { BotoesService } from '../../../core/botoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MuralComponent } from '../../../components/mural-secundary/mural.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { botoes } from '../../../core/types';
import { LoadingComponent } from '../../../components/loading/loading';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [MuralComponent,ItensComponent,MatProgressSpinnerModule,LoadingComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit{
 constructor(private Service: BotoesService,private route: ActivatedRoute,private natigate: Router){}
 itens!: any;
 data!: botoes;
  ngOnInit(): void {
    const idButoes = this.route.snapshot.paramMap.get("id") as any;
    this.Service.buscarItens(idButoes).subscribe(e=>{
      this.itens=e.options;
      console.log("itens: "+e.options);
      this.data=e;
    });
  }
  router(Event: number,Titulo: string,$index: any){
    if(Event===3){
      this.natigate.navigate([`reset/${Event}/serviços/${this.data.name}/${Titulo}/${$index}`]);
    }else if(Event===5){
      this.natigate.navigate([`compras`]);

    }
    else{
      this.natigate.navigate([`sistema/${Event}/serviços/${this.data.name}/${Titulo}/${$index}`]);
    }
  }

}
