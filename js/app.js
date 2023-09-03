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

    window.addEventListener("storage", () =>  {
        view.render(store.game, store.stats);
    })

    view.render(store.game, store.stats);
    
    view.bindResetEvent((event) => {
        store.reset();
        view.render(store.game, store.stats);
    });
    
    view.bindNewRoundEvent((event) => {
        store.newRound();
        view.render(store.game, store.stats);
    });
    
    view.bindPlayerMoveEvent((square) => {
        const existingMove = store.game.moves.find(move => move.squareId == +square.id);
        square.classList.add("square-animated");

        if(existingMove){
            return;
        }

        store.playerMove(+square.id);

        view.render(store.game, store.stats);
    });
}

document.addEventListener("DOMContentLoaded", init);