import { createAction, props } from '@ngrx/store';
import {User} from '../model/user.model';

export const updateUser = createAction(
  '[User Object] Update User',
  props<User>()
);

export const retrieveUserDetails = createAction(
  '[User Object/API] Retrieve User Details Success',
  props<User>()
);
