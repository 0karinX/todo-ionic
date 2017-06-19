import { TodoListFilter } from './../../app/todo/todo-filter/todo-list-filter';
import { todoLocalDB } from './../../app/di.tokens';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TodoFilterServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TodoFilterServiceProvider {

  constructor( @Inject(todoLocalDB) private _todoLocalDB ) {}

  updateUIFilter( uiFilter: TodoListFilter ): void {

      this.readUIFilterFromDB( filterFromDB => {
        if( filterFromDB.length > 0) // check if first entry
          uiFilter['_rev'] = filterFromDB[0]['_rev'];

        this._todoLocalDB.put( uiFilter );
    });
  }

  readUIFilterFromDB( callback ) {
    this._todoLocalDB.allDocs({include_docs : true}).then( result => { callback( result.rows.filter( row => row.id === 'TODO_FILTER').map( filter => filter.doc ) )} );
  }
}
