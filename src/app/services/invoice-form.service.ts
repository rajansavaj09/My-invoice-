import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { invoiceInterface } from '../interface/invoice-interface';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';


const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class InvoiceFormService {

  constructor(private httpClient:HttpClient) { }

  createInvoice(data:invoiceInterface){
    return this.httpClient.post(BASE_URL + 'invoiceFormData',data);
  }

  getInvoice():Observable<invoiceInterface[]>{
    return this.httpClient.get<invoiceInterface[]>(BASE_URL + 'invoiceFormData');
  }

  deleteInvoice(id:number){
    return this.httpClient.delete(BASE_URL + `invoiceFormData/${id}`);
  }

  getById(id:number): Observable<invoiceInterface>{
    return this.httpClient.get<invoiceInterface>(BASE_URL + `invoiceFormData/${id}`)
  } 

  updateInvoice(data:invoiceInterface){
    return this.httpClient.put(BASE_URL + `invoiceFormData/${data.id}`,data)
  }
}
