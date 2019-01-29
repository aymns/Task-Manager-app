import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { TasksService } from '../tasks.service';
import { TaskType } from '../models/TaskType';
import { User } from 'firebase';
import { Task } from '../models/Task';

type TaskFields = 'title' | 'description';
type FormErrors = { [u in TaskFields]: string };

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  user: User;
  task: any;
  taskForm: FormGroup;
  formErrors: FormErrors = {
    'title': '',
    'description': ''
  };
  validationMessages = {
    'title': {
      'required': 'Title is required.'
    },
    'description': {
      'required': 'description is required.'
    },
  };

  constructor(private fb: FormBuilder, private auth: AuthService, private taskService: TasksService) {
    this.auth.user.subscribe(user => {
      this.user = user as User;
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.taskForm = this.fb.group({
      'title': ['', [
        Validators.required
      ]],
      'description': ['', [
        Validators.required
      ]],
      'taskType': [TaskType],
    });

    this.taskForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  addTask() {
    this.task = new Task(this.taskForm.value['title'], this.taskForm.value['description'], this.user.uid, TaskType.QuickTask);
    this.taskService.createTask(this.task);
  }

  onValueChanged(data?: any) {
    if (!this.taskForm) { return; }
    const form = this.taskForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'title' || field === 'description')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }

}
