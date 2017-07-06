import { countdownThreshold } from './../../app/di.tokens';
import { Todo } from './../../app/todo/todo';
import { Component, Input, Inject } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'till-deadline-counter',
  templateUrl: 'till-deadline-counter.html'
})
export class TillDeadlineCounterComponent {

  @Input()
  public todo:Todo;
  public timeLeft:string = "";
  private timePad:string = '00';
  private timeUpdateTimeout;
  private showCounter:boolean = false;

  constructor(@Inject(countdownThreshold) private _countdownThreshold) {}

  ngOnInit() {
    this.assessShowCounter();
    this.timeLeft = this.computeTimeLeft();
    this.timeUpdateTimeout = setInterval(() => {
      this.timeLeft = this.computeTimeLeft();
    }, 1000);
  }

  computeTimeLeft() {
    //format will be days:hours:minutes:seconds

    let days, hoursRaw, hours, minsRaw, mins, secsRaw, secs, timeDiff;

    timeDiff = Number(moment(this.todo.deadline).diff(moment(), 'days', true));

    days     = Math.trunc(timeDiff);
    hoursRaw = ( timeDiff - days ) * 24;
    hours    = Math.trunc(hoursRaw);
    minsRaw  = ( hoursRaw - hours) * 60;
    mins     = Math.trunc(minsRaw);
    secsRaw  = ( minsRaw - mins) * 60;
    secs     = Math.trunc(secsRaw);
    return this.padString(days) + ":" + this.padString(hours) + ":" + this.padString(mins) + ":" + this.padString(secs);
  }

  padString( strTime: string) {
    return (this.timePad + strTime).slice(-this.timePad.length);
  }

  ngOnDestroy() {
    clearInterval( this.timeUpdateTimeout );
  }

  assessShowCounter() {

    const now = moment();
    this.showCounter = this.todo.deadline
                       && moment(this.todo.deadline).isAfter(now)
                       && now.isSameOrAfter(moment(this.todo.deadline).subtract(this._countdownThreshold, 'days'));
  }
}
