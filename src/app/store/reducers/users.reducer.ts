import { User } from '../../models/user.model';
import * as fromUsers from '../actions';

export interface UsersState {
    users: User[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const stateInitial: UsersState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};

export function usersReducer( state = stateInitial, action: fromUsers.usersActions): UsersState {

    switch (action.type) {

        case fromUsers.LOAD_USERS:
            return {
                ...state,
                loading: true
            };

        case fromUsers.LOAD_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: [...action.users]
            };

        case fromUsers.LOAD_USERS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                   status: action.payload.status,
                   message: action.payload.message,
                   url: action.payload.url
                }
            };

        default:
            return state;
    }

}
