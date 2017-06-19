import { AppState } from './../../../app/app.state';
import { Store } from '@ngrx/store';
import { defaultFilterOpts } from './../../../app/di.tokens';
import { TodoListFilter, VisibleTodoOptions, SortKeyOptions, GroupingOptions, OrderOptions } from './../../../app/todo/todo-filter/todo-list-filter';
import { Events, ViewController } from 'ionic-angular';
import { Component, Inject } from '@angular/core';

import 'rxjs/add/operator/distinctUntilChanged';

@Component({
     selector:  'popover-todo-list-filter',
  templateUrl:  'todo-list-filter-popover.html'
})
export class TodoListFilterPopover {

  public filterOpts;
  public visibleTodoOptions = VisibleTodoOptions;
  public sortKeyOptions     = SortKeyOptions;
  public groupingOptions    = GroupingOptions;
  public orderOptions       = OrderOptions;

  constructor( private _eventsCtrl: Events,
               private _viewCtrl:   ViewController,
               private _todoStore:  Store<AppState> ){

    this._todoStore.select('todoListFilter')
                    .subscribe( filter => {
                                            this.filterOpts = filter;
                                          });
  }

  filterTodo( value ): void {
      this._eventsCtrl.publish( "todo:filter", this.filterOpts );
  }
}
