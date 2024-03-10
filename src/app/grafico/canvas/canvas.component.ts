import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { GraficopizzaComponent } from '../../canvas/graficopizza/graficopizza.component';
@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [GraficopizzaComponent],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit {
  ngOnInit(): void {
   this.createChart(this.data)
  }
  data = [
    {"setor": "Setor A", "patrimonio": "123", "mac": "XYZ", "totalChamados": 10, "data": "2024-03-01"},
    {"setor": "Setor B", "patrimonio": "456", "mac": "ABC", "totalChamados": 15, "data": "2024-03-02"},
    {"setor": "Setor A", "patrimonio": "789", "mac": "DEF", "totalChamados": 20, "data": "2024-03-03"},
  ]
  chart: any;
  createChart(data:any[]): void {
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
