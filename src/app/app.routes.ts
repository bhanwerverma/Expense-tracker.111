import { Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { TransactionsComponent } from './Component/transactions/transactions.component';

export const routes: Routes = [
    { path:'DashBoard',component:DashboardComponent},
    { path:'Transaction',component:TransactionsComponent},
    
];
