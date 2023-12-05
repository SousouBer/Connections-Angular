import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile() {
    return this.http.get('https://tasks.app.rs.school/angular/profile');
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     return this.http.get('https://tasks.app.rs.school/angular/profile', {
    //       headers: {
    //         'rs-uid': (<User>user).uid,
    //         'rs-email': (<User>user).email,
    //         Authorization: `Bearer ${(<User>user).token}`,
    //       },
    //     });
    //   })
    // );
  }
}
