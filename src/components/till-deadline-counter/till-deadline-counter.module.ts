import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TillDeadlineCounterComponent } from './till-deadline-counter';

@NgModule({
  declarations: [
    TillDeadlineCounterComponent,
  ],
  imports: [
    IonicPageModule.forChild(TillDeadlineCounterComponent),
  ],
  exports: [
    TillDeadlineCounterComponent
  ]
})
export class TillDeadlineCounterComponentModule {}
