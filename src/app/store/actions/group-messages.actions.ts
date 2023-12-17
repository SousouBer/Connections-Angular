import { createAction, props } from '@ngrx/store';
import { GroupMessages } from '../../core/models/group.models';

export const getGroupMessages = createAction(
  '[Group API] Load Group Messages',
  props<{ groupID: string }>()
);

export const storeGroupMessages = createAction(
  '[Group API] Load Messages Success',
  props<{ groupID: string, groupsMessages: GroupMessages }>()
);

export const loadMessages = createAction(
  '[Group Section] Load Group Messages',
  props< { groupID: string } >()
)

// Send a message to the selected group.
export const sendMessageToGroup = createAction(
  '[Group Dialog API] Send A Message',
  props< { groupID: string, textMessage: string, timestamp?: number } >()
)

// Update group messages using timestamp (The date the latest message was sent).
export const updateGroupMessages = createAction(
  '[Group API] Update Messages',
  props<{ groupID: string, timestamp: number}>()
)

// Add new messages to the excisting group.
export const storeUpdatedMessages = createAction(
  '[Group Section] Add Updated Messages',
  props< { groupID: string, newMessages: GroupMessages } >()
)

// Update group messages.
export const updateMessages = createAction(
  '[Group Section] Update Messages'
)