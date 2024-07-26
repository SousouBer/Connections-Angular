export interface Participant {
  name: {
    S: string;
  },
  uid: {
    S: string;
  },
  conversationID?: string;
}

export interface ParticipantsData {
  Count: number;
  Items: Participant[]
}

export interface ConversationsPData {
  Count: number;
  Items: ConversationP[];
}

export interface ConversationP {
  id: {
    S: string;
  },
  companionID: {
    S: string;
  }
}

