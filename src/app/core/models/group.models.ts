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
