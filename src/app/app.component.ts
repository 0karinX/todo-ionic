import { TodoListFilter } from './todo/todo-filter/todo-list-filter';
import { defaultFilterOpts } from './di.tokens';
import { TodoFilterServiceProvider } from './../providers/todo-filter-service/todo-filter-service';
import { HYDRATE_TODO, HYDRATE_TODO_FILTER } from './todo/todo.actions';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { TodoServiceProvider } from './../providers/todo-service/todo-service';
import { Component, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TodoListPage } from '../pages/todo-list/todo-list';
import 'rxjs/add/observable/fromPromise';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TodoListPage;

  constructor(platform:                   Platform,
              statusBar:                  StatusBar,
              splashScreen:               SplashScreen,
              private _todoStore:         Store<AppState>,
              private _todoService:       TodoServiceProvider,
              private _todoFilterService: TodoFilterServiceProvider,
              @Inject(defaultFilterOpts) private _defaultFilterOpts: TodoListFilter) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide
    });

  }

  ngOnInit() {
    this.hydrateState();
  }

  hydrateState() {

      const todosFromDB = this._todoService.readTodos().subscribe( todos => {
        this._todoStore.dispatch({type: HYDRATE_TODO, payload: todos});
      });

      const showFilterFromDB = this._todoFilterService.readUIFilterFromDB( uiFilter => {
        this._todoStore.dispatch({type: HYDRATE_TODO_FILTER, payload: ( uiFilter.length > 0 ? uiFilter[0] : this._defaultFilterOpts)})
      });
  }
}
