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
  };
}

export const initialState: ProfileState = {
  profileDetails: {
    email: {
      S: 'sosiko20@mail.ru',
    },
    name: {
      S: 'Soso',
    },
    uid: {
      S: 'asdasd',
    },
    createdAt: {
      S: 'Dec 24, 2004',
    },
  },
};

export const profileReducers = createReducer(
  initialState,
  on(ProfileActions.storeProfileToStore, (state, { profile }) => ({
    ...state,
    profileDetails: {...profile}
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
