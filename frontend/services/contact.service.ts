import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private messagesUrl = "http://localhost:3000/api/messages";
  
  constructor(private _http: HttpClient) { }
  
  getMessages(): Observable<IMessage[]>{
    return this._http.get<IMessage[]>(this.messagesUrl);
  }

  addMessage(data: FormData):Observable<IMessage> {
    return this._http.post<IMessage>(this.messagesUrl,data);
  }

  updateMessage(data:IMessage): Observable<IMessage> {
    const url = `${this.messagesUrl}/${data._id}`;
    return this._http.put<IMessage>(url,data);
  }

 deleteMessage(id: string) : Observable<{ message: string }>{
  const url = `${this.messagesUrl}/${id}`;
  return this._http.delete<{ message: string }>(url);
  }
  
  
}
