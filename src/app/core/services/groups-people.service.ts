import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Subject,
  interval,
  map,
  switchMap,
  take,
  takeWhile,
  tap,
} from 'rxjs';
import {
  addCreatedGroupToStore,
  removeGroup,
} from 'src/app/store/actions/groups.actions';
import { AppState } from 'src/app/store/app.state';
import { DataStorageService } from './data-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupPeopleService {
  private readonly countdownSeconds = 60;

  // Error message to be displayed in the template.
  showErrorMessageValue = new Subject<boolean>();
  errorMessage = new Subject<string>();

  showModalBoolean = new Subject<boolean>();

  showRequestMessage = new Subject<boolean>();
  requestResultMessage = new Subject<String>();

  // Save the GroupID value to remove it from the server.
  showCofirmationModal = new Subject<boolean>();

  // Group ID for displating specific group messages.

  // groupId = '';

  groupId = new BehaviorSubject<string>('');

  // GROUPID for loading messages.
  groupIdMessages = new BehaviorSubject<string>('');

  // Group section timer values.
  showTimerBoolean = new BehaviorSubject<boolean>(false);
  remainingSeconds = new BehaviorSubject<number>(60);

  // Choose which values to update based on a string.
  groupOrPeopleSection = '';

  // Participant section timer values.
  showTimerParticipant = new BehaviorSubject<boolean>(false);
  remainingSecondsParticipant = new BehaviorSubject<number>(60);

  // Group created by.
  createdBy = new Subject<string>();

  constructor(
    private store: Store<AppState>,
    private dataStorageService: DataStorageService
  ) {}

  // Manage the timer state from another component. In this case, in the group component.
  showTimer(value: boolean) {
    this.showTimerBoolean.next(value);
  }

  showTimerPeople(value: boolean) {
    this.showTimerParticipant.next(value);
  }

  peopleTimer() {
    this.showTimerPeople(true);
    interval(1000)
      .pipe(
        take(this.countdownSeconds),
        map((value) => this.countdownSeconds - 1 - value),
        takeWhile((value) => value >= -1)
      )
      .subscribe((result) => {
        if (result === 0) {
          this.showTimerPeople(false);
        }
        this.remainingSecondsParticipant.next(result);
      });
  }

  startTimer() {
    this.showTimer(true);
    interval(1000)
      .pipe(
        take(this.countdownSeconds),
        map((value) => this.countdownSeconds - 1 - value),
        takeWhile((value) => value >= -1)
      )
      .subscribe((result) => {
        if (result === 0) {
          this.showTimer(false);
        }
        this.remainingSeconds.next(result);
      });
  }

  showOrHideModalWindow(value: boolean) {
    this.showModalBoolean.next(value);
  }

  requestmessage(value: string) {
    this.requestResultMessage.next(value);
    this.showRequestMessage.next(true);
    setTimeout(() => {
      this.showRequestMessage.next(false);
    }, 2000);
  }

  showOrHideConfirmationModal(val: boolean) {
    this.showCofirmationModal.next(val);
  }

  // saveGroupId(groupID: string){
  //   this.groupId = groupID;
  // }
  saveGroupId(groupID: string) {
    this.groupId.next(groupID);
  }

  // Delete the group from the server using the groupID provided from group component.
  deleteGroup() {
    // Get the value of the ID without subscribing to it.
    const id = this.groupId.getValue();

    // Take the value once and then automatically unsubscribe.
    this.dataStorageService
      .deleteGroup(id)
      .pipe(take(1))
      .subscribe((val) => this.store.dispatch(removeGroup({ groupID: id })));
  }

  addGroupToStore(name: string, groupId: string) {
    // Create a group for the UI.
    const user = JSON.parse(<string>localStorage.getItem('userData'));
    let userId = '';

    if (user) {
      userId = user.uid;
    }

    const createdGroup = {
      id: {
        S: groupId,
      },
      name: {
        S: name,
      },
      createdAt: {
        S: new Date().getTime().toString(),
      },
      createdBy: {
        S: userId,
      },
    };

    this.store.dispatch(addCreatedGroupToStore({ group: createdGroup }));
  }

  updateErrorMessage(val: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured. Please, try again later.';

    if (val?.error?.type === 'InvalidIDException') {
      errorMessage = val?.message;
    }
    this.errorMessage.next(errorMessage);
    this.showErrorMessageValue.next(true);
    console.log(val);
  }
}
