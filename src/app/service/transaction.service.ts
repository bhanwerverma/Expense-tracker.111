import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../Component/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/expense'
  constructor(private http:HttpClient) { }

  AddTransaction(transaction : Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl,transaction)
  }
GetTransaction():Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl)
}
  deleteTransaction(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
