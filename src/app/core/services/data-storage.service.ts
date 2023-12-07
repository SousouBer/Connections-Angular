import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Profile } from 'src/app/store/reducers/profile.reducers';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private changeUsernameUrl = 'https://tasks.app.rs.school/angular/profile';
  private getUserProfileUrl = 'https://tasks.app.rs.school/angular/profile';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile() {
    return this.http.get<Profile>(this.getUserProfileUrl);
  }

  updateUsername(updatedUsername: string){
    return this.http.put(this.changeUsernameUrl, {
      name: updatedUsername
    });
  }
}
