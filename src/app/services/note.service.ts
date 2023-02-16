import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

 export interface notes {
  id?: any;
  title: string;
  description : string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  API = "http://localhost:1337/notes"

  constructor(
    private http: HttpClient
  ) { }

  getNotes() {
   return this.http.get(this.API)
  }
  
  removeNotes(id: string) {
    return this.http.delete(`${this.API}/${id}`)
  }

  createNotes(title: string, description : string) {
    return this.http.post(this.API, {
    title, description
    })
  }

  getNotesid(id: any){
     return this.http.get<notes>(`${this.API}/${id}`)
  }

  updateNotes(id: any, note: notes){
   return this.http.put(`${this.API}/${id}`, note)
  }

}
