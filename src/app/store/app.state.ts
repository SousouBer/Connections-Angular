import { GroupsState } from "./reducers/groups.reducers";
import { ProfileState } from "./reducers/profile.reducers";

export interface AppState {
  profileData: ProfileState;
  groupsData: GroupsState
}