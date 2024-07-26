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

export const firstRequestValue = createSelector(
  getGroupsState,
  (state: GroupsState) => state.firstRequestMade
)

// Get the author of the group.
export const groupAuthor = (groupID: string) => createSelector(
  getGroupsState,
  (state: GroupsState) => {
    const group = state.groupsData.Items.find(group => group.id.S === groupID);

    return <string>group?.createdBy.S;
  }
)