import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PokerGame } from '../interfaces/poker.interface';
import { PokerService } from 'src/app/services/poker.service';
import { AuthService } from '../services/auth.service';
import { take, map, mergeMap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  public showNewRoomCreation: boolean = false;
  public items: Observable<any[]>;
  public title = 'scrumpoker';
  public newRoomName = '';

  public columnsToDisplay = ['name'];
  public expandedGame: PokerGame | null;
  public playerName = ''

  constructor(private firestore: AngularFirestore,
    private router: Router,
    private pokerService: PokerService,
    public authService: AuthService) {
    this.items = firestore.collection('items').valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {
    this.items = this.firestore.collection('items').valueChanges({ idField: 'id' });
  }

  public onCreateRoomClick() {
    this.showNewRoomCreation = !this.showNewRoomCreation;
  }

  public setPlayerName() {
    this.pokerService.setPlayerName(this.playerName);
  }

  onSignInUser(event) {
    this.authService.updateUserData(event)
  }

  printError(event) {
    console.error(event);
  }

  public pokerRoomSelected(id: string) {
    const pokerGames = this.items.pipe(take(1));
    const user = this.authService.user.pipe(take(1));

    forkJoin([pokerGames, user]).subscribe(
      result => {
        const tempPokerGame = result[0].find(r => r.id === id);
        const currentUser = result[1];

        tempPokerGame.players.push({
          name: currentUser.displayName,
          uid: currentUser.uid,
          points: "0"
        });

        this.firestore
          .collection("items")
          .doc(id)
          .set(tempPokerGame, { merge: true });

        this.router.navigateByUrl(`/pokerroom/${id}`);
      },
      err => console.log('Error:', err),
      () => console.log('Completed')
    );
  }

  public addRoom() {
    this.firestore.collection('items').add({ 'name': this.newRoomName }).then(
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
