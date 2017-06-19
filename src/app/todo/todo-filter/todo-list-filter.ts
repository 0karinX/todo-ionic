export enum VisibleTodoOptions {
  ALL,
  DONE,
  NOT_DONE
}

export enum SortKeyOptions {
  INTENDED_DATE,
  DEADLINE,
  NAME,
  DATE_CREATED,
  STATUS
}

export enum GroupingOptions {
  INTENDED_DATE,
  DEADLINE,
  STATUS
}

export enum OrderOptions {
  ASC  = 1,
  DESC = -1
}

export class TodoListFilter {

  private type = "TODO_FILTER";
  private _id   = "TODO_FILTER";

  constructor( public visible:         VisibleTodoOptions,
               public sortKey:         SortKeyOptions,
               public groupingOptions: GroupingOptions,
               public sortOrder:       OrderOptions,
               public groupingOrder:   OrderOptions) {}
}
