import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private servicesUrl = "http://localhost:3000/api/services";
  
  constructor(private _http: HttpClient) { }
  
  getServices(): Observable<IService[]>{
    return this._http.get<IService[]>(this.servicesUrl);
  }

  addService(data: FormData):Observable<IService> {
    return this._http.post<IService>(this.servicesUrl, data);
  }

  updateService(data: IService): Observable<IService> {
  const url = `${this.servicesUrl}/${data._id}`;
  return this._http.put<IService>(url, data);
  }
  
deleteService(id: string): Observable<{ message: string }> {
  const url = `${this.servicesUrl}/${id}`;
  return this._http.delete<{ message: string }>(url);
}

  
}
