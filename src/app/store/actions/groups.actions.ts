import { createAction, props } from "@ngrx/store";
import { Groups } from "src/app/core/models/group.models";

export const getGroups = createAction(
  '[Group API] Load Groups'
)

export const storeGroups = createAction(
  '[Group API] Load Success',
  props< { groups: Groups }>()
)