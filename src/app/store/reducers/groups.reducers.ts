import { createReducer, on } from '@ngrx/store';
import { Groups } from 'src/app/core/models/group.models';
import * as GroupActions from '../actions/groups.actions';

export interface GroupsState {
  groupsData: Groups;
  firstRequestMade: boolean;
}

export const initialState: GroupsState = {
  groupsData: {
    Count: '',
    Items: [],
  },
  firstRequestMade: false
};

export const groupReducers = createReducer(
  initialState,
  on(GroupActions.storeGroups, (state, { groups }) => ({
    groupsData: groups,
    firstRequestMade: true
  })),
  on(GroupActions.addCreatedGroupToStore, (state, { group }) => ({
    ...state,
    groupsData: {
      ...state.groupsData,
      Count: (+state.groupsData.Count + 1).toString(),
      Items: [group, ...state.groupsData.Items],
    },
  })),
  on(GroupActions.removeGroup, (state, { groupID }) => {
    const filteredItems = state.groupsData.Items.filter(
      (item) => item.id.S !== groupID
    );

    return {
      ...state,
      groupsData: {
        ...state.groupsData,
        Count: (+state.groupsData.Count - 1).toString(),
        Items: filteredItems,
      },
    };
  })
);
