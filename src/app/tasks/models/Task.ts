import { TaskType } from './TaskType';

export interface Task{
    Id: string;
    Title: string;
    Description: string;
    CreatedOn: number;
    CreatedByUser: string;
    AssignedTo: string;
    Photos: string[];
    Type: TaskType;
    CompletedOn?: number;
}

export class Task {
    constructor(title: string, description:string, createdBy:string, type: TaskType) {
        this.CreatedOn = new Date().getTime()
        this.Title = title;
        this.Description = description;
        this.CreatedByUser = createdBy;
        this.Type = type;
    }

    AddPhoto(photo): void {
        this.Photos.push(photo);
    }

    AddPhotos(photos:Array<string>){
        this.Photos.push.apply(photos);
    }

    Assign(user: string){
        this.AssignedTo = user;
    }

    Complete(){
        this.CompletedOn = new Date().getTime();
    }

    IsCompleted():boolean{
        return this.CompletedOn != null;
    }
}

