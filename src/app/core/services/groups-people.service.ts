import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, interval, map, take, takeWhile } from 'rxjs';
import { addCreatedGroupToStore, removeGroup } from 'src/app/store/actions/groups.actions';
import { AppState } from 'src/app/store/app.state';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GroupPeopleService {
  private readonly countdownSeconds = 60;

  showModalBoolean = new Subject<boolean>();

  showRequestMessage = new Subject<boolean>();
  requestResultMessage = new Subject<String>()

  // Save the GroupID value to remove it from the server.
  showCofirmationModal = new Subject<boolean>();
  groupId = '';

  showTimerBoolean = new BehaviorSubject<boolean>(false);
  remainingSeconds = new BehaviorSubject<number>(60);

  constructor(private store: Store<AppState>, private dataStorageService: DataStorageService) {}

  // Manage the timer state from another component. In this case, in the group component.
  showTimer(value: boolean){
    this.showTimerBoolean.next(value);
  }

  startTimer() {
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

  requestmessage(value: string){
    this.requestResultMessage.next(value);
    this.showRequestMessage.next(true);
    setTimeout(() => {
      this.showRequestMessage.next(false);
    }, 2000);
  }

  showOrHideConfirmationModal(val: boolean){
    this.showCofirmationModal.next(val);
  }

  saveGroupId(groupID: string){
    this.groupId = groupID;
  }

  // Delete the group from the server using the groupID provided from group component.
  deleteGroup(){
    this.dataStorageService.deleteGroup(this.groupId).subscribe(
      val => this.store.dispatch(removeGroup({ groupID: this.groupId }))
    )
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
        S: new Date().toString(),
      },
      createdBy: {
        S: userId,
      },
    };

    this.store.dispatch(addCreatedGroupToStore({ group: createdGroup }));
  }
}
