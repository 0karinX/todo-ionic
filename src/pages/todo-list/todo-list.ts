import { TodoTimeFrameComponent } from './../../components/todo-time-frame/todo-time-frame';
import { TodoListFilter } from './../../app/todo/todo-filter/todo-list-filter';
import { TodoListFilterPopover } from './todo-list-filter-popover/todo-list-filter.popover';
import { TodoModalPage } from './todo-modal-page/todo-modal-page';
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO, UPDATE_TODO_FILTER } from './../../app/todo/todo.actions';
import { AppState } from './../../app/app.state';
import { TodoServiceProvider } from './../../providers/todo-service/todo-service';
import { Todo } from './../../app/todo/todo';
import { Component, Inject, ViewChild } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController, Events, PopoverController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TodoTimeframeEnum } from './../../app/todo/todo-time-frame-enum'

import moment from 'moment';

import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector:     'page-todo-list',
  templateUrl:  'todo-list.html'
})
export class TodoListPage {

  @ViewChild('pastFrame')
  public pastFrame: TodoTimeFrameComponent;

  @ViewChild('presentFrame')
  public presentFrame: TodoTimeFrameComponent;

  @ViewChild('futureFrame')
  public futureFrame: TodoTimeFrameComponent;

  public todos;
  public todoListFilter: TodoListFilter;
  public todoTimeframe = TodoTimeframeEnum;
  public todoFilterModeFriendlyName;
  public selectedTodoTimeframe = TodoTimeframeEnum.PRESENT;

  constructor(public navCtrl:           NavController,
              public modalCtrl:         ModalController,
              public actionSheetCtrl:   ActionSheetController,
              public alertCtrl:         AlertController,
              public popoverCtrl:       PopoverController,
              public events:            Events,
              private _todoStore:       Store<AppState>,
              private _todoListService: TodoServiceProvider
              ) {

      this.todos = this._todoStore.select('todos');

  }

  ngOnInit() {

    this._todoStore.select('todoListFilter')
                      .distinctUntilChanged()
                      .subscribe( ( filter: TodoListFilter ) => {
                                                                  this.todoListFilter = filter;
                                                                });
    this.subscribeToGlobalTodoEvents();


  }

  subscribeToGlobalTodoEvents(): void {

    this.events.subscribe('todo:create', todo => {
        this._todoStore.dispatch({type: CREATE_TODO, payload: todo});
    });

    this.events.subscribe('todo:update', todo => {
        this._todoStore.dispatch({type: UPDATE_TODO, payload: todo});
    });

    this.events.subscribe('todo:filter', ( filterOpts: TodoListFilter ) => {
      this._todoStore.dispatch({type: UPDATE_TODO_FILTER, payload: filterOpts});
    });

    this.events.subscribe('todo:doneToggle', ( todo: Todo ) => {
      this.toggleDone( todo );
    });

    this.events.subscribe('todo:tap', ( todo: Todo ) => {
      this.handleTap( todo );
    });

    this.events.subscribe('todo:press', ( todo: Todo ) => {
       this.handlePress( todo );
    });
  }

  delete( todo: Todo ): void {

    this.presentConfirmAlert('Delete Task', 'Delete task?', 'Yeah', 'No', () => {
      this._todoStore.dispatch({type: DELETE_TODO, payload: todo});
    }, () => {});
  }

  handlePress( todo: Todo ): void {
    this.presentActionSheet( todo);
  }

  handleTap( todo: Todo ): void {

    this.presentModal({ todo: todo, readOnly: true } );
  }

  handleSwipe( event ): void {
    this.selectedTodoTimeframe = event.direction === 2 ? this.selectedTodoTimeframe + 1 : event.direction === 4 ? this.selectedTodoTimeframe - 1 : this.selectedTodoTimeframe;
    this.selectedTodoTimeframe = Math.min(Math.max(this.selectedTodoTimeframe, 0), 2);
  }

  toggleDone( todo: Todo ): void {
      if(todo.dateCompleted)
        return;

      todo.dateCompleted = moment().format('YYYY-MM-DDTHH:mmZ');
      this._todoStore.dispatch({type: UPDATE_TODO, payload: todo});
  }

  handleUndone( todo: Todo): void {

      if(!todo.dateCompleted)
        return;

    todo.dateCompleted = null;
    this._todoStore.dispatch({type: UPDATE_TODO, payload: todo});
  }

  presentModal( params: Object ) {

    let modal = this.modalCtrl.create(TodoModalPage, params);
    modal.present();
  }

  presentActionSheet( todo: Todo ) {

      let actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Undone',
            handler: () => {
              this.handleUndone( todo );
            }
          },
          {
            text: 'Edit',
            handler: () => {
              this.presentModal({ todo: todo } );
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
                this.delete( todo );
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });

      actionSheet.present();
  }

  presentPopover( event ) {
    let popover = this.popoverCtrl.create( TodoListFilterPopover );
    popover.present({
      ev: event
    });
  }

  presentConfirmAlert(title: string,
                      message: string,
                      posBtnLabel: string,
                      negBtnLabel: string,
                      posBtnHandler: Function,
                      negBtnHandler: Function) {

    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: posBtnLabel,
          handler: () => {
            posBtnHandler();
          }
        },
        {
          text: negBtnLabel,
          handler: () => {
            negBtnHandler();
          }
        }
      ]
    });

    confirm.present();
  }
}

