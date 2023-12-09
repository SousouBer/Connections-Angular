import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from '../group/group.component';
import { GroupnameFormComponent } from '../groupname-form/groupname-form.component';
import { Observable } from 'rxjs';
import { GroupPeopleService } from '../../services/groups-people.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getGroups } from 'src/app/store/actions/groups.actions';
import { Group } from '../../models/group.models';
import {
  firstRequestValue,
  groupItems,
  totalCount,
} from 'src/app/store/selectors/groups.selectors';

@Component({
  selector: 'app-group-section',
  standalone: true,
  imports: [CommonModule, GroupComponent, GroupnameFormComponent],
  templateUrl: './group-section.component.html',
  styleUrls: ['./group-section.component.scss'],
})
export class GroupSectionComponent implements OnInit {
  // A stream of group items.
  groupItems$!: Observable<Group[]>;
  groupTotalCount$!: Observable<string>;

  // Timer and seconds for the UI.
  showTimer$!: Observable<boolean>;
  remainingSeconds$!: Observable<number>;

  // Show or hide message
  showResultMessage = false;
  showModalWindow = false;


  // Boolean value for showing confirmation modal window when deleting a group.
  showConfirmationDays = false;

  requestResultMessage = '';

  // Boolean to see if the first request was made to update the list when a user visits the website for the first time.
  firstRequest = false;

  constructor(
    private groupPeopleService: GroupPeopleService,
    private store: Store<AppState>
  ) {
    this.groupItems$ = this.store.select(groupItems);
    this.groupTotalCount$ = this.store.select(totalCount);
    this.store
      .select(firstRequestValue)
      .subscribe((value) => (this.firstRequest = value));
  }

  ngOnInit(): void {
    // Update the list once when the user first visits the page.
    if (!this.firstRequest) {
      this.store.dispatch(getGroups());
    }

    this.showTimer$ = this.groupPeopleService.showTimerBoolean;
    this.remainingSeconds$ = this.groupPeopleService.remainingSeconds;

    this.groupPeopleService.showModalBoolean.subscribe(
      (val) => (this.showModalWindow = val)
    );

    this.groupPeopleService.showRequestMessage.subscribe(
      (val) => (this.showResultMessage = val)
    );

    this.groupPeopleService.requestResultMessage.subscribe(
      (val) => (this.requestResultMessage = val as string)
    );

    this.groupPeopleService.showCofirmationModal.subscribe(
      (val) => (this.showConfirmationDays = val)
    );
  }

  updateList() {
    this.store.dispatch(getGroups());
    this.groupPeopleService.showTimer(true);
    this.groupPeopleService.startTimer();
  }

  showModal() {
    this.groupPeopleService.showOrHideModalWindow(true);
  }

  hideModal() {
    this.groupPeopleService.showOrHideModalWindow(false);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  deleteSelectedGroup() {
    this.groupPeopleService.deleteGroup();
    this.groupPeopleService.showOrHideConfirmationModal(false);
  }

  candelDeletion() {
    this.groupPeopleService.showOrHideConfirmationModal(false);
  }
}
