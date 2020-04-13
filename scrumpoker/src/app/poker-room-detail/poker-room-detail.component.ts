import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-poker-room-detail',
  templateUrl: './poker-room-detail.component.html',
  styleUrls: ['./poker-room-detail.component.scss']
})
export class PokerRoomDetailComponent implements OnInit {
  public imageUrl = 'https://raw.githubusercontent.com/redbooth/Scrum-poker-cards/master/png/';
  public imageCover = 'Cover%20-%20option%202.png';
  public toggleCard: boolean = false;

  public cards = [
    { points: '1', image: "planning%20poker_Low%20hanging%20fruit.png" },
    { points: '2', image: 'planning%20poker_Piece%20of%20cake.png' },
    { points: '3', image: "planning%20poker_It%20ain\\'t%20rocket%20science.png" },
    { points: '5', image: 'planning%20poker-03.png' },
    { points: '8', image: 'planning%20poker_An%20arm%20and%20a%20leg.png' },
    { points: '13', image: 'planning%20poker_Squeaking%20by.png' },
    { points: '20', image: "planning%20poker_Don\\'t%20put%20all%20.png" },
    { points: '40', image: 'planning%20poker_Meterse%20en%20un%20berenjenal.png' },
    { points: '100', image: 'planning%20poker_Monster%20task.png' },
    { points: '&#8734;', image: 'planning%20poker_When%20pigs%20fly.png' },
    { points: '?', image: 'planning%20poker_Here%20be%20dragons.png' },
    { points: 'Coffee', image: 'planning%20poker_Coffee%20break.png' }
  ];

  constructor(private firestore: AngularFirestore) {
   firestore.collection('items').doc('48FeaqpPXyDsWokX2ogI').valueChanges().subscribe(result => {
     console.log('result', result);
   });
  }

  ngOnInit(): void {
  }

  public toggleCardClicked() {
    this.toggleCard = !this.toggleCard;
  }

}
