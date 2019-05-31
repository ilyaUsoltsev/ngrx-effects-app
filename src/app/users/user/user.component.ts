import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { LoadUser } from '../../store/actions';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  loaded: boolean;
  loading: boolean;
  error: any;
  sub = new Subscription();
  constructor(private router: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.sub = this.store.select('user')
      .subscribe((resp: any) => {
        this.user = resp.user;
        this.loaded = resp.loaded;
        this.loading = resp.loading;
        this.error = resp.error;
        console.log(resp);
      });
    this.router.params.subscribe( params => {
      const id = params['id'];
      this.store.dispatch( new LoadUser(id) );
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
