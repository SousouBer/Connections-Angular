import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from '../group/group.component';
import { GroupnameFormComponent } from '../groupname-form/groupname-form.component';
import { Subscription, interval, map, take, takeWhile } from 'rxjs';
import { GroupPeopleService } from '../../services/groups-people.service';

@Component({
  selector: 'app-group-section',
  standalone: true,
  imports: [CommonModule, GroupComponent, GroupnameFormComponent],
  templateUrl: './group-section.component.html',
  styleUrls: ['./group-section.component.scss'],
})
export class GroupSectionComponent implements OnInit {
  countDown!: Subscription;

  private readonly countdownSeconds = 5;
  remainingSeconds = 60;
  showTimer = false;
  showModalWindow = false;

  constructor(private groupPeopleService: GroupPeopleService) {}

  ngOnInit(): void {
    this.groupPeopleService.showModalBoolean.subscribe(
      (val) => (this.showModalWindow = val)
    );
  }

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

  showModal() {
    this.groupPeopleService.showOrHideModalWindow(true);
  }

  hideModal(){
    this.groupPeopleService.showOrHideModalWindow(false);
  }

  stopPropagation(e: Event){
    e.stopPropagation();
  }
}