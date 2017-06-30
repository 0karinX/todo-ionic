import moment from 'moment';

export const getPresentTodos = todos => {
    const today = moment().format('YYYY-MM-DD');
    let filtered = todos.filter( todo => {
      return (!todo.intendedDate || (moment( todo.intendedDate ).format('YYYY-MM-DD') === today ))
    });
    return filtered;
  }

export const getPastTodos = todos => {
    const today = moment( new Date() ).format('YYYY-MM-DD');
    return todos.filter( todo => (moment( todo.intendedDate ).isBefore( today )));
  }

export const getFutureTodos = todos => {
    const today = moment( new Date() ).format('YYYY-MM-DD');
    console.log(today);

      return todos.filter( todo => {

        console.log(moment( todo.intendedDate).format('YYYY-MM-DD' ) + " is after " + today + " =  " + (moment( todo.intendedDate).format('YYYY-MM-DD' ) > today + ""));
        return todo.intendedDate && (moment( todo.intendedDate).format('YYYY-MM-DD' ) > ( today ))
    });
  }
