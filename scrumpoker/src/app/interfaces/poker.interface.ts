export interface PokerGame {
    id: string,
    name: string;
    players: Player[];
}

export interface Player {
    name: string;
    uid: string;
    points: string;
}

export interface Card {
    points?: string,
    image?: string,
    toggle?: boolean
}