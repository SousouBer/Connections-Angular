import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { addCreatedGroupToStore } from 'src/app/store/actions/groups.actions';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class GroupPeopleService {
  showModalBoolean = new Subject<boolean>();

  constructor(private store: Store<AppState>){}

  showOrHideModalWindow(value: boolean) {
    this.showModalBoolean.next(value);
  }

  addGroupToStore(name: string) {
    // Create a group for the UI.
    const createdGroup = {
      id: {
        S: Math.random().toString(),
      },
      name: {
        S: name,
      },
      createdAt: {
        S: new Date().toString(),
      },
      createdBy: {
        S: 'You',
      },
    };

    this.store.dispatch(addCreatedGroupToStore({ group: createdGroup }));
  }
}
