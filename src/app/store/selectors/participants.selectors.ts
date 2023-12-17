import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ParticipantsState } from '../reducers/participants.reducers';
import { Participant } from 'src/app/core/models/participants.models';

export const participantsState = (state: AppState) => state.participantsData;

export const TotalCount = createSelector(
  participantsState,
  (state: ParticipantsState) => state.participantsData.Count
);

export const participantItems = createSelector(
  participantsState,
  (state: ParticipantsState) => state.participantsData.Items
);

// Get the name of the participant using it's unique id.
export const messageAuthorName = (creatorID: string) => createSelector(
  participantsState,
  (state: ParticipantsState) => {
    const user = state.participantsData.Items.find(user => user.uid.S === creatorID);

    return <Participant>user;
  }
)

export const firstRequestValue = createSelector(
  participantsState,
  (state: ParticipantsState) => state.firstRequestMade
);

export const showParticipants = createSelector(
  participantsState,
  (state: ParticipantsState) => {
    return state.participantsData.Items.map((participant) => {
      const matchingActiveParticipant = state.conversationParticipants.find(
        (activeConversationP) =>
          participant.uid.S === activeConversationP.companionID.S
      );

      if (matchingActiveParticipant) {
        // Create a new object with existing participant properties and additional property
        return {
          ...participant,
          conversationID: matchingActiveParticipant.id.S,
        };
      }

      // Return the original participant if no match is found
      return participant;
    });
  }
);

// const finalResult = [];

// const participantItems = state.participantsData.Items.slice();
// const activeConversationPs = state.conversationParticipants.slice();

// for (let participant of participantItems) {
//   for (let activeConversationP of activeConversationPs) {
//     if (participant.uid.S === activeConversationP.companionID.S) {
//       const participantObject = participant;
//       participantObject.conversationID = activeConversationP.id.S;

//       finalResult.push(participantObject);
//     }
//   }
// }

// return finalResult;
