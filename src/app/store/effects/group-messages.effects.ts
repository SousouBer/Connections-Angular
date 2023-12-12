import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { DataStorageService } from 'src/app/core/services/data-storage.service';
import * as GroupMessageActions from '../actions/group-messages.actions';
import { Profile } from '../reducers/profile.reducers';
import { GroupMessages } from 'src/app/core/models/group.models';

@Injectable()
export class GroupMessagesEffects {
  constructor(
    private actions$: Actions,
    private dataStorage: DataStorageService
  ) {}

  getGroupMessages = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupMessageActions.getGroupMessages),
      switchMap(({ groupID }) =>
        this.dataStorage.getGroupMessages(groupID).pipe(
          map((groupMessagesData) =>
          GroupMessageActions.storeGroupMessages({
              groupsMessages: groupMessagesData as GroupMessages,
            })
          )
        )
      )
    )
  );
}
