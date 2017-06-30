import { getPastTodos, getPresentTodos, getFutureTodos } from './todo-timeframe-classifier';
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
          return getPastTodos( todos );


        case TodoTimeframeEnum.PRESENT:
          return getPresentTodos( todos );

        case TodoTimeframeEnum.FUTURE:
          return getFutureTodos( todos );

        default:
          return todos;
    }
  }
}
