import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../services/data-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import * as ProfileActions from '../../../store/actions/profile.actions';
import { requestBoolean } from 'src/app/store/selectors/profile.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  private firstRequestSub!: Subscription;

  isAuthenticated = false;
  firstRequestSent = false;

  logoutLoading = false;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      setTimeout(() => {
        this.isAuthenticated = !!user;
      }, 2000);
    });

    this.firstRequestSub = this.store
      .select(requestBoolean)
      .subscribe((value) => (this.firstRequestSent = value));
  }

  logout() {
    this.logoutLoading = true;
    this.authService.logout().subscribe((success) => {
      this.logoutLoading = false;
      this.router.navigate(['/signin'])
      // Remove the user from the local storage.
      this.authService.clearLocalStorage();
    });
  }

  onGetProfile() {
    this.router.navigate(['/profile']);
    if (!this.firstRequestSent) {
      this.store.dispatch(ProfileActions.getProfileFromAPI());
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.firstRequestSub.unsubscribe();
  }
}
