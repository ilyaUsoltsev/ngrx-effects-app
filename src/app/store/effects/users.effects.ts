import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as usersActions from '../actions';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import {of} from 'rxjs';

@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        public userService: UserService
    ) {}

    @Effect()
    loadUsers$ = this.actions$
    .pipe(
        ofType(usersActions.LOAD_USERS),
        switchMap(() => {
            return this.userService.getUsers();
        }),
        map( users => new usersActions.LoadUsersSuccess(users)),
        catchError( error => of(new usersActions.LoadUsersFail(error)))
    );

}
