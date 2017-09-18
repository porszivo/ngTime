import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {TimesheetbeanService} from '../service/timesheetbean.service';
import {TimesheetBean} from '../model/timesheetbean';
import {Task} from '../model/task';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  timesheetBeans: TimesheetBean[];
  timesheetDirtyBeans: TimesheetBean[] = [];
  tasks: Task[];
  today: Date = new Date();

  constructor(private timesheetbeanService: TimesheetbeanService,
  private taskService: TaskService) { }

  ngOnInit() {
    this.listTimesheetBeans();
    this.listTasks();
  }

  listTimesheetBeans() {
      this.timesheetbeanService.getDevices()
        .then(beans => {
          this.timesheetBeans = beans;
        });
  }

  listTasks() {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks);
  }

  newRecord() {
    this.timesheetDirtyBeans.push(new TimesheetBean());
  }

  trashNewRecord(dirtyBean: any) {
    let index = this.timesheetDirtyBeans.indexOf(dirtyBean);
    if (index >= 0) {
        this.timesheetDirtyBeans.splice(index, 1);
    }
  }

  saveSingleBean(dirtyBean: TimesheetBean) {
    if (dirtyBean.task != null && dirtyBean.duration != null) {
      this.trashNewRecord(dirtyBean);
      this.timesheetbeanService.newBean(dirtyBean);
    }
  }

  deleteRecord(bean: TimesheetBean) {
    if (bean != null) {
      this.timesheetbeanService.deleteRecord(bean);
      let index = this.timesheetBeans.indexOf(bean);
      if (index >= 0) {
        this.timesheetBeans.splice(index, 1);
      }
    }
  }

}
