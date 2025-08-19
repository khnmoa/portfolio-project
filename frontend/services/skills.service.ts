import { Injectable } from '@angular/core';
import { ISkill } from '../models/skill.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skillsUrl = "http://localhost:3000/api/skills";
  
  constructor(private _http: HttpClient) { }
  
  getSkills(): Observable<ISkill[]>{
    return this._http.get<ISkill[]>(this.skillsUrl);
  }

  addSkill(data: FormData):Observable<ISkill> {
    return this._http.post<ISkill>(this.skillsUrl, data);
  }

  updateSkill(id: string, data: FormData): Observable<ISkill> {
  const url = `${this.skillsUrl}/${id}`;
  return this._http.put<ISkill>(url, data);
  }
  
deleteSkill(id: string): Observable<{ message: string }> {
  const url = `${this.skillsUrl}/${id}`;
  return this._http.delete<{ message: string }>(url);
}

}
