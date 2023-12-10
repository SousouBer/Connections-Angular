export interface Participant {
  name: {
    S: string;
  },
  uid: {
    S: string;
  }
}

export interface ParticipantsData {
  Count: number;
  Items: Participant[]
}

