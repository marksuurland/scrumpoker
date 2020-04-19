import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PokerGame, Player } from 'src/app/poker-room-detail/poker.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poker-room-detail',
  templateUrl: './poker-room-detail.component.html',
  styleUrls: ['./poker-room-detail.component.scss']
})
export class PokerRoomDetailComponent implements OnInit {
  public pokerGame: PokerGame = null;
  public currentPlayer: Player = null;
  public loading: boolean = true;
  public currentPlayerName = 'Mark';

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    firestore.collection('items').doc(id).valueChanges().subscribe((result: PokerGame) => {
      this.pokerGame = this.sortPlayers(result);
      this.getCurrentPlayer(this.pokerGame);
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  public resetPokerPoints() {
    const players = this.pokerGame.players.map(player => { return { ...player, points: '0' } });
    this.firestore.collection('items').doc('48FeaqpPXyDsWokX2ogI').set({ ...this.pokerGame, players });
  }

  private sortPlayers(pokerGame: PokerGame) {
    pokerGame.players.sort((x, y) => { return x.name == this.currentPlayerName ? -1 : y.name == this.currentPlayerName ? 1 : 0; });
    return pokerGame;
  }

  private getCurrentPlayer(pokerGame: PokerGame) {
    if (!this.currentPlayer) {
      this.currentPlayer = pokerGame.players.find(player => player.name === this.currentPlayerName);
    }
  }

}
