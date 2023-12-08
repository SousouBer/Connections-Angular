import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { DataStorageService } from 'src/app/core/services/data-storage.service';
import * as GroupActions from '../actions/groups.actions';
import { Groups } from 'src/app/core/models/group.models';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private dataStorage: DataStorageService
  ) {}

  getGroupsDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getGroups),
      switchMap(() =>
        this.dataStorage.getGroupsList().pipe(
          map((groupsData) =>
          GroupActions.storeGroups({
              groups: groupsData as Groups
            })
          )
        )
      )
    )
  );
}
