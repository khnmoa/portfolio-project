import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExperience } from '../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private experienceUrl = "http://localhost:3000/api/experience";
    
    constructor(private _http: HttpClient) { }
    
    getExperienceInfo(): Observable<IExperience[]>{
      return this._http.get<IExperience[]>(this.experienceUrl);
    }
  
    addExperienceField(data: FormData):Observable<IExperience> {
      return this._http.post<IExperience>(this.experienceUrl, data);
    }
  
    updateExperienceField( data: IExperience): Observable<IExperience> {
    const url = `${this.experienceUrl}/${data._id}`;
    return this._http.put<IExperience>(url, data);
    }
    
  deleteExperienceField(id: string): Observable<{ message: string }> {
    const url = `${this.experienceUrl}/${id}`;
    return this._http.delete<{ message: string }>(url);
  }
  
    
}
