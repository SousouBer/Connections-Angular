import { GroupMessagesState } from "./reducers/group-messages.reducers";
import { GroupsState } from "./reducers/groups.reducers";
import { ParticipantsState } from "./reducers/participants.reducers";
import { ProfileState } from "./reducers/profile.reducers";

export interface AppState {
  profileData: ProfileState;
  groupsData: GroupsState;
  participantsData: ParticipantsState;
  groupMessagesData: GroupMessagesState;
}