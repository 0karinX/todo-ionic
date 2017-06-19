import { Todo } from './../../app/todo/todo';
import { Pipe, PipeTransform } from '@angular/core';
import { TodoTimeframeEnum } from './../../app/todo/todo-time-frame-enum';
import moment from 'moment';

/**
 * Generated class for the TodoTimeframePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'todotimeframe',
})
export class TodoTimeframePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform( todos: Todo[], todoTimeframeEnum: TodoTimeframeEnum ) {

      switch ( todoTimeframeEnum ) {
        case TodoTimeframeEnum.PAST:
          return this.getPastTodos( todos );


        case TodoTimeframeEnum.PRESENT:
          return this.getPresentTodos( todos );

        case TodoTimeframeEnum.FUTURE:
          return this.getFutureTodos( todos );

        default:
          return todos;
    }
  }

  getPresentTodos = todos => {
    const today = moment().format('YYYY-MM-DD');
    let filtered = todos.filter( todo => {
      return (!todo.intendedDate || (moment( todo.intendedDate ).format('YYYY-MM-DD') === today ))
    });
    return filtered;
  }

  getPastTodos = todos => {
    const today = moment( new Date() ).format('YYYY-MM-DD');
    return todos.filter( todo => (moment( todo.intendedDate ).isBefore( today )));
  }

  getFutureTodos = todos => {
    const today = moment( new Date() ).format('YYYY-MM-DD');
    console.log(today);

      return todos.filter( todo => {

        console.log(moment( todo.intendedDate).format('YYYY-MM-DD' ) + " is after " + today + " =  " + (moment( todo.intendedDate).format('YYYY-MM-DD' ) > today + ""));
        return todo.intendedDate && (moment( todo.intendedDate).format('YYYY-MM-DD' ) > ( today ))
    });
  }
}
