import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantComponent } from '../participant/participant.component';
import { Observable } from 'rxjs';
import { GroupPeopleService } from '../../services/groups-people.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Participant } from '../../models/participants.models';
import { TotalCount, participantItems } from 'src/app/store/selectors/participants.selectors';
import { getParticipantsFromAPI } from 'src/app/store/actions/participants.actions';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-participants-section',
  standalone: true,
  imports: [CommonModule, ParticipantComponent],
  templateUrl: './participants-section.component.html',
  styleUrls: ['./participants-section.component.scss'],
})
export class ParticipantsSectionComponent implements OnInit {
  participantItems$!: Observable<Participant[]>;
  participantTotalCount$!: Observable<number>;

  showTimer$!: Observable<boolean>;
  remainingSeconds$!: Observable<number>;

  constructor(
    private groupPeopleService: GroupPeopleService,
    private store: Store<AppState>,
    private dataStorageService: DataStorageService
  ) {
    this.participantItems$ = this.store.select(participantItems);
    this.participantTotalCount$ = this.store.select(TotalCount);
  }

  ngOnInit(): void {
    this.showTimer$ = this.groupPeopleService.showTimerParticipant;
    this.remainingSeconds$ =
      this.groupPeopleService.remainingSecondsParticipant;
  }

  updateList() {
    this.store.dispatch(getParticipantsFromAPI());
    this.dataStorageService.getConversations().subscribe(val => console.log(val))
    this.groupPeopleService.peopleTimer();
  }
}
