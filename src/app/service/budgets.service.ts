import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budgets } from '../Component/budgets.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  private apiurl= "http://localhost:3000/Budget"
  constructor(private http:HttpClient) { }

  getBudget():Observable<Budgets[]>{
    return this.http.get<Budgets[]>(this.apiurl)
  }

  addBudget(budget:Budgets):Observable<Budgets[]>{
    return this.http.post<Budgets[]>(this.apiurl, budget)
  }

  updateBudget(budget:Budgets):Observable<Budgets[]>{
    return this.http.put<Budgets[]>(`${this.apiurl}/${budget.id}`,budget)
  }

  deleteBudget(id:number):Observable<Budgets[]>{
    return this.http.delete<Budgets[]>(`${this.apiurl}/${id}`)
  }
}
