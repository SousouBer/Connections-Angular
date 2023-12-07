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
import { SpinnerComponent } from 'src/app/auth/components/spinner.component';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUsernameSub: Subscription;
  updateUsernameSub!: Subscription;
  usernameForm!: FormGroup;

  // Conditionally show the spinner to indicate the loading process when the form is submitted.
  isLoading = false;
  // Show or hide the form that edits the name.
  editUsername = false;
  // Show the message of the request result.
  showRequestMessage = false;

  currentUsername = '';
  editedUserName = '';
  // The request result message that will be displayed at the end.
  successOrFailedMessage = '';
  // If the request succeeds, the color will be green, if fails, red. And will be shown in the profile.
  defineMessageColor = '';

  currentProfile$!: Observable<Profile>;

  constructor(
    private store: Store<AppState>,
    private dataStorage: DataStorageService
  ) {
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
    if (this.usernameForm.valid) {
      this.isLoading = true;
      const updatedUsername = this.usernameForm.value.name;

      this.updateUsernameSub = this.dataStorage.updateUsername(updatedUsername).subscribe(
        (val) => {
          this.store.dispatch(changeUserName({ name: updatedUsername }));
          this.isLoading = false;
          this.editUsername = false;
          this.showRequestMessage = true;
          this.defineMessageColor = 'success';
          this.successOrFailedMessage = 'Your name was updated successfully.';
          setTimeout(() => {
            this.showRequestMessage = false;
          }, 2000);
        },
        (error) => {
          this.isLoading = false;
          this.showRequestMessage = true;
          this.defineMessageColor = 'failed';
          this.successOrFailedMessage = 'An error occured. Try again later.';
          this.name?.setErrors({ networkError: true });
          setTimeout(() => {
            this.showRequestMessage = false;
          }, 2000);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.currentUsernameSub.unsubscribe();
    this.updateUsernameSub.unsubscribe();
  }
}
