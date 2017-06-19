import { ActionReducer, Action } from '@ngrx/store';
import { CREATE_TODO, FILTER_TODO } from './todo.actions';
import { READ_TODO } from './todo.actions';
import { UPDATE_TODO } from './todo.actions';
import { DELETE_TODO } from './todo.actions';
import { HYDRATE_TODO } from './todo.actions';

export function todoReducer(state=[], action: Action) {

  //console.log("TODO MAIN REDUCER");

	switch (action.type) {
		case CREATE_TODO:
      console.log("CREATE_TODO");
			return [ ...state, action.payload ];

		case UPDATE_TODO:
      console.log("UPDATE_TODO");
			return state.map( todo => updateTodo( todo, action ));

    case DELETE_TODO:
			return state.filter( todo => todo._id !== action.payload._id )

    case HYDRATE_TODO:
      return action.payload;

		default:
			return state;
	}
}

function updateTodo(state, action) {

  if(state._id === action.payload._id) {
    return Object.assign({}, state, action.payload);
  }

  return state;
}
