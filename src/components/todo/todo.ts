import { Events } from 'ionic-angular';
import { Todo } from './../../app/todo/todo';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the TodoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'todo',
  templateUrl: 'todo.html'
})
export class TodoComponent {

  @Input()
  public todo: Todo;

  @Output()
  todoDoneToggle: EventEmitter<any> = new EventEmitter();

  @Output()
  todoTap: EventEmitter<any> = new EventEmitter();

  @Output()
  todoPress: EventEmitter<any> = new EventEmitter();

  constructor(private _eventsCtrl: Events) {

  }

  handleDoneToggle() {
    //this.todoDoneToggle.emit( this.todo );
    this._eventsCtrl.publish( "todo:doneToggle", this.todo );
  }

  handleTap() {
    this._eventsCtrl.publish( "todo:tap", this.todo );
  }

  handlePress() {
    this._eventsCtrl.publish( "todo:press", this.todo );
  }
}
