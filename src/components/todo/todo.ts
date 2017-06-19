import { Todo } from './../../app/todo/todo';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the TodoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'todo',
  templateUrl: 'todo.html'
})
export class TodoComponent {

  @Input()
  public todo: Todo;

  @Output()
  todoDoneToggle: EventEmitter<any> = new EventEmitter();

  @Output()
  todoTap: EventEmitter<any> = new EventEmitter();

  @Output()
  todoPress: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  handleDoneToggle() {
    this.todoDoneToggle.emit( this.todo );
  }

  handleTap() {
    this.todoTap.emit( this.todo );
  }

  handlePress() {
    this.todoPress.emit( this.todo );
  }
}
