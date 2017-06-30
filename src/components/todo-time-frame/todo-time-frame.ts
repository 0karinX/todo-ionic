import { TodoListFilter } from './../../app/todo/todo-filter/todo-list-filter';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TodoTimeframeEnum } from './../../app/todo/todo-time-frame-enum'
import { Todo } from './../../app/todo/todo';

/**
 * Generated class for the TodoTimeFrameComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'todo-time-frame',
  templateUrl: 'todo-time-frame.html'
})
export class TodoTimeFrameComponent {

  @Input()
  public todoTimeframe: TodoTimeframeEnum;

  @Input()
  public todos;

  @Input()
  public todoListFilter: TodoListFilter;

  constructor() {}
}
