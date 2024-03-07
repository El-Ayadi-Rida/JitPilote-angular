import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { workspace } from '../models/workspace';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http: HttpClient) { }

  getAllWorkspace(): Observable<workspace[]> {
    return this.http.get<workspace[]>(`http://localhost:8080/api/workspaces`);
  }

  deleteWorkspace(id: number): Observable<workspace> {
    return this.http.delete<workspace>(`http://localhost:8080/api/workspaces/${id}`);
  }


  getWorkspaceById(id: number): Observable<workspace> {
    return this.http.get<workspace>(`http://localhost:8080/api/workspaces/${id}`);
  }

  create(data: workspace): Observable<workspace> {
    return this.http.post<workspace>(`http://localhost:8080/api/workspaces`, data);
  }

  update(id: number, data: workspace): Observable<workspace> {
    return this.http.put<workspace>(`http://localhost:8080/api/workspaces/${id}`, data);
  }


}
