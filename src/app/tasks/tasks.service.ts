import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './models/Task';
import { Router } from '@angular/router';
import { TaskStatus } from './models/TaskStatus';



@Injectable()
export class TasksService {

    tasksCollection: AngularFirestoreCollection<Task>;
    taskDocument: AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore, private router: Router) {
        this.tasksCollection = this.afs.collection('tasks', (ref) => ref.orderBy('CreatedOn', 'desc').limit(20));
    }

    getTasks(status: TaskStatus): Observable<any[]> {
        var query : AngularFirestoreCollection<Task>;
        if (status == TaskStatus.Completed) {
            query = this.afs.collection('tasks', query => query.orderBy('CreatedOn', 'desc').where('CreatedOn', '>', 0));
        } else if (status == TaskStatus.NotCompleted) {
            query = this.afs.collection('tasks', query => query.orderBy('CreatedOn', 'desc').where('CreatedOn', '==', null));
        } else {
            query = this.afs.collection('tasks', query => query.orderBy('CreatedOn', 'desc'));
        }

        return query.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    return { id: a.payload.doc.id, ...data };
                });
            })
        );
    }

    getData(completed: boolean): Observable<any[]> {
        // ['added', 'modified', 'removed']
        return this.tasksCollection.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data();
                    return { id: a.payload.doc.id, ...data };
                });
            })
        );
    }

    getTask(id: string) {
        return this.afs.doc<any>(`tasks/${id}`);
    }

    private afterTaskCreated(id){
        this.router.navigate([`task/${id}`]);
    }
    
    createTask(task: Task) {
        this.tasksCollection.add(Object.assign({}, task))
        .then((docRef) => {
            this.afterTaskCreated(docRef.id);
        })
        .catch(function (error) {
            console.error('Error adding document: ', error);
            alert('Error: failed adding ')
        });
    
    }

    assignTask(id: string, assignedTo: string) {
        return this.getTask(id).update({ AssignedTo: assignedTo });
    }


    updateTask(id: string, description: any) {
        return this.getTask(id).update(description);
    }

    deleteTask(id: string) {
        return this.getTask(id).delete();
    }
}
