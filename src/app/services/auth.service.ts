import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import e from 'express';

const API_URL = 'http://localhost:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

login(email: string, password: string): Observable<any> {
  return this.http.post(API_URL + 'login', {
    email,
    password
  }, httpOptions);
}

register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
  console.log(firstname, lastname, email, password);
  return this.http.post(API_URL + 'subscribe', {
    firstname,
    lastname,
    email,
    password
  }, httpOptions);
}
}
