import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Profile } from 'src/app/store/reducers/profile.reducers';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile() {
    return this.http.get<Profile>(
      'https://tasks.app.rs.school/angular/profile'
    );
  }
}
