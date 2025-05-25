import { Component,  OnInit } from '@angular/core';
import { BudgetsService } from '../../service/budgets.service';
import { Budgets } from '../budgets.model';
import { Transaction } from '../Transaction.model';
import { HttpClient } from '@angular/common/http';

import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-budgets',
  standalone:true,
  imports: [NgClass,NgFor,FormsModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css',
})
export class BudgetsComponent implements OnInit {
  budgets: Budgets[] = [];
  newbudgets: Budgets = {  Category: '', amount: '' };
  expense: Transaction[] = [];
  remainingByCategory: { [category: string]: number } = {};

  constructor(
    private budgetservice: BudgetsService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets() {
    this.budgetservice.getBudget().subscribe((data) => {
      this.budgets = data;
      console.log('Budgets:', this.budgets); 
      this.http
        .get<Transaction[]>('http://localhost:3000/expense')
        .subscribe((expenses) => {
          this.expense = expenses;
          this.calculateRemaining()
        });
    });
  }
    calculateRemaining() {
    this.remainingByCategory = {};
    this.budgets.forEach(budget => {
      if(!budget.Category)return
      const totalSpent = this.expense
        .filter(e => e.Category === budget.Category)
        .reduce((sum, e) => sum + Number(e.Amount), 0);
      this.remainingByCategory[budget.Category]=(budget.amount ?? 0) - totalSpent
    });
  }

  addBudget() {
    
    this.budgetservice.addBudget(this.newbudgets).subscribe(() => {
      this.newbudgets = { Category: '', amount: '' };
      this.loadBudgets();
    });
    
  }
delete(id:any){
  if(window.confirm('Are you sure you want to delete this Budget?')){
     this.budgetservice.deleteBudget(id).subscribe((t)=>{
    this.budgets=this.budgets.filter(t=>t.id!==id)
  })
  }
 
}
  
}