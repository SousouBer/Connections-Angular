import { createReducer, on } from '@ngrx/store';
import { Groups } from 'src/app/core/models/group.models';
import * as GroupActions from '../actions/groups.actions';

export interface GroupsState {
  groupsData: Groups;
}

export const initialState: GroupsState = {
  groupsData: {
    Count: '',
    Items: []
  }
}

export const groupReducers = createReducer(
  initialState,
  on(GroupActions.storeGroups, (state, { groups }) => ({
    groupsData: groups
  }))
)