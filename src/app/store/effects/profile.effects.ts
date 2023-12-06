import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { DataStorageService } from 'src/app/core/services/data-storage.service';
import * as ProfileActions from '../actions/profile.actions';
import { Profile } from '../reducers/profile.reducers';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private dataStorage: DataStorageService
  ) {}

  getProfileDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getProfileFromAPI),
      switchMap(() =>
        this.dataStorage.getUserProfile().pipe(
          map((profileData) =>
            ProfileActions.storeProfileToStore({
              profile: profileData as Profile,
            })
          )
        )
      )
    )
  );
}
