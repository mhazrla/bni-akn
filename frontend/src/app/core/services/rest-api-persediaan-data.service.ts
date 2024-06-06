import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persediaan, UserRole } from '../models/master-admin.model';
import { GlobalComponent } from 'src/app/global-component';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }),
};

@Injectable({ providedIn: 'root' })
export class RestApiPersediaanDataService {
  constructor(private http: HttpClient) {}

  /***
   * Get All UserRole
   */
  getAllStocks(): Observable<any> {
    return this.http.get(GlobalComponent.API_DEV + GlobalComponent.stocks);
  }

  // Single
  getSingleStock(id: any): Observable<any> {
    return this.http.get(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.stock +
        id,
      httpOptions
    );
  }

  postPersediaan(stock: Persediaan): Observable<any> {
    return this.http.post(
      GlobalComponent.API_DEV + GlobalComponent.admin + GlobalComponent.stock,
      JSON.stringify(stock),
      httpOptions
    );
  }

  putPersediaan(stock: Persediaan): Observable<any> {
    return this.http.put(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.stock +
        stock.id,
      JSON.stringify(stock),
      httpOptions
    );
  }

  deletePersediaan(id: any): Observable<any> {
    return this.http.delete(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.stock +
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
