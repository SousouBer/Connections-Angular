import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { GroupsState } from "../reducers/groups.reducers";

export const getGroupsState = (state: AppState) => state.groupsData;

export const totalCount = createSelector(
  getGroupsState,
  (state: GroupsState) => state.groupsData.Count
)

export const groupItems = createSelector(
  getGroupsState,
  (state: GroupsState) => state.groupsData.Items
)