import { Component, OnInit } from '@angular/core';
import {TaskService} from "../service/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  name: string;
  description: string;


  constructor(private taskService: TaskService) { }

  createTask() {
    if (this.name && this.description) {
      if(this.taskService.createNewTask({name: this.name, description: this.description})) {
        this.name = '';
        this.description = '';
      }
    }
  }

}
