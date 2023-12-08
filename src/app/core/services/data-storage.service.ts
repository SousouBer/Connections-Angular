import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Profile } from 'src/app/store/reducers/profile.reducers';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private changeUsernameUrl = 'https://tasks.app.rs.school/angular/profile';
  private getUserProfileUrl = 'https://tasks.app.rs.school/angular/profile';
  private getGroupsUrl = 'https://tasks.app.rs.school/angular/groups/list';
  private createNewGroup = 'https://tasks.app.rs.school/angular/groups/create';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get user's (your) profile details.
  getUserProfile() {
    return this.http.get<Profile>(this.getUserProfileUrl);
  }

  // Update your name in the server.
  updateUsername(updatedUsername: string){
    return this.http.put(this.changeUsernameUrl, {
      name: updatedUsername
    });
  }

  // Get the Groups data from the remote server.
  getGroupsList(){
    return this.http.get(this.getGroupsUrl);
  }

  // Create a group with a proper name.
  createGroup(name: string){
    return this.http.post(this.createNewGroup, {
        name: name
    })
  }
}
