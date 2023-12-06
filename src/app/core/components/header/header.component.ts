import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../services/data-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import * as ProfileActions from '../../../store/actions/profile.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  onGetProfile() {
    // this.dataStorageService.getUserProfile().subscribe(data => {
    // console.log(data);
    // }
    // )
    this.store.dispatch(ProfileActions.getProfileFromAPI());
  }
}
