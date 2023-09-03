// mvC

import View from "./view.js";
import Store from "./store.js";

const players = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x",
        colorClass: "color-player-1",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-o",
        colorClass: "color-player-2",
    },
]

function init(){
    const view = new View();
    const store = new Store("live-t3-storage-key", players);

    view.bindResetEvent((event) => {
        view.closeAll();
        
        store.reset();
        
        view.clearMoves();
        view.setTurnIndicator(store.game.currentPlayer);
        view.updateScoreboard(store.stats.playerWithStats[0].wins, store.stats.playerWithStats[1].wins, store.stats.ties);
    });
    
    view.bindNewRoundEvent((event) => {
        store.newRound();
        view.closeAll();
        view.clearMoves();
        view.setTurnIndicator(store.game.currentPlayer);
        view.updateScoreboard(store.stats.playerWithStats[0].wins, store.stats.playerWithStats[1].wins, store.stats.ties);
    });
    
    view.bindPlayerMoveEvent((square) => {
        const existingMove = store.game.moves.find(move => move.squareId == +square.id);
        square.classList.add("square-animated");

        if(existingMove){
            return;
        }
        
        view.handlePlayerMove(square, store.game.currentPlayer);

        store.playerMove(+square.id)
        
        if(store.game.status.isComplete){

            view.openModal(store.game.status.winner ? `${store.game.status.winner.name} wins!`: "Its a tie...", store.game.status.winner ? `bg-player-${store.game.status.winner.id}` : "bg-tie");
            return;
        }

        view.setTurnIndicator(store.game.currentPlayer);
    });
}

document.addEventListener("DOMContentLoaded", init);