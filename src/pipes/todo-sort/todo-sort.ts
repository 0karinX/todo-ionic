import { Todo } from './../../app/todo/todo';
import { Pipe, PipeTransform } from '@angular/core';
import { SortKeyOptions, TodoListFilter } from './../../app/todo/todo-filter/todo-list-filter';

import moment from 'moment';


/**
 * Generated class for the TodoSortPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'todosort',
})
export class TodoSortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform( todos: Todo[], todoListFilter: TodoListFilter) {

    switch( todoListFilter.sortKey ) {

      case SortKeyOptions.DATE_CREATED:
        return todos.sort(( todo1, todo2 ) => {
                                                return (moment( todo1.dateCreated ).isBefore( moment( todo2.dateCreated )) ? -1 : 1) * todoListFilter.sortOrder
                                              });

      case SortKeyOptions.INTENDED_DATE:
        return todos.sort(( todo1, todo2 ) => {
                                                return (moment( todo1.intendedDate ).isBefore( moment( todo2.intendedDate )) ? -1 : 1) * todoListFilter.sortOrder
                                              });

      case SortKeyOptions.DEADLINE:
        return todos.sort(( todo1, todo2 ) => {
                                                return (moment( todo1.deadline ).isBefore( moment( todo2.deadline )) ? -1 : 1) * todoListFilter.sortOrder
                                              });

      case SortKeyOptions.NAME:
        return todos.sort(( todo1, todo2 ) => {
                                                return ( todo1.name < todo2.name ? -1 : todo1.name === todo2.name ? 0 : 1 ) * todoListFilter.sortOrder
                                              });

      case SortKeyOptions.STATUS:
        return todos.sort(( todo1, todo2 ) => {
                                                return ( todo1.dateCompleted && !todo2.dateCompleted ? 1 : !todo1.dateCompleted && todo2.dateCompleted ? -1 : 0) * todoListFilter.sortOrder
                                              });
      default:
        return todos;
    }
  }
}
