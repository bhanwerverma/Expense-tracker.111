import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoanService } from '../../service/loan.service';

@Component({
  selector: 'app-loan-manager',
  imports: [NgIf, NgFor, ReactiveFormsModule, NgStyle],
  templateUrl: './loan-manager.component.html',
  styleUrl: './loan-manager.component.css',
})
export class LoanManagerComponent implements OnInit {
  loanTypes: string[] = [
    'Personal Loan',
    'Home Loan',
    'Car/Vehicle Loan',
    'Education Loan',
    'Business Loan',
    'Gold Loan',
    'Loan Against Property (LAP)',
    'Credit Card Loan',
    'Secured Loan',
    'Unsecured Loan',
    'Short-Term Loan',
    'Medium-Term Loan',
    'Long-Term Loan',
  ];

  moneyLenders: string[] = [
    'Bajaj Finserv',
    'HDFC Bank',
    'SBI Bank',
    'Kotak Mahindra',
    'ICICI Bank',
    'Axis Bank',
    'LIC Housing Finance',
    'Money View',
    'KreditBee',
    'PaySense',
  ];

  UserLoan: FormGroup;

  constructor(private fb: FormBuilder, private loanservice: LoanService) {
    this.UserLoan = this.fb.group({
      loanType: ['', Validators.required],
      lender: ['', Validators.required],
      amount: [null, Validators.required],
      interestRate: [null, Validators.required],
      tenureMonths: [null, Validators.required],
      emi: [null],
      noOfEmiPaid: [],
      remainingEmi: [],
      startDate: ['', Validators.required],
      totalBalance: [],
      remainingBalance: [],
      status: ['Active'],
    });
  }

  get MonthlyEMI(): number {
    const amount = this.UserLoan.get('amount')?.value || 0;
    const interestRate = this.UserLoan.get('interestRate')?.value || 0;
    const tenureMonths = this.UserLoan.get('tenureMonths')?.value || 1;

    // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const principal = Number(amount);
    const monthlyRate = Number(interestRate) / 12 / 100;
    const n = Number(tenureMonths);

    if (principal === 0 || monthlyRate === 0 || n === 0) return 0;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);

    return Math.round(emi);
  }

  get totalBalance(): number {
    const tenureMonths = this.UserLoan.get('tenureMonths')?.value || 0;
    return this.MonthlyEMI * Number(tenureMonths);
  }

  get remainingEmi(): number {
    const paidEMI = this.UserLoan.get('noOfEmiPaid')?.value || 0;
    const tenure = this.UserLoan.get('tenureMonths')?.value || 0;
    return tenure - paidEMI;
  }

  get remainingBalance(): number {
    return this.remainingEmi * Number(this.MonthlyEMI);
  }

  UserLoanDetails: any[] = [];
  ngOnInit() {
    this.loanservice.getLoans().subscribe((data) => {
      this.UserLoanDetails = data;
      console.log(this.UserLoanDetails);
      this.updateLoanStatuses();
    });
  }
  showModal: boolean = false;

  show() {
    this.showModal = true;
  }

  showNewModal() {
    this.UserLoan.reset();
    this.UserLoan.patchValue({
      loanType: this.loanTypes[-1] || '',
      lender: this.moneyLenders[-1] || '',
    });
    this.showModal = true;
  }
  close() {
    this.showModal = false;
  }

  onSubmit() {
    this.UserLoan.patchValue({
      emi: this.MonthlyEMI,
      totalBalance: this.totalBalance,
      remainingEmi: this.remainingEmi,
      remainingBalance: this.remainingBalance,
    });
    if (this.UserLoan.valid) {
      this.loanservice.addLoan(this.UserLoan.value).subscribe((data) => {
        console.log(this.UserLoan.value);

        this.close();
        this.UserLoan.reset();
        this.refreshLoans();
      });
    }
  }
  delete(id: number) {
    if (window.confirm('Are you Sure You want to Delete it')) {
      this.loanservice.deleteloan(id).subscribe((date) => {
        this.UserLoanDetails = this.UserLoanDetails.filter((t) => t.id !== id);
        this.refreshLoans();
      });
    }
  }
  refreshLoans() {
    this.loanservice.getLoans().subscribe((data) => {
      this.UserLoanDetails = data;
      this.updateLoanStatuses();
    });
  }
  update(loan: any) {
    this.UserLoan.patchValue(loan);
    this.show();
    this.loanservice.updataLoan(loan).subscribe((updatedLoan) => {
      // Optionally update the local array with the updated loan
      const index = this.UserLoanDetails.findIndex(
        (t) => t.id === updatedLoan.id
      );
      this.loanservice.deleteloan(loan.id).subscribe((data) => {
        this.UserLoanDetails.filter((t) => t.id !== loan.id);
      });
    });
    this.refreshLoans();
  }
  updateLoanStatuses() {
    this.UserLoanDetails.forEach((loan) => {
      if (loan.remainingEmi === 0) {
        loan.status = 'Closed';
      } else {
        loan.status = 'Active';
      }
    });
  }
}
