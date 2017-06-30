import { generateId } from './../../../app/todo/todo-id-generator';
import { Todo } from './../../../app/todo/todo';
import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController, Events } from 'ionic-angular';
import { ActionReducer, Action } from '@ngrx/store';

import moment from 'moment';

@Component({
  templateUrl: 'todo-modal-page.html'
})
export class TodoModalPage {

name:           string;
description:    string;
dateCreated: 	  string;
dateCompleted:	string;
deadline: 		  string;
intendedDate:   string;
now:            string = moment().format('YYYY-MM-DDTHH:mmZ');


todo:         Todo;   //used for update and read-only
isReadOnly:   boolean;

constructor(
              public platform:  Platform,
              public params:    NavParams,
              public viewCtrl:  ViewController,
              public events:    Events
  ) {

    this.todo = params.get('todo');
    this.isReadOnly = !!params.get('readOnly');

    if(this.todo)
      this.populateFields( this.todo );

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  handleSaveClick(): void {

    const eventType: string = this.todo ? 'todo:update' : 'todo:create'; //toggle between create and update events. // todo create an enum of actions.

    if( !this.isReadOnly ) {
      this.events.publish( eventType, this.createTodoFromModalInput() );
      this.dismiss();
    }
  }

  toggleUpdateMode(): void {
    this.isReadOnly = !this.isReadOnly;
  }

  private createTodoFromModalInput(): Todo {

      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ ');

      if(!this.todo) { // for new instance

        return new Todo(  generateId(),
                          "jece",
                          this.name,
                          this.description,
                          this.intendedDate,
                          null,
                          this.deadline,
                          now,
                          now
                        );
      }

      this.todo.name          = this.name;
      this.todo.description   = this.description;
      this.todo.deadline      = this.deadline;
      this.todo.intendedDate  = this.intendedDate;
      this.todo.dateUpdated   = now;

      return this.todo;
  }

  private populateFields( todo:Todo ){

      this.name           = todo.name;
      this.description    = todo.description;
      this.intendedDate   = todo.intendedDate;
      this.dateCompleted  = todo.dateCompleted;
      this.dateCreated    = todo.dateCreated;
      this.deadline       = todo.deadline;
  }
}
