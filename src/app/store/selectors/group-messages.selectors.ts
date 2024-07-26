import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { GroupMessagesState } from "../reducers/group-messages.reducers";

export const getMessagesState = (state: AppState) => state.groupMessagesData

// export const groupMessages = (groupId: string | null) => createSelector(
//   getMessagesState,
//   (state: GroupMessagesState) =>
//     state.groups[groupId as string]?.messages
// )

export const groupMessages = (groupId: string | null) => createSelector(
  getMessagesState,
  (state: GroupMessagesState) => {
    const messagesArray = (state.groups[groupId as string]?.messages)?.slice();

    messagesArray?.sort((a, b) => Number(a.createdAt.S) - Number(b.createdAt.S))

    return messagesArray;
  }
)

export const firstRequestValue = createSelector(
  getMessagesState,
  (state: GroupMessagesState) => state
)

// Get the timestamp of the last message from the group.
export const messageTimestamp = (groupId: string | null) => createSelector(
  getMessagesState,
  (state: GroupMessagesState) => {
    const group = state.groups[groupId as string];
    const messages = group?.messages || [];
    // const lastMessage = group?.messages[group?.messages?.length - 1].createdAt.S;

    const createdAtValues = messages.map(message => Number(message.createdAt.S));

    const maximumValue = Math.max(...createdAtValues);

    // return new Date(+lastMessage);
    // return +lastMessage;
    return maximumValue;
  }
)

