import { createReducer, on } from '@ngrx/store';

import { GroupMessage, GroupMessages } from 'src/app/core/models/group.models';
import * as GroupMessagesActions from '../actions/group-messages.actions';
import { state } from '@angular/animations';

// interface GroupItems {
//   [groupID: string]: {
//     messages: GroupMessages[];
//     firstRequestMade: boolean;
//   };
// }

// export interface GroupMessagesState {
//   groupMessagesData: GroupItems;
// }

// export const initialState: GroupMessagesState = {
//   groupMessagesData: {}
// }

interface GroupItems {
  messages: GroupMessage[];
  firstRequestMade: boolean;
}

export interface GroupsState {
  [groupID: string]: GroupItems;
}

export interface GroupMessagesState {
  groups: GroupsState;
}

export const initialState: GroupMessagesState = {
  groups: {},
};

// export const groupMessagesReducers = createReducer(
//   initialState,
//   on(GroupMessagesActions.storeGroupMessages, (state, { groupID, groupsMessages }) => {
//     return {
//       group: {
//         ...state.groups,
//         [groupID]: {
//           messages: groupsMessages.Items,
//           firstRequestMade: true
//         }
//       }
//     }
//   })
// )

export const groupMessagesReducers = createReducer(
  initialState,
  on(
    GroupMessagesActions.storeGroupMessages,
    (state, { groupID, groupsMessages }) => {
      return {
        groups: {
          ...state.groups,
          [groupID]: {
            messages: groupsMessages.Items,
            firstRequestMade: true,
          },
        },
      };
    }
  ),
  on(
    GroupMessagesActions.storeUpdatedMessages,
    (state, { groupID, newMessages }) => {
      const existingMessages = state.groups[groupID]?.messages || [];

      // Combine the existing messages with the new messages
      const updatedMessages = [...existingMessages, ...newMessages.Items];
      return {
        ...state,
        groups: {
          ...state.groups,
          [groupID]: {
            ...state.groups[groupID],
            messages: updatedMessages,
          },
        },
      };
    }
  )
);
