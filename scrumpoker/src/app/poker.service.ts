import { Injectable } from '@angular/core';
import { Card } from './poker.interface';

@Injectable({
    providedIn: 'root'
})
export class PokerService {

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
    public imageUrl = 'https://raw.githubusercontent.com/redbooth/Scrum-poker-cards/master/png/';
    public imageCover = 'Cover%20-%20option%202.png';

    public playername: string;

    constructor() { }

    public getPlayerName(): string {
        return this.playername;
    }

    public setPlayerName(playername: string): void {
        this.playername = playername;
    }

}
