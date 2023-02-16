import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { alertController } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  notes : any = []

  constructor(
    private NoteService: NoteService, private alertcontroller: AlertController
  ) { }
  
  loadNotes(){
    this.NoteService.getNotes().subscribe(res => { this.notes = res; } , err => console.log(err))
  }

  ngOnInit() {
    this.loadNotes();
  }

  ionViewWillEnter(){
    this.loadNotes();
  }

  async deleteNote(id:any){
   
   const alert = await this.alertcontroller.create({
    header:'remove',
    subHeader: 'Remove this note',
    message: 'are you sure',
    buttons: [{
      text:'Okay',
      handler: () => {
        console.log(id)
        this.NoteService.removeNotes(id).subscribe((res) => { this.loadNotes()}, (err)=> console.log(err))
      }
    },'cancel']
  });

  await alert.present()
 }


}
