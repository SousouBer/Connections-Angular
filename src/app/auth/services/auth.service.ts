import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthResponse,
  PostData,
  errorResponseInterface,
} from '../models/register.interface';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { ValidUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'https://tasks.app.rs.school/angular/registration';
  private authUrl = 'https://tasks.app.rs.school/angular/login';

  validUser = new Subject<ValidUser>();

  constructor(private http: HttpClient) {}

  register(registerData: PostData) {
    return this.http
      .post(this.registerUrl, registerData)
      .pipe(catchError((err) => this.handleError(err)));
  }

  login(loginData: PostData) {
    return this.http
      .post<AuthResponse>(this.authUrl, loginData)
      .pipe(catchError((err) => this.handleError(err)), tap(userData => {
        const currentUser = new ValidUser(userData.uid, userData.token);
        this.validUser.next(currentUser);

        localStorage.setItem('userData', JSON.stringify(currentUser));
      }));
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
