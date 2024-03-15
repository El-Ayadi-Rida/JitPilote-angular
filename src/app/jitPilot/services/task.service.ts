import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  updateTask(taskId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.URL_API}/tasks/${taskId}`, task);
}
}
