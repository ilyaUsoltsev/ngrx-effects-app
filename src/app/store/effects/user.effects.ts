import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import {of} from 'rxjs';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        public userService: UserService
    ) {}

    @Effect()
    loadUsers$ = this.actions$
    .pipe(
        ofType(userActions.LOAD_USER),
        switchMap((action: any) => {
            return this.userService.getUser(action.id);
        }),
        map( user => new userActions.LoadUserSuccess(user)),
        catchError( error => of(new userActions.LoadUserFail(error)))
    );

}
