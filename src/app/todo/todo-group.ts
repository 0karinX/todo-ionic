import { Todo } from './todo';

export class TodoGroup {
  constructor( public key: string, public todos: Todo[]){}
}
