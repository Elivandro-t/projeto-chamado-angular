import { data } from './../../core/data';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-graficopizza',
  standalone: true,
  imports: [],
  templateUrl: './graficopizza.component.html',
  styleUrl: './graficopizza.component.scss'
})
export class GraficopizzaComponent implements OnInit{
  data = [
    {"setor": "Setor A", "patrimonio": "123", "mac": "XYZ", "totalChamados": 10, "data": "2024-03-01"},
    {"setor": "Setor B", "patrimonio": "456", "mac": "ABC", "totalChamados": 15, "data": "2024-03-02"},
    {"setor": "Setor A", "patrimonio": "789", "mac": "DEF", "totalChamados": 20, "data": "2024-03-03"},
  ]
  ngOnInit(): void {
    this.createChart(this.data);
  }
  chart:any;
  createChart(data:any[]): void {
    const ctx = document.getElementById('pieChart');
    const label = data.map(e=>e.setor)
    const value = data.map(e=>e.totalChamados)
    this.chart = new Chart(ctx as any, {
      type:"pie",
      data: {
        labels: label,
        datasets: [{
          label: "total de itens chamados",
          data: value,
          backgroundColor: [
            'red',
            'green',
            'yellow',
            'orange',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
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
