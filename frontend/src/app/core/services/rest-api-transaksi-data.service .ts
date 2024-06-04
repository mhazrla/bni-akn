import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaksi } from '../models/master-admin.model';
import { GlobalComponent } from 'src/app/global-component';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }),
};

@Injectable({ providedIn: 'root' })
export class RestApiTransactionDataService {
  constructor(private http: HttpClient) {}

  /***
   * Get All UserRole
   */
  getAllTransactions(): Observable<any> {
    return this.http.get(GlobalComponent.API_DEV + GlobalComponent.transaction);
  }

  // Single
  getSingleTransaction(id: any): Observable<any> {
    return this.http.get(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.transaction +
        id,
      httpOptions
    );
  }

  postTransaction(transaction: any): Observable<any> {
    return this.http.post(
      GlobalComponent.API_DEV + GlobalComponent.transaction,
      transaction
    );
  }

  putTransaction(transaction: any): Observable<any> {
    return this.http.put(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.transaction +
        transaction.id,
      JSON.stringify(transaction),
      httpOptions
    );
  }

  verifiedTransaction(id: any): Observable<any> {
    return this.http.put(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.transaction +
        id,
      httpOptions
    );
  }

  deleteTransaction(id: any): Observable<any> {
    return this.http.delete(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.transaction +
        id,
      httpOptions
    );
  }

  /***
   * Get All Products
   */
  getAllProducts(): Observable<any> {
    return this.http.get(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.products,
      httpOptions
    );
  }
}
