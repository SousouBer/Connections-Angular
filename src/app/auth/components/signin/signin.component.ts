import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SpinnerComponent } from '../spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;

  isLoading = false;
  errorMessage: string | null = null;
  success = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  onSubmit() {
    this.errorMessage = null;
    this.isLoading = true;

    this.authService.login(this.signinForm.value).subscribe(
      (data) => {
        this.isLoading = false;
        this.success = true;
        this.signinForm.reset();
        setTimeout(() => {
          this.router.navigate(['/main'])
          this.success = false;
        },2000)
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        this.email?.setErrors({ dataNotFound: true });
        this.password?.setErrors({ dataNotFound: true });
      }
    );
  }
}
