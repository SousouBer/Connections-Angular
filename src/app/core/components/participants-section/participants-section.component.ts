import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantComponent } from '../participant/participant.component';
import { Observable } from 'rxjs';
import { GroupPeopleService } from '../../services/groups-people.service';

@Component({
  selector: 'app-participants-section',
  standalone: true,
  imports: [CommonModule, ParticipantComponent],
  templateUrl: './participants-section.component.html',
  styleUrls: ['./participants-section.component.scss']
})
export class ParticipantsSectionComponent implements OnInit {
  showTimer$!: Observable<boolean>;
  remainingSeconds$!: Observable<number>;

  constructor(private groupPeopleService: GroupPeopleService) { }

  ngOnInit(): void {
    this.showTimer$ = this.groupPeopleService.showTimerParticipant;
    this.remainingSeconds$ = this.groupPeopleService.remainingSecondsParticipant;
  }

  updateList() {
    this.groupPeopleService.peopleTimer();
  }
}
