import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';

export interface Profile {
  email: {
    S: string;
  };
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

// export interface ProfileState {
//   profileDetails: {
//     email: {
//       S: string;
//     };
//     name: {
//       S: string;
//     };
//     uid: {
//       S: string;
//     };
//     createdAt: {
//       S: string;
//     };
//   };
// }

export interface ProfileState {
  email: {
    S: string;
  };
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export const initialState: ProfileState = {
    email: {
      S: '',
    },
    name: {
      S: '',
    },
    uid: {
      S: '',
    },
    createdAt: {
      S: '',
    },
};

export const profileReducers = createReducer(
  initialState,
  on(ProfileActions.storeProfileToStore, (state, { profile }) => ({
    ...state,
    ...profile,
  }))
);
