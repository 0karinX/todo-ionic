import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingTodoCounterComponent } from './pending-todo-counter';

@NgModule({
  declarations: [
    PendingTodoCounterComponent,
  ],
  imports: [
    IonicPageModule.forChild(PendingTodoCounterComponent),
  ],
  exports: [
    PendingTodoCounterComponent
  ]
})
export class PendingTodoCounterComponentModule {}
