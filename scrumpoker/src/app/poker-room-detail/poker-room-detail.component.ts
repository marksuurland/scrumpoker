import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PokerGame, Player } from 'src/app/interfaces/poker.interface';
import { ActivatedRoute } from '@angular/router';
import { PokerService } from 'src/app/services/poker.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-poker-room-detail',
  templateUrl: './poker-room-detail.component.html',
  styleUrls: ['./poker-room-detail.component.scss']
})
export class PokerRoomDetailComponent implements OnInit {
  public pokerGame: PokerGame = null;
  public currentPlayer: Player = null;
  public gameLoading: boolean = true;
  public playerLoading: boolean = true;

  public pokerGameId: string;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private fireFunctions: AngularFireFunctions,
    public authService: AuthService) {
  }

  ngOnInit(): void {
    this.pokerGameId = this.route.snapshot.paramMap.get('id');

    this.firestore.collection('items').doc(this.pokerGameId).valueChanges().subscribe((result: PokerGame) => {
      this.gameLoading = false;

      this.authService.user.subscribe((user: User) => {
        this.pokerGame = this.sortPlayers(result, user);
        this.currentPlayer = this.pokerGame.players.find(player => player.uid === user.uid);
        this.playerLoading = false;
      });
    });
  }

  public resetPokerPoints() {
    const players = this.pokerGame.players.map(player => { return { ...player, points: '0' } });
    // this.firestore.collection('items').doc(this.pokerGameId).set({ ...this.pokerGame, players });
    this.fireFunctions.httpsCallable('resetPokerPoints')({ id: this.pokerGame.id }).subscribe(
      result => {
        this.notificationsService.success(`${this.pokerGame.name} pokerpoints succesfully resetted`);
      },
      error => {
        this.notificationsService.error(`${this.pokerGame.name} pokerpoints could not be resetted`);
      });
  }

  private sortPlayers(pokerGame: PokerGame, user: User) {
    pokerGame.players.sort((x, y) => { return x.name == user.displayName ? -1 : y.name == user.displayName ? 1 : 0; });
    return pokerGame;
  }

}
