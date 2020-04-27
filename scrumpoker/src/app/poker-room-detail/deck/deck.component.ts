import { Component, OnInit } from '@angular/core';
import { PokerService } from 'src/app/poker.service';
import { Card } from 'src/app/poker.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  
  public cards: Card[];
  public imageUrl: string;
  public imageCover: string;

  constructor(private pokerService: PokerService, public dialogRef: MatDialogRef<DeckComponent>) { }

  ngOnInit(): void {
    this.cards = this.pokerService.cards;
    this.imageUrl = this.pokerService.imageUrl;
    this.imageCover = this.pokerService.imageCover;
  }

  public onDeckCardClicked(card: Card) {
    this.dialogRef.close(card);
  }

}
