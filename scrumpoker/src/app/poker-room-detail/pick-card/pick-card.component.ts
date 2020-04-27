import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/poker.interface';
import { MatDialog } from '@angular/material/dialog';
import { DeckComponent } from '../deck/deck.component';
import { PokerService } from 'src/app/services/poker.service';

@Component({
  selector: 'pick-card',
  templateUrl: './pick-card.component.html',
  styleUrls: ['./pick-card.component.scss']
})
export class PickCardComponent implements OnInit {
  @Input()
  public playerPoints: string;

  @Input()
  public canPick: boolean;

  @Output() tellOthers = new EventEmitter<Card>();

  public imageUrl: string;
  public imageCover: string;
  public deckMode: boolean = false;
  public pickedCard: Card = {};

  public cards: Card[];

  constructor(public dialog: MatDialog, private pokerService: PokerService) { }

  ngOnInit(): void {
    this.cards = this.pokerService.cards;
    this.imageUrl = this.pokerService.imageUrl;
    this.imageCover = this.pokerService.imageCover;
    this.setCurrentCard();
  }

  public toggleDeckMode() {
    const dialogRef = this.dialog.open(DeckComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pickedCard = result;
      }
    });
  }

  public tellOthersClicked() {
    this.tellOthers.emit(this.pickedCard);
  }

  private setCurrentCard() {
    if (this.playerPoints === '0') {
      this.pickedCard = { points: '0', image: 'planning%20poker_Yak%20Shaving.png', toggle: false }
    } else {
      this.pickedCard = this.cards.find(card => card.points === this.playerPoints);
    }
  }

}
