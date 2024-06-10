/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit {
  constructor(private http: HttpClient){}
dados!: any;
name!: string;
  ngOnInit(): void {
   this.createChart(this.data);
   this.pegarApi().subscribe(e=>{
    this.dados  = e;
    console.log(e.map(e=>e.servico));
   });
  }
 
  pegarApi(): Observable<any[]>{
   return this.http.get<any[]>("http://localhost:8080/setor/lista");
  }
  data = [
    {"setor": "", "patrimonio": "123", "mac": "XYZ", "totalChamados": 10, "data": "2024-03-01"},
  ];
  chart: any;
  createChart(data: any[]): void {
    const labels = data.map(item => item.setor);
    

    const values = data.map(item => item.totalChamados);
    const ctx = document.getElementById('myChart');
    this.chart = new Chart(ctx as any, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'chamados recebidos',
          data:values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
