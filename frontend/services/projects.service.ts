import { Injectable } from '@angular/core';
import { IProject } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = "http://localhost:3000/api/projects";
    private uploadsUrl = "http://localhost:3000/uploads/";

  constructor(private _http: HttpClient) { }
  
  getProjects(): Observable<IProject[]>{
    return this._http.get<IProject[]>(this.projectsUrl);
  }
  getProject(id: string): Observable<IProject>{
    const url = `${this.projectsUrl}/${id}`;
    return this._http.get<IProject>(url);
  }
  getProjectByLink(link: string): Observable<IProject>{
    const url = `${this.projectsUrl}/link/${link}`;
    return this._http.get<IProject>(url);
  }
  addProject(data: FormData):Observable<IProject> {
    return this._http.post<IProject>(this.projectsUrl, data);
  }

  updateProject(id: string|null, data: FormData): Observable<IProject> {
  const url = `${this.projectsUrl}/${id}`;
  return this._http.put<IProject>(url, data);
  }
  
deleteProject(id: string): Observable<{ message: string }> {
  const url = `${this.projectsUrl}/${id}`;
  return this._http.delete<{ message: string }>(url);
  }
  
  getImageUrl(filename: string | null ): string | null {
    if (!filename) return null;
    return this.uploadsUrl + filename;
  }

}
