const App = {
    $: {
        menu: document.querySelector("[data-id=\"menu\"]"),
        menuItems: document.querySelector("[data-id=\"menu-items\"]"), 
        resetBtn: document.querySelector("[data-id=\"reset-btn\"]"), 
        newRoundBtn: document.querySelector("[data-id=\"new-round-btn\"]"), 
        squares: document.querySelectorAll("[data-id=\"square\"]"),
        modal: document.querySelector("[data-id=\"modal\"]"),
        modalText: document.querySelector("[data-id=\"modal-text\"]"),
        modalBtn: document.querySelector("[data-id=\"modal-btn\"]"),
        turn: document.querySelector("[data-id=\"turn\"]"),
    },

    state: {
        moves: [],
    },

    getGameStatus(moves) {
        const p1Moves = moves.filter(move => move.playerId == 1).map(move => +move.squareId);
        const p2Moves = moves.filter(move => move.playerId == 2).map(move => +move.squareId);

        const winnigPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];

        let winner = null;

        winnigPatterns.forEach( pattern => {
            const p1Wins = pattern.every(group => p1Moves.includes(group));
            const p2Wins = pattern.every(group => p2Moves.includes(group));

            if(p1Wins) winner = 1;
            if(p2Wins) winner = 2;
        });

        return {
            status: moves.length == 9 || winner != null ? "complete" : "in-progress",
            winner,
        }
    },
    
    init(){
        App.registerEventListeners();    
    },

    registerEventListeners(){
        App.$.menu.addEventListener("click", e =>{
            App.$.menuItems.classList.toggle("hidden");    
        });

        App.$.resetBtn.addEventListener("click", e => {
            // Reset game code...
        });
        
        App.$.newRoundBtn.addEventListener("click", e => {
            // New round code...
        });

        App.$.modalBtn.addEventListener("click", event => {
            App.state.moves = [];
            App.$.squares.forEach(square => {
                square.replaceChildren()
                square.classList.remove("square-animated");
            });
            App.$.modal.classList.add("hidden");
        })

        App.$.squares.forEach( square => {
            square.addEventListener("click", e => {
                const hasMove = squareId => {
                    const existingMove = App.state.moves.find( move => move.squareId == squareId)
                    return existingMove != undefined;
                }

                if(hasMove(+square.id)){
                    return
                }

                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = playerId => playerId == 1 ? 2 : 1;
                const currentPlayer = App.state.moves.length == 0 ? 1 : getOppositePlayer(lastMove.playerId);
                const nextPlayer = getOppositePlayer(currentPlayer);
                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer,
                });
                

                const squareIcon = document.createElement("i");
                squareIcon.classList.add(`color-player-${currentPlayer}`);
                const turnIcon = document.createElement("i");
                turnIcon.classList.add(`color-player-${nextPlayer}`);

                const turnLabel = document.createElement("p")
                turnLabel.classList = `color-player-${nextPlayer}`;
                turnLabel.textContent = `Player ${nextPlayer}, your turn!`;
                
                if(currentPlayer == 1){
                    squareIcon.classList.add("fa-solid", "fa-x");
                    turnIcon.classList.add("fa-solid", "fa-o");
                }
                else{
                    squareIcon.classList.add("fa-solid", "fa-o");
                    turnIcon.classList.add("fa-solid", "fa-x");
                }

                App.$.turn.replaceChildren(turnIcon, turnLabel);
                
                square.classList.add("square-animated");
                square.appendChild(squareIcon);

                const game = App.getGameStatus(App.state.moves);                

                if(game.status === "complete"){
                    let message = "";
                    App.$.modal.classList.remove("hidden");

                    if(game.winner){
                        message = `Player ${game.winner} wins!`;
                    }
                    else{
                        message = `It's a tie.`;
                    }

                    App.$.modalText.textContent = message;
                }
            });
        });
    },
}

document.addEventListener("DOMContentLoaded", App.init);