import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { DataStorageService } from 'src/app/core/services/data-storage.service';
import * as ParticipantsActions from '../actions/participants.actions';
import { EMPTY, catchError, concatMap, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs';
import { ParticipantsData } from 'src/app/core/models/participants.models';
import { participantItems } from '../selectors/participants.selectors';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { getConversationPs } from '../actions/participants.actions';
import { GroupPeopleService } from 'src/app/core/services/groups-people.service';

@Injectable()
export class ParticipantsEffects {
  constructor(
    private dataStorageService: DataStorageService,
    private groupPeopleService: GroupPeopleService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  // participantsEffects = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ParticipantsActions.getParticipantsFromAPI),
  //     switchMap(() =>
  //       this.dataStorageService.getParticipantsList().pipe(
  //         map((participantsData) =>
  //           ParticipantsActions.storeParticipantsToStore({
  //             participantsData: participantsData as ParticipantsData,
  //           })
  //         )
  //       )
  //     )
  //   )
  // );

  // participantsEffects = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ParticipantsActions.getParticipantsFromAPI),
  //     switchMap(() =>
  //       this.dataStorageService.getParticipantsList().pipe(
  //         map((participantsData) => {
  //           const participantsArray = (<ParticipantsData>participantsData).Items;

  //           return ParticipantsActions.storeParticipantsToStore({
  //             participantsData: participantsData as ParticipantsData,
  //           })
  //         })
  //       )
  //     )
  //   )
  // );

  // this.groupPeopleService.peopleTimer();

  getParticipants = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ParticipantsActions.getParticipantsFromAPI),
        switchMap(() =>
          this.dataStorageService.getParticipantsList().pipe(
            catchError(() => EMPTY),
            map((participantsData) => {
              // Start the timer in the people section if the http succeeds.
              this.groupPeopleService.peopleTimer();
              return ParticipantsActions.storeParticipantsToStore({
                participantsData: participantsData as ParticipantsData,
              })}
            )
          )
        ),
        tap(() => this.store.dispatch(ParticipantsActions.getConversationPs()))
      )
    // mergeMap(() =>
    //   this.dataStorageService
    //     .getConversations()
    //     .pipe(
    //       map((data) =>
    //         ParticipantsActions.StoreConversationPsToStore({
    //           conversationPs: data,
    //         })
    //       )
    //     )
    // )
  );

  getConversationParticipants = createEffect(() =>
    this.actions$.pipe(
      ofType(ParticipantsActions.getConversationPs),
      mergeMap(() =>
        this.dataStorageService.getConversations().pipe(
          map((data) =>
            ParticipantsActions.StoreConversationPsToStore({
              conversationPs: data,
            })
          )
        )
      )
    )
  );
  // }

  // ParticipantsActions.storeParticipantsToStore({
  //   participantsData: participantsData as ParticipantsData,
}
