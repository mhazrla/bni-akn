import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pencatatan } from '../models/master-admin.model';
import { GlobalComponent } from 'src/app/global-component';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }),
};

@Injectable({ providedIn: 'root' })
export class RestApiPencatatanDataService {
  constructor(private http: HttpClient) {}

  /***
   * Get All UserRole
   */
  getAllPencatatan(): Observable<any> {
    return this.http.get(GlobalComponent.API_DEV + GlobalComponent.history);
  }

  // Single
  getSinglePencatatan(id: any): Observable<any> {
    return this.http.get(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.history +
        id,
      httpOptions
    );
  }

  postPencatatan(history: Pencatatan): Observable<any> {
    return this.http.post(
      GlobalComponent.API_DEV + GlobalComponent.admin + GlobalComponent.history,
      JSON.stringify(history),
      httpOptions
    );
  }

  putPencatatan(history: Pencatatan): Observable<any> {
    return this.http.put(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.history +
        history.id,
      JSON.stringify(history),
      httpOptions
    );
  }

  deletePencatatan(id: any): Observable<any> {
    return this.http.delete(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.history +
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
