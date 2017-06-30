import { Todo } from './../../app/todo/todo';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'pending-todo-counter',
  templateUrl: 'pending-todo-counter.html'
})
export class PendingTodoCounterComponent {

  @Input()
  public todos: Todo[];
  public pendingCount = 0;

  constructor() {}

  ngOnChanges() {
    this.pendingCount = this.todos.filter( todo => {
      return !todo.dateCompleted;
    }).length;
  }
}
