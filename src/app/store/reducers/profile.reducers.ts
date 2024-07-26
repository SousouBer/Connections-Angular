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

export interface ProfileState {
  profileDetails: {
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
  },
  requestWasSentOnce: boolean;
}

export const initialState: ProfileState = {
  profileDetails: {
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
  },
  requestWasSentOnce: false
};

export const profileReducers = createReducer(
  initialState,
  on(ProfileActions.storeProfileToStore, (state, { profile }) => ({
    ...state,
    profileDetails: {...profile},
    requestWasSentOnce: true
  })),
  on(ProfileActions.changeUserName, (state, { name }) => ({
    ...state,
    profileDetails: {
      ...state.profileDetails,
      name: {
        S: name
      }
    }
  }))
);
