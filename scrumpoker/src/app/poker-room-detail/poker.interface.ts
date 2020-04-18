export interface PokerGame {
    name: string;
    players: Player[];
}

export interface Player {
    name: string;
    points: string;
}

export interface Card {
    points?: string,
    image?: string,
    toggle?: boolean
}