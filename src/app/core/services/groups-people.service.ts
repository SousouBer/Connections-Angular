import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { addCreatedGroupToStore } from 'src/app/store/actions/groups.actions';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class GroupPeopleService {
  showModalBoolean = new Subject<boolean>();

  showRequestMessage = new Subject<boolean>();
  requestResultMessage = new Subject<String>()

  constructor(private store: Store<AppState>) {}

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
