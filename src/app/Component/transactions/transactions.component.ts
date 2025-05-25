import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [NgFor, NgIf],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  TransactionHistory: any[] = [];
  

  constructor(private transactionservice: TransactionService) {}
  ngOnInit(): void {
    this.transactionservice.GetTransaction().subscribe((data) => {
      this.TransactionHistory = data;
    });
  }

  Delete(id: number) {
    if (window.confirm('Are you sure you want to delete')) {
      this.transactionservice.deleteTransaction(id).subscribe((date) => {
        this.TransactionHistory = this.TransactionHistory.filter(
          (t) => t.id !== id
        );
      });
    }
  }
 
}
