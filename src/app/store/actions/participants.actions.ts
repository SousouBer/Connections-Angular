import { createAction, props } from "@ngrx/store";
import { ParticipantsData } from "src/app/core/models/participants.models";

export const getParticipantsFromAPI = createAction('[Participants API] Get Participants');

export const storeParticipantsToStore = createAction(
  '[Participants Section] Store Participants',
  props<{ participantsData: ParticipantsData }>()
)
