import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterInterface } from '../models/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'https://tasks.app.rs.school/angular/registration';

  constructor(private http: HttpClient) {}

  register(registerData: RegisterInterface) {
    return this.http
      .post(this.registerUrl, registerData);
  }
}
