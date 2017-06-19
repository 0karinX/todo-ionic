import { TodoListFilter, OrderOptions, GroupingOptions } from './../../app/todo/todo-filter/todo-list-filter';
import { TodoGroup } from './../../app/todo/todo-group';
import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

/**
 * Generated class for the TodoGroupSortPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'todogroupsort',
})
export class TodoGroupSortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform( todoGroups: TodoGroup[], todoListFilter: TodoListFilter): TodoGroup[] {

      switch( todoListFilter.groupingOptions ) {

        case GroupingOptions.INTENDED_DATE:
        case GroupingOptions.DEADLINE:

          return todoGroups.sort(( todoGroup1, todoGroup2 ) => {
                                  return ((moment( todoGroup1.key ).isBefore( moment( todoGroup2.key )) ? -1 : 1) * todoListFilter.groupingOrder);
                                });

        case GroupingOptions.STATUS:
          return todoGroups.sort(( todoGroup1, todoGroup2 ) => {
                                  return ( todoGroup1.key === "Completed" ? 1 : -1 ) * todoListFilter.groupingOrder;
                                });

        default:
          return todoGroups;
      }
  }
}
