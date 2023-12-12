import { createReducer, on } from "@ngrx/store";

import { GroupMessages } from "src/app/core/models/group.models";
import * as GroupMessagesActions from "../actions/group-messages.actions";
import { state } from "@angular/animations";

export interface GroupMessagesState {
  groupMessagesData: GroupMessages;
  firstRequestMade: boolean;
}

export const initialState: GroupMessagesState = {
  groupMessagesData: {
    Count: 0,
    Items: []
  },
  firstRequestMade: false
}

export const groupMessagesReducers = createReducer(
  initialState,
  on(GroupMessagesActions.storeGroupMessages, (state, { groupsMessages }) => {
    return {
      ...state,
      groupMessagesData: groupsMessages,
      firstRequestMade: true
    }
  })
)