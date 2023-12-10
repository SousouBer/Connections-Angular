import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { DataStorageService } from 'src/app/core/services/data-storage.service';
import * as ParticipantsActions from '../actions/participants.actions';
import { map, switchMap } from 'rxjs';
import { ParticipantsData } from 'src/app/core/models/participants.models';

@Injectable()
export class ParticipantsEffects {
  constructor(
    private dataStorageService: DataStorageService,
    private actions$: Actions
  ) {}

  participantsEffects = createEffect(() =>
    this.actions$.pipe(
      ofType(ParticipantsActions.getParticipantsFromAPI),
      switchMap(() =>
        this.dataStorageService.getParticipantsList().pipe(
          map((participantsData) =>
            ParticipantsActions.storeParticipantsToStore({
              participantsData: participantsData as ParticipantsData,
            })
          )
        )
      )
    )
  );
}
