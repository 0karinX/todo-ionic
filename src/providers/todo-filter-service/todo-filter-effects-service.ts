import { UPDATE_TODO_FILTER } from './../../app/todo/todo.actions';
import { Effect, toPayload } from '@ngrx/effects';
import { TodoFilterServiceProvider } from './todo-filter-service';
import { AppState } from './../../app/app.state';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TodoFilterEffectsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TodoFilterEffectsServiceProvider {

  constructor( private action$:            Actions,
               private _store$:            Store<AppState>,
               private _todoFilterService: TodoFilterServiceProvider) {}


  @Effect({dispatch: false})
  updateUiFilter = this.action$
                        .ofType( UPDATE_TODO_FILTER )
                        .map( toPayload )
                        .map( filter => {
                          this._todoFilterService.updateUIFilter( filter );
                        });
}
