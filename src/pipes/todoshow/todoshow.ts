import { Todo } from './../../app/todo/todo';
import { Pipe, PipeTransform } from '@angular/core';
import { VisibleTodoOptions } from './../../app/todo/todo-filter/todo-list-filter';

/**
 * Generated class for the TodoshowPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'todovisibile',
})
export class TodoshowPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(todos: Todo[], visibility: VisibleTodoOptions) {

    switch( visibility ) {
      case VisibleTodoOptions.ALL:
        return todos;
      case VisibleTodoOptions.DONE:
        return todos.filter( todo => todo.dateCompleted );
      case VisibleTodoOptions.NOT_DONE:
        return todos.filter( todo => !todo.dateCompleted );
      default:
        return todos;
    }
  }
}
