import { TodoListFilter } from './todo/todo-filter/todo-list-filter';
import { TodoFilterEffectsServiceProvider } from './../providers/todo-filter-service/todo-filter-effects-service';
import { TodoListFilterPopover } from './../pages/todo-list/todo-list-filter-popover/todo-list-filter.popover';
import { TodoModalPage } from './../pages/todo-list/todo-modal-page/todo-modal-page';
import { TodoEffectsService } from './../providers/todo-service/todo-effects';
import { TodoListPage } from './../pages/todo-list/todo-list';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { todoReducer } from './todo/todo.reducer';
import { todoLocalDB, defaultFilterOpts, todoRemoteDB } from './di.tokens';
import { MyApp } from './app.component';
import { TodoServiceProvider } from '../providers/todo-service/todo-service';

import PouchDB from 'pouchdb';
import { TodoTimeFrameComponent } from '../components/todo-time-frame/todo-time-frame';
import { TodoComponent } from '../components/todo/todo';
import { TodoTimeframePipe } from '../pipes/todo-timeframe/todo-timeframe';
import { TodoFilterServiceProvider } from '../providers/todo-filter-service/todo-filter-service';
import { todoFilterReducer } from './todo/todo-filter/todo-filter.reducer'
import { VisibleTodoOptions, SortKeyOptions, GroupingOptions, OrderOptions} from './todo/todo-filter/todo-list-filter'
import { TodoSortPipe } from '../pipes/todo-sort/todo-sort';
import { TodoshowPipe } from '../pipes/todoshow/todoshow';
import { TodoGroupComponent } from '../components/todo-group/todo-group';
import { TodoGroupSortPipe } from '../pipes/todo-group-sort/todo-group-sort';
import { PendingTodoCounterComponent } from '../components/pending-todo-counter/pending-todo-counter';
import { TillDeadlineCounterComponent } from '../components/till-deadline-counter/till-deadline-counter';

export const provideTodoLocalDB = () => {
  let todoPouch = new PouchDB( 'todos' );
  return todoPouch;
}

export const provideTodoRemoteDB = () => {
  // let todoRemotePouch = new PouchDB('http://localhost:5984/todos');
  let todoRemotePouch = new PouchDB('https://0karinxxx.cloudant.com/todos');

  return todoRemotePouch;
}

export const provideDefaultFilterOpts = () => {
  return new TodoListFilter( VisibleTodoOptions.ALL, SortKeyOptions.DEADLINE, GroupingOptions.INTENDED_DATE, OrderOptions.ASC, OrderOptions.ASC);
}

@NgModule({
  declarations: [
    MyApp,
    TodoListPage,
    TodoTimeFrameComponent,
    TodoComponent,
    TodoTimeframePipe,
    TodoModalPage,
    TodoListFilterPopover,
    TodoSortPipe,
    TodoshowPipe,
    TodoGroupComponent,
    TodoGroupSortPipe,
    PendingTodoCounterComponent,
    TillDeadlineCounterComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({ todos: todoReducer, todoListFilter:  todoFilterReducer }),
    EffectsModule.run( TodoEffectsService ),
    EffectsModule.run( TodoFilterEffectsServiceProvider )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodoListPage,
    TodoModalPage,
    TodoListFilterPopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoServiceProvider,
    { provide:    todoLocalDB,
      useFactory: provideTodoLocalDB
    },
    { provide:    todoRemoteDB,
      useFactory: provideTodoRemoteDB
    },
    {
      provide: defaultFilterOpts,
      useFactory: provideDefaultFilterOpts
    },
    TodoFilterServiceProvider,
    TodoFilterEffectsServiceProvider
  ]
})
export class AppModule {}
