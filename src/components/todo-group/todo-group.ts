import { TodoGroup } from './../../app/todo/todo-group';
import { Todo } from './../../app/todo/todo';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GroupingOptions, TodoListFilter } from './../../app/todo/todo-filter/todo-list-filter';

import moment from 'moment';

/**
 * Generated class for the TodoGroupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'todo-group',
  templateUrl: 'todo-group.html'
})
export class TodoGroupComponent {

  @Input()
  todos: Todo[];

  @Input()
  todoListFilter: TodoListFilter;

  public todoGroups: TodoGroup[];

  constructor() {}

  ngOnInit() {

    if( this.todos )
      this.todoGroups = this.groupTodo( this.todos, this.todoListFilter.groupingOptions);
  }

  ngOnChanges() {
    this.todoGroups = this.groupTodo( this.todos, this.todoListFilter.groupingOptions);
  }

  groupTodo( todos: Todo[], groupingOptions: GroupingOptions): TodoGroup[] {

    console.log( 'group todos' );

    switch( groupingOptions ) {

      case GroupingOptions.INTENDED_DATE:
        return this.groupTodosByIntendedDate( todos );

      case GroupingOptions.DEADLINE:
        return this.groupTodosByDeadline( todos );

      case GroupingOptions.STATUS:
        return this.groupTodosByStatus( todos );

      default:
         return [];
    }
  }

  groupTodosByIntendedDate( todos: Todo[] ): TodoGroup[] {

    let todoMap = {};

    for (var i = 0, len = todos.length; i < len; i++) {

      let intendedDate = todos[i].intendedDate ? this.formatDateKey( todos[i].intendedDate ) : "No Intended Date";

      todoMap[ intendedDate ] = todoMap[ intendedDate ] || new TodoGroup( intendedDate, []);
      todoMap[ intendedDate ].todos.push( todos[i] );
    }

    return this.convertObjectToMap( todoMap );
  }

  groupTodosByDeadline( todos: Todo[] ): TodoGroup[] {

    let todoMap = {
      "No Deadline": new TodoGroup("No Deadline", [])
    }

    for (var i = 0, len = todos.length; i < len; i++) {

      let deadline = todos[i].deadline ? this.formatDateKey( todos[i].deadline ) : "No Deadline";

      todoMap[ deadline ] = todoMap[ deadline ] || new TodoGroup( deadline, []);
      todoMap[ deadline ].todos.push( todos[i] );
    }

    return this.convertObjectToMap( todoMap );
  }

  groupTodosByStatus( todos: Todo[] ): TodoGroup[] {

    let todoMap = {
      "Completed":          new TodoGroup("Completed", []),
      "Not Yet Completed":  new TodoGroup("Not Yet Completed", []),
    }

    for (var i = 0, len = todos.length; i < len; i++) {

      let keyToUse = !todos[i].dateCompleted ? "Not Yet Completed" : "Completed";
      todoMap[ keyToUse ].todos.push( todos[i] );
    }

    return this.convertObjectToMap( todoMap );
  }

  private convertObjectToMap( todoGroupObj ): TodoGroup[] {

    let todoGroupArray = [];

    for (var todoGroup in todoGroupObj) {
      if (todoGroupObj.hasOwnProperty(todoGroup)) {
        let todoGroupIns = todoGroupObj[ todoGroup ];

          if( todoGroupIns && todoGroupIns.todos.length > 0)
            todoGroupArray.push( todoGroupObj[todoGroup] );
      }
    }

    return todoGroupArray;
  }

  private formatDateKey( strDate ): string {
    return moment( strDate ).format( 'MMM DD, YYYY' );
  }
}
