import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PokerGame } from 'src/app/poker-room-detail/poker.interface';

@Component({
  selector: 'app-poker-room-detail',
  templateUrl: './poker-room-detail.component.html',
  styleUrls: ['./poker-room-detail.component.scss']
})
export class PokerRoomDetailComponent implements OnInit {
  public pokerGame: PokerGame = null;
  public loading: boolean = true;
  public currentPlayer = 'Mark';

  constructor(private firestore: AngularFirestore) {
   firestore.collection('items').doc('48FeaqpPXyDsWokX2ogI').valueChanges().subscribe((result: PokerGame) => {
    this.pokerGame = this.sortPlayers(result);
    this.loading = false;
   });
  }

  ngOnInit(): void {
  }

  private sortPlayers(pokerGame: PokerGame) {
    pokerGame.players.sort((x,y) => { return x.name == this.currentPlayer ? -1 : y.name == this.currentPlayer ? 1 : 0; });
    return pokerGame;
  }

}
