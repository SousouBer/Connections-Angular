import { createAction, props } from '@ngrx/store';
import {
  ConversationsPData,
  ParticipantsData,
} from 'src/app/core/models/participants.models';

export const getParticipantsFromAPI = createAction(
  '[Participants API] Get Participants'
);

export const storeParticipantsToStore = createAction(
  '[Participants Section] Store Participants',
  props<{ participantsData: ParticipantsData }>()
);

export const getConversationPs = createAction(
  '[Participants API] Get Conversation Participants'
);

export const StoreConversationPsToStore = createAction(
  '[Participants Section] Store Conversation Participants',
  props<{ conversationPs: ConversationsPData }>()
);
