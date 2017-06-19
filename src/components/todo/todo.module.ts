import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoComponent } from './todo';

@NgModule({
  declarations: [
    TodoComponent,
  ],
  imports: [
    IonicPageModule.forChild(TodoComponent),
  ],
  exports: [
    TodoComponent
  ]
})
export class TodoComponentModule {}
