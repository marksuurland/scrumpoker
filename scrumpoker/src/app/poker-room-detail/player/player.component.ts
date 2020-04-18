import { Component, OnInit, Input } from '@angular/core';
import { Player, Card, PokerGame } from '../poker.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input()
  public player: Player;

  @Input()
  public currentPlayer: string;

  public tempPokerGame: PokerGame;

  constructor(private firestore: AngularFirestore) { 
    firestore.collection('items').doc('48FeaqpPXyDsWokX2ogI').valueChanges().subscribe((result: PokerGame) => {
      this.tempPokerGame = result;
     });
  }

  ngOnInit(): void {
  }

  public ontellOthers(card: Card) {
    this.player.points = card.points;

    let playerFoundIndex = this.tempPokerGame.players.findIndex(player => player.name === this.player.name);
    this.tempPokerGame.players[playerFoundIndex].points = this.player.points;

    this.firestore
    .collection("items")
    .doc('48FeaqpPXyDsWokX2ogI')
    .set(this.tempPokerGame, { merge: true });
  }

}
