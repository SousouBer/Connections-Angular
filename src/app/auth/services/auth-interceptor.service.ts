import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService){}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if(!user){
        return next.handle(request);
      }
      const modifiedRequest = request.clone({
        setHeaders: {
          'rs-uid': (<User>user).uid,
          'rs-email': (<User>user).email,
          'Authorization': `Bearer ${(<User>user).token}`,
        }
      })
      return next.handle(modifiedRequest);
    }))
  }
}