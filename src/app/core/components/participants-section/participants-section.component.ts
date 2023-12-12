import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantComponent } from '../participant/participant.component';
import { Observable } from 'rxjs';
import { GroupPeopleService } from '../../services/groups-people.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Participant } from '../../models/participants.models';
import { TotalCount, firstRequestValue, participantItems, showParticipants } from 'src/app/store/selectors/participants.selectors';
import { getParticipantsFromAPI } from 'src/app/store/actions/participants.actions';
import { DataStorageService } from '../../services/data-storage.service';
import { SpinnerComponent } from 'src/app/auth/components/spinner.component';

@Component({
  selector: 'app-participants-section',
  standalone: true,
  imports: [CommonModule, ParticipantComponent, SpinnerComponent],
  templateUrl: './participants-section.component.html',
  styleUrls: ['./participants-section.component.scss'],
})
export class ParticipantsSectionComponent implements OnInit {
  // Show or hide loading spinner.
  showSpinner = false;

  participantItems$!: Observable<Participant[]>;
  participantTotalCount$!: Observable<number>;

  showTimer$!: Observable<boolean>;
  remainingSeconds$!: Observable<number>;

   // Boolean to see if the first request was made to update the list when a user visits the website for the first time.
   firstRequest = false;

  constructor(
    private groupPeopleService: GroupPeopleService,
    private store: Store<AppState>,
    private dataStorageService: DataStorageService
  ) {
    // this.participantItems$ = this.store.select(participantItems);
    this.participantItems$ = this.store.select(showParticipants);
    this.participantTotalCount$ = this.store.select(TotalCount);
    this.store
      .select(firstRequestValue)
      .subscribe((value) => (this.firstRequest = value));
  }

  ngOnInit(): void {
    // Update the list once when the user first visits the page.
    // if (!this.firstRequest) {
    //   this.store.dispatch(getParticipantsFromAPI());
    // }

    this.showTimer$ = this.groupPeopleService.showTimerParticipant;
    this.remainingSeconds$ =
      this.groupPeopleService.remainingSecondsParticipant;
  }

  updateList() {
    this.store.dispatch(getParticipantsFromAPI());
  }
}
