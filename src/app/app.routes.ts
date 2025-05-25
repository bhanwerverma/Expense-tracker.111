import { Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { TransactionsComponent } from './Component/transactions/transactions.component';
import { BudgetsComponent } from './Component/budgets/budgets.component';
import { ReportComponent } from './Component/report/report.component';
import { SettingsComponent } from './Component/settings/settings.component';
import { LoanManagerComponent } from './Component/loan-manager/loan-manager.component';

export const routes: Routes = [
    { path:'DashBoard',component:DashboardComponent},
    { path:'Transaction',component:TransactionsComponent},
    { path:'Budgets',component:BudgetsComponent},
    { path:'Report',component:ReportComponent},
    { path:'Settings',component:SettingsComponent},
    { path:'LoanManager',component:LoanManagerComponent},
    
];
