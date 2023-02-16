import { Component, OnInit } from '@angular/core';
import { NoteService, notes } from '../services/note.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.page.html',
  styleUrls: ['./note-form.page.scss'],
})
export class NoteFormPage implements OnInit {


  editing = false

  note: notes = {
    title: '',
    description:''
  }

  constructor(
    private NoteService : NoteService, private Router : Router, private activatedRoute : ActivatedRoute
  ) { }

  saveNote(title: any, description: any ){
    console.log(title.value, description.value)
      this.NoteService.createNotes(title.value, description.value).subscribe( (res) => {this.Router.navigate(['/notes'])} , (err) => console.log(err))
      
  }

  updateNote(){
   this.NoteService.updateNotes(this.note.id, {
    title: this.note.title,
    description : this.note.description
   }).subscribe( res => console.log(res), err => console.log(err))
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if(paramMap.get('id')){
        console.log('editingg')
        this.editing = true
        this.NoteService.getNotesid(paramMap.get('id')).subscribe( (res) => { this.note = res; console.log(this.note)} , err => console.log(err))
      }
    })
  }



}
