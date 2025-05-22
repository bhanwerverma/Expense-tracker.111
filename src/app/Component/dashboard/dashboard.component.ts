import { NgFor, NgIf } from '@angular/common';
import { Component, numberAttribute, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { Transaction } from '../Transaction.model';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, ReactiveFormsModule, NgFor, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  User = new FormGroup({
    Amount: new FormControl(''),
    Type: new FormControl(''),
    Description: new FormControl(''),
    Category: new FormControl(''),
    DateTime: new FormControl(''),
  });
  Model: boolean = false;

  Open() {
    this.Model = true;
    console.log('open working');
  }
  Close() {
    this.Model = false;
  }
  constructor(private Tracsactionservice: TransactionService) {}

  onsubmit() {
    const rawValue = this.User.value;
    const addTransaction: Transaction = {
      Amount: rawValue.Amount ?? '',
      Type: rawValue.Type ?? '',
      Description: rawValue.Description ?? '',
      Category: rawValue.Category ?? '',
      DateTime: rawValue.DateTime ?? '',
    };
    this.Tracsactionservice.AddTransaction(addTransaction).subscribe((res) => {
      console.log(res);
    });
    this.LoadTransaction();
    this.User.reset();
    this.Close();
  }
  Expense: Transaction[] = [];
  FoodDrinksAmount: number = 0;
  Bills: number = 0;
  EntertainmentAmount: number = 0;
  ngOnInit(): void {
    this.LoadTransaction();
  }
  LoadTransaction() {
    this.Tracsactionservice.GetTransaction().subscribe((data) => {
      this.Expense = data;
      this.TotalAmountOfFoodAndDrinks();
      this.TotalAmountBill();
      this.TotalAmountEntertainment();
      this.graph();
    });
  }
  TotalAmountOfFoodAndDrinks() {
    this.FoodDrinksAmount = this.Expense.filter(
      (t) => t.Type === 'Debit' && t.Category === 'Food & Dinning'
    ).reduce((sum, t) => sum + Number(t.Amount), 0);
  }
  TotalAmountBill() {
    this.Bills = this.Expense.filter(
      (t) =>
        t.Type.trim().toLowerCase() === 'debit' &&
        t.Category.trim().toLowerCase() === 'bills & subscriptions'
    ).reduce((sum, t) => sum + Number(t.Amount), 0);
  }
  TotalAmountEntertainment() {
    this.EntertainmentAmount = this.Expense.filter(
      (t) =>
        t.Type.trim().toLocaleLowerCase() === 'debit' &&
        t.Category.trim().toLocaleLowerCase() === 'entertainment'
    ).reduce((sum, t) => sum + Number(t.Amount), 0);
  }

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';

  graph() {
    const categoryMap: { [Key: string]: number } = {};

    this.Expense.forEach((t) => {
      if (t.Type === 'Debit') {
        categoryMap[t.Category] =
          (categoryMap[t.Category] || 0) + Number(t.Amount);
      } else if (t.Type === 'Credit') {
        categoryMap[t.Category] =
          (categoryMap[t.Category] || 0) - Number(t.Amount);
      }
    });
    this.pieChartLabels = Object.keys(categoryMap);
    this.pieChartData = Object.values(categoryMap);
  }
}
