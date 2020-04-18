import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Card } from 'src/app/poker-room-detail/poker.interface';

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

  public imageUrl = 'https://raw.githubusercontent.com/redbooth/Scrum-poker-cards/master/png/';
  public imageCover = 'Cover%20-%20option%202.png';
  public deckMode: boolean = false;
  public pickedCard: Card = {};

  public cards: Card[] = [
    { points: '1', image: "planning%20poker_Low%20hanging%20fruit.png", toggle: false },
    { points: '2', image: 'planning%20poker_Piece%20of%20cake.png', toggle: false },
    { points: '3', image: "planning%20poker_It%20ain\\'t%20rocket%20science.png", toggle: false },
    { points: '5', image: 'planning%20poker-03.png', toggle: false },
    { points: '8', image: 'planning%20poker_An%20arm%20and%20a%20leg.png', toggle: false },
    { points: '13', image: 'planning%20poker_Squeaking%20by.png', toggle: false },
    { points: '20', image: "planning%20poker_Don\\'t%20put%20all%20.png", toggle: false },
    { points: '40', image: 'planning%20poker_Meterse%20en%20un%20berenjenal.png', toggle: false },
    { points: '100', image: 'planning%20poker_Monster%20task.png', toggle: false },
    { points: '&#8734;', image: 'planning%20poker_When%20pigs%20fly.png', toggle: false },
    { points: '?', image: 'planning%20poker_Here%20be%20dragons.png', toggle: false },
    { points: 'Coffee', image: 'planning%20poker_Coffee%20break.png', toggle: false }
  ];

  constructor() {}

  ngOnInit(): void {
    this.setCurrentCard();
  }

  public onToggleCardClicked(card: Card) {
    if (card.points !== '0' && this.canPick) {
      card.toggle = !card.toggle;
    }
  }

  public onDeckCardClicked(card: Card) {
    this.pickedCard = card;
    this.toggleDeckMode();
  }

  public toggleDeckMode() {
    this.deckMode = !this.deckMode;
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
