import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SigninComponent } from 'src/app/auth/components/signin/signin.component';
import { SignupComponent } from 'src/app/auth/components/signup/signup.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SigninComponent, SignupComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
