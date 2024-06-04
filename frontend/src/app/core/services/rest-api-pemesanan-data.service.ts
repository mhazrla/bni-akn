import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pemesanan } from '../models/master-admin.model';
import { GlobalComponent } from 'src/app/global-component';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }),
};

@Injectable({ providedIn: 'root' })
export class RestApiPemesananDataService {
  constructor(private http: HttpClient) {}

  /***
   * Get All UserRole
   */
  getAllRequests(): Observable<any> {
    return this.http.get(GlobalComponent.API_DEV + GlobalComponent.request);
  }

  getVerified(): Observable<any> {
    return this.http.get(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.verified +
        GlobalComponent.request
    );
  }

  // Single
  getSingleRequest(id: any): Observable<any> {
    return this.http.get(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.request +
        id,
      httpOptions
    );
  }

  postRequest(request: Pemesanan): Observable<any> {
    return this.http.post(
      GlobalComponent.API_DEV + GlobalComponent.admin + GlobalComponent.request,
      JSON.stringify(request),
      httpOptions
    );
  }

  putRequest(request: Pemesanan): Observable<any> {
    return this.http.put(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.request +
        request.id,
      JSON.stringify(request),
      httpOptions
    );
  }

  deleteRequest(id: any): Observable<any> {
    return this.http.delete(
      GlobalComponent.API_DEV +
        GlobalComponent.admin +
        GlobalComponent.request +
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
