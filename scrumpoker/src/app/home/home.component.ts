import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public showNewRoomCreation: boolean = false;
  public items: Observable<any[]>;
  public title = 'scrumpoker';
  public newRoomName = '';

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.items = firestore.collection('items').valueChanges({idField: 'id'});
  }

  public onCreateRoomClick() {
    this.showNewRoomCreation = !this.showNewRoomCreation;
  }

  public pokerRoomSelected(id: string) {
    console.log('room selected', id);
    this.router.navigateByUrl(`/pokerroom/${id}`);
  }

  public addRoom() {
    this.firestore.collection('items').add({ 'name': this.newRoomName}).then(
      res => {
        console.log('succeed', res);
        this.newRoomName = '';
      },
      err => {
        console.log('error', err);
      }
    );
  }

}
