import { GameService } from "src/app/views/game.service"

const moves = {
    Spook: {
        onAction: (gs: GameService) => {}
    }
}

const theApparition = {
    name: "The Apparition",
    description: "A floating apparition. It does not appear hostile.",
    attack: 10,
    moves: [ 'Spook', 'Premonition']
}

export enum Enemies {
   
}