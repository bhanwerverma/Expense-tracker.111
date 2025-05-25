export interface Loan {
  id: number;
  loanType: string;
  lender: string;
  amount: number;
  interestRate: number;
  tenureMonths: number;
  noOfEmiPaid: number;
  remainingEmi: number;
  startDate: Date;
  totalBalance: number;
  remainingBalance: number;
  monthlyEmiAmount: number;
  status: 'active' | 'closed';
}