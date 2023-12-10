import { createReducer, on } from "@ngrx/store";

import { ParticipantsData } from "src/app/core/models/participants.models";
import * as ParticipantsActions from '../actions/participants.actions';

export interface ParticipantsState {
  participantsData: ParticipantsData;
  firstRequestMade: boolean;
}

export const initialState: ParticipantsState = {
  participantsData: {
    Count: 0,
    Items: []
  },
  firstRequestMade: false
}

export const participantsReducers = createReducer(
  initialState,
  on(ParticipantsActions.storeParticipantsToStore, (state, { participantsData }) => ({
    participantsData: participantsData,
    firstRequestMade: true
  }))
)