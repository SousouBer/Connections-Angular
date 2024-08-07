import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SigninComponent } from 'src/app/auth/components/signin/signin.component';
import { SignupComponent } from 'src/app/auth/components/signup/signup.component';
import { GroupComponent } from '../group/group.component';
import { Observable, Subscription, interval, map, take, takeWhile } from 'rxjs';
import { GroupnameFormComponent } from '../groupname-form/groupname-form.component';
import { GroupSectionComponent } from '../group-section/group-section.component';
import { ParticipantsSectionComponent } from '../participants-section/participants-section.component';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    SigninComponent,
    SignupComponent,
    RouterModule,
    RouterOutlet,
    GroupSectionComponent,
    ParticipantsSectionComponent,
    GroupDialogComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  countDown!: Subscription;

  private readonly countdownSeconds = 5;
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
        takeWhile((value) => value >= -1)
      )
      .subscribe((result) => {
        if (result === 0) {
          this.showTimer = false;
        }
        this.remainingSeconds = result;
        console.log(result);
      });
  }
}
