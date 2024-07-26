import { createAction, props } from '@ngrx/store';
import { Profile } from '../reducers/profile.reducers';

export const getProfileFromAPI = createAction('[Profile API] Get Profile Details');

export const storeProfileToStore = createAction(
  '[Profile API] Store Profile To Store',
  props<{ profile: Profile }>()
);

export const changeUserName = createAction(
  '[Profile Page] Change Username',
  props< { name: string } >()
)