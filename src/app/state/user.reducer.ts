import { retrieveUserDetails, updateUser } from './user.actions';
import { createReducer, on } from '@ngrx/store';


export const userReducer = createReducer(
  {},
  on(retrieveUserDetails, (state,  user ) => (user)),
  on(updateUser, (state, user) => (user))
);
