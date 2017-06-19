import { HYDRATE_TODO_FILTER, UPDATE_TODO_FILTER } from './../todo.actions';
import { Action } from '@ngrx/store';
export function todoFilterReducer(state=[], action: Action) {

  //console.log("TODO LIST FILTER REDUCER");

	switch (action.type) {
    case HYDRATE_TODO_FILTER:
		case UPDATE_TODO_FILTER:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
}
