// mVc
export default class View{
    $ = {};
    $$ = {};

    constructor(){
        this.$.menu = this.#qs("[data-id=\"menu\"]");
        this.$.menuBtn = this.#qs("[data-id=\"menu-btn\"]");
        this.$.menuItems = this.#qs("[data-id=\"menu-items\"]");
        this.$.resetBtn = this.#qs("[data-id=\"reset-btn\"]");
        this.$.newRoundBtn = this.#qs("[data-id=\"new-round-btn\"]");
        this.$.modal = this.#qs("[data-id=\"modal\"]");
        this.$.modalText = this.#qs("[data-id=\"modal-text\"]");
        this.$.modalBtn = this.#qs("[data-id=\"modal-btn\"]");
        this.$.turn = this.#qs("[data-id=\"turn\"]");

        this.$$.squares = this.#qsAll("[data-id=\"square\"]");

        this.$.menuBtn.addEventListener("click", () => {
            this.#toggleMenu();
        });
    }

    // Register all event listeners
    
    bindResetEvent(handler){
        this.$.resetBtn.addEventListener("click", handler);
    }
    
    bindNewRoundEvent(handler){
        this.$.newRoundBtn.addEventListener("click", handler);
    }

    bindPlayerMoveEvent(handler){
        this.$$.squares.forEach(square => {
            square.addEventListener("click", () => handler(square));
        });
    }

    // DOM helper methods
    // # makes a propertie/method private
    openModal(message, btnClass){
        this.$.modal.classList.remove("hidden");
        this.$.modalText.textContent = message;
        this.$.modalBtn.classList.add(btnClass);
    }

    #toggleMenu(){
        this.$.menuItems.classList.toggle("hidden");
        this.$.menuBtn.classList.toggle("border");

        const icon = this.$.menuBtn.querySelector("svg");
        icon.classList.toggle("fa-chevron-down");
        icon.classList.toggle("fa-chevron-up");
    }

    handlePlayerMove(squareE, player){
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", player.iconClass, player.colorClass);
        squareE.replaceChildren(icon);
    }

    setTurnIndicator(player){
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", player.iconClass, player.colorClass);

        const label = document.createElement("p");
        label.classList.add(player.colorClass);
        label.textContent = `${player.name}, your turn!`;

        this.$.turn.replaceChildren(icon, label);
    }

    #qs(selector, parent){
        const e = parent ? parent.querySelector(selector) : document.querySelector(selector);

        if(!e) throw new Error("Could not find elements");

        return e;
    }
    
    #qsAll(selector){
        const e = document.querySelectorAll(selector);

        if(!e) throw new Error("Could not find elements");

        return e;
    }
}