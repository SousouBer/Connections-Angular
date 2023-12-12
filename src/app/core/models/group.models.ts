// Model of the response got from the server
export interface Groups {
  Count: string;
  Items: Group[];
}

// Interface of each individual Group.
export interface Group {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string;
  };
  createdBy: {
    S: string;
  };
}

// Interface for getting an individual group Id.
export interface GroupId {
  groupID: string;
}

// Interface for group messages.
export interface GroupMessages {
  Count: number;
  Items: GroupMessage[];
}

export interface GroupMessage {
  authodID: {
    S: string;
  },
  message: {
    S: string;
  },
  createdAt: {
    S: string;
  }
}
