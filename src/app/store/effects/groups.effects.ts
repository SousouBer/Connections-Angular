import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';

import { DataStorageService } from 'src/app/core/services/data-storage.service';
import * as GroupActions from '../actions/groups.actions';
import { Groups } from 'src/app/core/models/group.models';
import { GroupPeopleService } from 'src/app/core/services/groups-people.service';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private dataStorage: DataStorageService,
    private groupPeopleService: GroupPeopleService
  ) {}

  getGroupsDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getGroups),
      switchMap(() =>
        this.dataStorage.getGroupsList().pipe(
          map((groupsData) => {
            this.groupPeopleService.requestmessage(
              'List updated successfully!'
            );
            this.groupPeopleService.startTimer();
            return GroupActions.storeGroups({
              groups: groupsData as Groups,
            });
          })
        )
      )
    )
  );
}
