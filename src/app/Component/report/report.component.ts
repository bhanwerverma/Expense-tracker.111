import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [NgClass, NgFor, NgChartsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  reportData: any[] = [];
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';

  barChartLabels: string[] = [];
  barChartData: any[] = [];
  barChartType: ChartType = 'bar';

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getBudgets().subscribe(budgets => {
      console.log('Budget:',budgets)
      this.reportService.getExpenses().subscribe(expenses => {
        console.log('Expense',expenses);
        
        // Table data
        this.reportData = budgets.map(budget => {
          const spent = expenses
            .filter(e => e.Category === budget.Category)
            .reduce((sum, e) => sum + Number(e.Amount), 0);
          return {
            category: budget.Category,
            spent,
            budget: budget.amount,
            remaining: (budget.amount ?? 0) - spent,
          };
        });

        // Pie chart data (expenses by category)
        this.pieChartLabels = this.reportData.map(item => item.category);
        this.pieChartData = this.reportData.map(item => item.spent);

        // Bar chart data (example: spent per category)
        this.barChartLabels = this.reportData.map(item => item.category);
        this.barChartData = [
          { data: this.reportData.map(item => item.spent), label: 'Spent' },
          { data: this.reportData.map(item => item.budget), label: 'Budget' }
        ];
      });
    });
  }
}