import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersonalInfo } from '../models/per.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  private personalUrl = "http://localhost:3000/api/personal";
  private uploadsUrl = "http://localhost:3000/uploads/";

  constructor(private _http: HttpClient) { }
  
  getPersonalInfo(): Observable<IPersonalInfo>{
    return this._http.get<IPersonalInfo>(this.personalUrl);
  }
  savePersonalInfo(data:FormData): Observable<IPersonalInfo>{
    return this._http.post<IPersonalInfo>(this.personalUrl,data);
  }
  getImageUrl(filename: string  ): string  {
   
    return this.uploadsUrl + filename;
  }

  getCvUrl(filename: string ): string  {
    return this.uploadsUrl + filename;
  }
  
}
