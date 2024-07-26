import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ProfileState } from "../reducers/profile.reducers";

export const profile = (state: AppState) => {
  return state.profileData
}

export const getProfileDetails = createSelector(
  profile,
  (state: ProfileState) => {
    return state.profileDetails;
  }
)

export const getProfileName = createSelector(
  profile,
  (state: ProfileState) => {
    return state.profileDetails.name.S;
  }
)

export const requestBoolean = createSelector(
  profile,
  (state: ProfileState) => {
    return state.requestWasSentOnce;
  }
)