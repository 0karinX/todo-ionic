import { TodoListFilter } from './todo/todo-filter/todo-list-filter';
import { Todo } from './todo/todo'

export interface AppState {
  todos: Todo[];
  todoListFilter: TodoListFilter;
}
