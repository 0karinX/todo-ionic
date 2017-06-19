import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoGroupComponent } from './todo-group';

@NgModule({
  declarations: [
    TodoGroupComponent,
  ],
  imports: [
    IonicPageModule.forChild(TodoGroupComponent),
  ],
  exports: [
    TodoGroupComponent
  ]
})
export class TodoGroupComponentModule {}
