import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from './../../app/todo/todo.actions';
import { AppState } from './../../app/app.state';
import { TodoServiceProvider } from './todo-service';
import {Effect, Actions, toPayload} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class TodoEffectsService {

  constructor( private action$:          Actions,
               private _store$:          Store<AppState>,
               private _todoService:     TodoServiceProvider ) {
  }


  @Effect({dispatch: false})
  create = this.action$
              .ofType( CREATE_TODO )
              .map( toPayload )
              .withLatestFrom( this._store$.select('todos') )
              .map( ([todo, state]) => {
                this._todoService.createTodo( todo ).subscribe( createdTodo => {
                });
              });

  @Effect({dispatch: false})
  update = this.action$
              .ofType( UPDATE_TODO )
              .map( toPayload )
              .withLatestFrom( this._store$.select('todos') )
              .map( ([todo, state]) => {
                      this._todoService.readTodo( todo ).subscribe( freshTodoFromDB => {
                      todo['_rev'] = freshTodoFromDB._rev; // resolve the _rev thing.
                      this._todoService.updateTodo( todo ).subscribe( todoFromDB => {
                      });
                    });
                });

  @Effect({dispatch: false})
  delete = this.action$
              .ofType( DELETE_TODO )
              .map( toPayload )
              .withLatestFrom( this._store$.select('todos') )
              .map( ([todo, state]) => {
                  this._todoService.deleteTodo( todo ).subscribe( deletedTodo => {
                  });
              });
  }
