import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoTimeFrameComponent } from './todo-time-frame';

@NgModule({
  declarations: [
    TodoTimeFrameComponent,
  ],
  imports: [
    IonicPageModule.forChild(TodoTimeFrameComponent),
  ],
  exports: [
    TodoTimeFrameComponent
  ]
})
export class TodoTimeFrameComponentModule {}
