import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
        this.onlyLettersAndSpaces.bind(this),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), this.strongPassword.bind(this)]),
    });
  }

  //Use getters to have shorted code in the template
  get firstname(){
    return this.signupForm.get('firstname');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }

  // Custom validator methods
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

  strongPassword(control: FormControl): { [s: string]: boolean } | null {
    const value = control.value;

    if(!value){
      return null;
    }

    // Test an input value to see whether it contains the followings
    const containsUpperCase = /[A-Z]/.test(value);
    const containsNumber = /\d/.test(value);
    const containsLowerCase = /[a-z]/.test(value);
    const containsCharacters = /[!@#?]/.test(value);

    const isStrongPassword = value.length >= 8
      && containsNumber
      && containsUpperCase
      && containsLowerCase
      && containsCharacters;

        if (!isStrongPassword) {
            return { weakPassword: true };
        }
        return null;
  }

  onSubmit(){
    // this.signupForm.reset();
    console.log(this.signupForm.value);
  }
}
