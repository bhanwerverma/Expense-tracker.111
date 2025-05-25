import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../Component/loan.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiurl= 'http://localhost:3000/loan'
  constructor(private http :HttpClient) { }
 
  getLoans():Observable<Loan[]>{
    return this.http.get<Loan[]>(this.apiurl)
  }

  updataLoan(loan:Loan):Observable<Loan>{
    return this.http.patch<Loan>(`${this.apiurl}/${loan.id}`,loan)
  }
  deleteloan(id:number):Observable<Loan>{
    return this.http.delete<Loan>(`${this.apiurl}/${id}`)
  }
  addLoan(loan: Loan): Observable<Loan> {
  return this.http.post<Loan>(this.apiurl, loan);
}
}
