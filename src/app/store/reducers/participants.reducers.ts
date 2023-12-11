import { createReducer, on } from '@ngrx/store';

import {
  ConversationP,
  ConversationsPData,
  ParticipantsData,
} from 'src/app/core/models/participants.models';
import * as ParticipantsActions from '../actions/participants.actions';

export interface ParticipantsState {
  participantsData: ParticipantsData;
  conversationParticipants: ConversationP[];
  firstRequestMade: boolean;
}

export interface ActiveConversationUsers {}

export const initialState: ParticipantsState = {
  participantsData: {
    Count: 0,
    Items: [],
  },
  conversationParticipants: [],
  firstRequestMade: false,
};

// export const participantsReducers = createReducer(
//   initialState,
//   on(ParticipantsActions.storeParticipantsToStore, (state, { participantsData }) => ({
//     ...state,
//     participantsData: participantsData,
//     firstRequestMade: true
//   })),
//   on(ParticipantsActions.StoreConversationPsToStore, (state, { conversationPs }) => ({
//     ...state,
//     conversationParticipants: conversationPs.Items
//   }))
// )

export const participantsReducers = createReducer(
  initialState,
  on(
    ParticipantsActions.storeParticipantsToStore,
    (state, { participantsData }) => {
      console.log(participantsData);
      return {
        ...state,
        participantsData: participantsData,
        firstRequestMade: true,
      };
    }
  ),
  on(
    ParticipantsActions.StoreConversationPsToStore,
    (state, { conversationPs }) => {
      return { ...state, conversationParticipants: conversationPs.Items };
    }
  )
);
