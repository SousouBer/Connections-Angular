import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Profile } from 'src/app/store/reducers/profile.reducers';
import { Observable, Subscription } from 'rxjs';
import {
  getProfileDetails,
  getProfileName,
} from 'src/app/store/selectors/profile.selectors';
import { changeUserName } from 'src/app/store/actions/profile.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUsernameSub: Subscription;
  editUsername = false;

  currentUsername = '';
  editedUserName = '';
  usernameForm!: FormGroup;

  currentProfile$!: Observable<Profile>;

  constructor(private store: Store<AppState>) {
    this.currentProfile$ = this.store.select(getProfileDetails);
    this.currentUsernameSub = this.store
      .select(getProfileName)
      .subscribe((val) => (this.currentUsername = val));
  }

  ngOnInit(): void {
    this.usernameForm = new FormGroup({
      name: new FormControl(this.currentUsername, [
        Validators.required,
        Validators.maxLength(40),
        this.onlyLettersAndSpaces.bind(this),
      ]),
    });
  }

  get name() {
    return this.usernameForm.get('name');
  }

  onlyLettersAndSpaces(control: FormControl): { [s: string]: boolean } | null {
    // Shorthand for using the FormControl value
    const value = control.value;

    if (!value) {
      return null;
    }

    // Check for only letters and spaces
    const allowedLetters = /[^a-zA-Z\s]/.test(value);

    if (allowedLetters) {
      return { onlyLettersAndLettersAllowed: true };
    }

    return null;
  }

  editUser() {
    this.editUsername = true;
  }

  cancelEdit() {
    this.editUsername = false;
  }

  onSave() {
    this.store.dispatch(changeUserName({ name: this.usernameForm.value.name }));
    this.editUsername = false;
  }

  ngOnDestroy(): void {
    this.currentUsernameSub.unsubscribe();
  }
}
