import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SigninComponent } from 'src/app/auth/components/signin/signin.component';
import { SignupComponent } from 'src/app/auth/components/signup/signup.component';
import { GroupComponent } from './group/group.component';
import { Observable, Subscription, interval, map, take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    SigninComponent,
    SignupComponent,
    GroupComponent,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{
  countDown!: Subscription;

  private readonly countdownSeconds = 60;
  remainingSeconds = 60;
  showTimer = false;

  constructor() {}

  ngOnInit(): void {}

  updateList() {
    this.showTimer = true;
    this.startTimer();
  }

  startTimer() {
    this.countDown = interval(1000)
      .pipe(
        take(this.countdownSeconds),
        map((value) => this.countdownSeconds - 1 - value),
        takeWhile(value => value >= 0)
      )
      .subscribe((result) => {
        if (result === 1) {
          this.showTimer = false;
        }
        this.remainingSeconds = result;
        console.log(result);
      });
  }
}
