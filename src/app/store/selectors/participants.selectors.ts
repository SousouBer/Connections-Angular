import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ParticipantsState } from "../reducers/participants.reducers";

export const participantsState = (state: AppState) => state.participantsData;

export const TotalCount = createSelector(
  participantsState,
  (state: ParticipantsState) => state.participantsData.Count
)

export const participantItems = createSelector(
  participantsState,
  (state: ParticipantsState) => state.participantsData.Items
)

export const firstRequestValue = createSelector(
  participantsState,
  (state: ParticipantsState) => state.firstRequestMade
)