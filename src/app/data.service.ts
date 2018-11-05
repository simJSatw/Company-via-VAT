import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {VATInfo} from './VatInfo';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  fetchVat(idnumber: string): Observable<VATInfo> {
    return this._http.get<VATInfo>(`https://vat.erply.com/numbers?vatNumber=${idnumber}`)
      .pipe(
        /* Catch error with EHM*/
        catchError(this.ifCatchedError)
      );
  }

  /* Error Handling Method */
  ifCatchedError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

}
