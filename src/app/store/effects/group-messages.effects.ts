import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { DataStorageService } from 'src/app/core/services/data-storage.service';
import * as GroupMessageActions from '../actions/group-messages.actions';
import { Profile } from '../reducers/profile.reducers';
import { GroupMessages } from 'src/app/core/models/group.models';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { groupMessages, messageTimestamp } from '../selectors/group-messages.selectors';
import { updateGroupMessages } from '../actions/group-messages.actions';
import { GroupPeopleService } from 'src/app/core/services/groups-people.service';

@Injectable()
export class GroupMessagesEffects {
  constructor(
    private actions$: Actions,
    private dataStorage: DataStorageService,
    private groupPeopleService: GroupPeopleService,
    private store: Store<AppState>
  ) {}

  getGroupMessages = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupMessageActions.getGroupMessages),
      switchMap(({ groupID }) =>
        this.dataStorage.getGroupMessages(groupID).pipe(
          map((groupMessagesData) =>
          GroupMessageActions.storeGroupMessages({
            groupID: groupID,
              groupsMessages: groupMessagesData as GroupMessages,
            })
          ),
          catchError(err => {
            this.groupPeopleService.updateErrorMessage(err)
            return of(err)
          })
        )
      )
    )
  );


  updateGroupMessages = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupMessageActions.updateGroupMessages),
      switchMap(({ groupID, timestamp }) =>
        this.dataStorage.updaTeGroupMessages(groupID, timestamp).pipe(
          map((groupMessagesData) =>
          GroupMessageActions.storeUpdatedMessages({
            groupID: groupID,
              newMessages: groupMessagesData as GroupMessages,
            })
          )
        )
      )
    )
  );

  sendMessageToGroup = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupMessageActions.sendMessageToGroup),
      switchMap(({ groupID, textMessage }) => {
        // Assuming sendGroupMessage returns an Observable<void>
        console.log('success');
        return this.dataStorage.sendGroupMessage(groupID, textMessage);
      })
    ),
    { dispatch: false } // Don't dispatch any action
  );
}
