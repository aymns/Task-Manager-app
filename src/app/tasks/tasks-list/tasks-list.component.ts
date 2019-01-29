import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from '../tasks.service';
import { AuthService } from 'src/app/core/auth.service';
import { TaskStatus } from '../models/TaskStatus';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  tasks: Observable<any[]>;
  @Input() taskStatus: TaskStatus = TaskStatus.All;

  constructor(private tasksService: TasksService, private auth: AuthService) { }

  async ngOnInit() {
    var user = await this.auth.GetCurrentUser().toPromise();
    this.tasks = this.tasksService.getTasks(TaskStatus.All);
  }
}
