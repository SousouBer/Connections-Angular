import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthResponse,
  PostData,
  errorResponseInterface,
} from '../models/register.interface';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'https://tasks.app.rs.school/angular/registration';
  private authUrl = 'https://tasks.app.rs.school/angular/login';

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  register(registerData: PostData) {
    return this.http
      .post(this.registerUrl, registerData)
      .pipe(catchError((err) => this.handleError(err)));
  }

  login(loginData: PostData) {
    return this.http
      .post<AuthResponse>(this.authUrl, loginData)
      .pipe(catchError((err) => this.handleError(err)), tap(userData => {
        const currentUser = new User(userData.uid, loginData.email, userData.token);
        this.user.next(currentUser);

        localStorage.setItem('userData', JSON.stringify(currentUser));
      }));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/signin']);
  }

  private handleError(errorReponse: HttpErrorResponse) {
    let errMessage = 'An unknown error occured. Try again.';
    const { message } = <errorResponseInterface>errorReponse.error;

    if (message) {
      errMessage = message;
    }

    return throwError(() => errMessage);
  }
}
