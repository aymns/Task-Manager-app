import { Component, Input, OnInit } from '@angular/core';

import { TasksService } from '../tasks.service';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskType } from '../models/TaskType';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit{

  @Input() task: Task;

  constructor(private tasksService: TasksService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.tasksService.getTask(id).valueChanges().subscribe(t=>{
      this.task = t;
    });
  }
}
