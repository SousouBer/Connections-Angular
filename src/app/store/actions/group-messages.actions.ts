import { createAction, props } from '@ngrx/store';
import { GroupMessages } from '../../core/models/group.models';

export const getGroupMessages = createAction(
  '[Group API] Load Group Messages',
  props<{ groupID: string }>()
);

export const storeGroupMessages = createAction(
  '[Group API] Load Messages Success',
  props<{ groupsMessages: GroupMessages }>()
);
