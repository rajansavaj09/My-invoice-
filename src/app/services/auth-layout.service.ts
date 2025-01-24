import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInterface } from '../interface/auth-interface';
import { environment } from '../../environments/environment.development';

const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthLayoutService {

  constructor(private httpClient: HttpClient) { }

  createUser(data:AuthInterface){
    return this.httpClient.post(BASE_URL + 'RegisterData',data)
  }
  getUser(){
    return this.httpClient.get(BASE_URL + 'http://localhost:3000/RegisterData')
  }
}
