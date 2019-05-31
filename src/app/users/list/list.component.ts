import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { Store} from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as usersActions from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading: boolean;
  error: any;
  sub = new Subscription;
  constructor(public store: Store<AppState>) { }

  ngOnInit() {
      // new action
    this.sub = this.store.select('users')
      .subscribe((resp: any) => {
        this.users = resp.users;
        this.loading = resp.loading;
        this.error = resp.error;
      });

    this.store.dispatch(new usersActions.LoadUsers());

  }

  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

}
