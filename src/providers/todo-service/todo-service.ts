import { Observable } from 'rxjs/Observable';
import { todoRemoteDB, todoLocalDB } from './../../app/di.tokens';
import { TodoListFilter } from './../../app/todo/todo-filter/todo-list-filter';
import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Todo } from './../../app/todo/todo'

import PouchDB from 'pouchdb';
import moment from 'moment';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoServiceProvider {

  constructor( @Inject(todoLocalDB) private _todoLocalDB,
               @Inject(todoRemoteDB) private _todoRemoteDB ) {

    window['PouchDB'] = PouchDB;
    //this.syncToRemoteDB();
  }

  private dummyInitialState = [
        {
          _id:            "1",
          name:           "Sample 1",
          description:    "sample description for the todo",
          intendedDate:   moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       moment().format('YYYY-MM-DDTHH:mmZ')
        },
        {
          _id:  "2",
          name: "Sample 2",
          description: "sample description for the todo",
          intendedDate:   moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       null
        },
        {
          _id:  "3",
          name: "Sample 3",
          description: "sample description for the todo",
          intendedDate:   moment().add(2, 'days').format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       moment().format('YYYY-MM-DDTHH:mmZ')
        },
        {
          _id:  "4",
          name: "Sample 4",
          description: "sample description for the todo",
          intendedDate:   moment().add(3, 'days').format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       null
        },
        {
          _id:  "5",
          name: "Sample 5",
          description: "sample description for the todo",
          intendedDate:   moment().add(3, 'days').format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       moment().format('YYYY-MM-DDTHH:mmZ')
        },
        {
          _id:  "6",
          name: "Sample 6",
          description: "sample description for the todo",
          intendedDate:   moment().add(4, 'days').format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       moment().format('YYYY-MM-DDTHH:mmZ')
        },
        {
          _id:  "7",
          name: "Sample 7",
          description: "sample description for the todo",
          intendedDate:   moment().add(4, 'days').format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       moment().format('YYYY-MM-DDTHH:mmZ')
        },
        {
          _id:  "8",
          name: "Sample 8",
          description: "sample description for the todo",
          intendedDate:   moment().add(1, 'months').format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       moment().format('YYYY-MM-DDTHH:mmZ')
        },
        {
          _id:  "9",
          name: "Sample 9",
          description: "sample description for the todo",
          intendedDate:   moment().add(1, 'months').format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       moment().format('YYYY-MM-DDTHH:mmZ')
        },
         {
          _id:  "10",
          name: "Sample 10",
          description: "sample description for the todo",
          intendedDate:   moment().add(2, 'months').format('YYYY-MM-DDTHH:mmZ'),
          dateCreated:    moment().format('YYYY-MM-DDTHH:mmZ'),
          dateCompleted:  null,
          deadline:       moment().format('YYYY-MM-DDTHH:mmZ')
        }
      ];

  // storeLatestTodosToLocalDB( state ): void {

  //   console.log('storing!');
  //   console.log(state);
  //   localForage.setItem( 'todos', state );
  // }

  // getLatestTodosFromLocalDB( callback ) {
  //   localForage.getItem('todos')
  //               .then( callback );
  // }


  // localdb CRUD operations
  createTodo( todo ): Observable<any> {
    return Observable.fromPromise( this._todoLocalDB.put( todo ) );
  }

  readTodo( todo ): Observable<any> {
    return Observable.fromPromise( this._todoLocalDB.get( todo._id));
  }

  readTodos(): Observable<any> {

    return Observable.fromPromise(this._todoLocalDB.allDocs({include_docs : true}))
                     .map( result => result['rows'].filter( row => row.id !== 'TODO_FILTER')
                     .map( todo => todo.doc));
  }

  updateTodo( todo ): Observable<any> {

    this.readTodos().subscribe(todos => console.log( todos ));

    console.log("UPDATE IN POUCH");
    console.log(todo);
    return Observable.fromPromise( this._todoLocalDB.put( todo ) );
  }

  deleteTodo( todo ): Observable<any> {
    console.log("DELETE IN POUCH");
    return Observable.fromPromise( this._todoLocalDB.remove( todo ) );
  }

  // countDocs( criteria ) {
  //    this.readTodos( (todos) => {
  //      todos.filter(criteria);
  //    });
  // }

syncToRemoteDB(): Observable<any> {

  const subject: Subject<any> = new Subject();

  //Remote DB operations
  this._todoLocalDB.sync(this._todoRemoteDB,
        {
          live: true,
          retry: true,
           auth: {
            username: "nothementoontermonenderr",
            password: "c26888e30629163ef72b00f3d5ffd2356b37bdfc"
        }
      })
      .on('change', function (change) {
        subject.next(change);
        subject.complete();
      }).on('paused', function (info) {
        // replication was paused, usually because of a lost connection
      }).on('active', function (info) {
        // replication was resumed
      }).on('error', function (err) {
            console.log('something error');
            console.log(err);
      });

  return subject.asObservable();
}

  // dev only functions
  initDummyDB() {
    this._todoLocalDB.bulkDocs( this.dummyInitialState );
  }
}

