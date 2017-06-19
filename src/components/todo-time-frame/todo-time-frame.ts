import { TodoListFilter } from './../../app/todo/todo-filter/todo-list-filter';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output()
  todoDoneToggle: EventEmitter<any> = new EventEmitter();

  @Output()
  todoTap: EventEmitter<any> = new EventEmitter();

  @Output()
  todoPress: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  handleDoneToggle( todo: Todo ) {
    console.log("TOGGLE")
    this.todoDoneToggle.emit( todo );
  }

  handleTap( todo: Todo ) {
    this.todoTap.emit( todo );
  }

  handlePress( todo: Todo ) {
    this.todoPress.emit( todo );
  }
}
