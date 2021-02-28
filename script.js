/* Initialisation des scores pour la première partie */
var globalScoreOfThePlayer1 = 0;
var globalScoreOfThePlayer2 = 0;
var roundScoreOfThePlayer1 = 0;
var roundScoreOfThePlayer2 = 0;

/* Initialisation du joueur qui doit jouer en premier */
var currentPlayer = "player1";
document.getElementById("identityPlayer1").style.fontWeight = "bold";
document.getElementById("identityPlayer1").insertAdjacentHTML('beforeend', ' \u2022');
document.getElementById("backgroundPlayer2").style.visibility = "hidden";

/* Initialisation du dé */
var imageDice = document.getElementById("imgDice");
imageDice.setAttribute("src", "images/dice - toRoll.svg");


/* Fonctions de mise à jour des scores après un lancé de dé */

/* Mise à jour du score global du joueur 1 */
function updateGlobalScoreOfThePlayer1() {
    document.getElementById("globalScorePlayer1").innerHTML = globalScoreOfThePlayer1;
};

/* Mise à jour du score global du joueur 2 */
function updateGlobalScoreOfThePlayer2() {
    document.getElementById("globalScorePlayer2").innerHTML = globalScoreOfThePlayer2;
};

/* Mise à jour du score temporaire du joueur 1 */
function updateRoundScoreOfThePlayer1() {
    document.getElementById("roundScorePlayer1").innerHTML = roundScoreOfThePlayer1;
};

/* Mise à jour du score temporaire du joueur 2 */
function updateRoundScoreOfThePlayer2() {
    document.getElementById("roundScorePlayer2").innerHTML = roundScoreOfThePlayer2;
};

/* Mutualisation des fonctions de mises à jour des scores du joueur 1 */
function updateScoresOfThePlayer1() {
    updateGlobalScoreOfThePlayer1();
    updateRoundScoreOfThePlayer1();
};

/* Mutualisation des fonctions de mises à jour des scores du joueur 2 */
function updateScoresOfThePlayer2() {
    updateGlobalScoreOfThePlayer2();
    updateRoundScoreOfThePlayer2();
};

/* Affichage des scores initialisés après chargement de la page */
window.addEventListener('load', (event) => {
    updateScoresOfThePlayer1();
    updateScoresOfThePlayer2();
});

/* Lancement du dé lors du clic sur "ROLL THE DICE" */
var rollOfTheDice = document.getElementById("rollDice");
rollOfTheDice.onclick = generateRandomDice;

/* Fonction de génération aléatoire d'un résultat pour le lancé de dé */
function getRandomInt() {
    return Math.floor(Math.random() * 6) + 1;
};

/* Récupération de la valeur du champ dédié aux commentaires */
var commentToShow = document.getElementById("comments");

/* Fonction permettant de gérer la logique de jeu */
function generateRandomDice() {
    /* Appel de la fonction qui permet de remettre à blanc les commentaires sur l'éventuel lancé de dé précédent */
    resetComments()
    /* Appel de la fonction pour gérer le lancé aléatoire du dé */
    getRandomInt();
    /* Récupération des informations de résultat du lancé de dé et de l'identité du joueur en cours */
    var resultRandomDice = getRandomInt();

    /* Si le résultat du lancé de dé est 1 */
    if (Number(resultRandomDice) === 1) {
        /* Mise à jour de l'image du dé */
        updateImageDice(resultRandomDice);
        if (currentPlayer === "player1") {
            /* Affichage du commentaire pour indiquer aux utilisateurs qu'ils ont perdu */
            commentToShow.innerHTML = "Player 1 : you lost the turn !<br>Player 2 : it's your turn !";
            /* Mise à jour des scores en conséquence */
            roundScoreOfThePlayer1 = 0;
            updateRoundScoreOfThePlayer1();
            /* Changement du joueur en cours */
            updateCurrentPlayerToPlayer2();
        } else {
            /* Affichage du commentaire pour indiquer aux utilisateurs qu'ils ont perdu */
            commentToShow.innerHTML = "Player 2 : you lost the turn !<br>Player 1 : it's your turn !";
            /* Mise à jour des scores en conséquence */
            roundScoreOfThePlayer2 = 0;
            updateRoundScoreOfThePlayer2();
            /* Changement du joueur en cours */
            updateCurrentPlayerToPlayer1();
        }
    } else {
        /* Si le résultat du tirage est autre que 1 */
        /* Mise à jour de l'image du dé en fonction du résultat du lancé */
        updateImageDice(Number(resultRandomDice));
        if (currentPlayer === "player1") {
            /* Mise à jour des scores en conséquence */
            roundScoreOfThePlayer1 += Number(resultRandomDice);
            updateRoundScoreOfThePlayer1();
        } else {
            /* Mise à jour des scores en conséquence */
            roundScoreOfThePlayer2 += Number(resultRandomDice);
            updateRoundScoreOfThePlayer2();
        }
    }
};

/* Activation de la fonction "HOLD" pour mettre de coté les points acquis */
var holdTheRoundScore = document.getElementById("hold");
holdTheRoundScore.onclick = holdTheRoundScoreFortheCurrentPlayer;

/* Fonction permettant de gérer la logique de la fonction "HOLD" */
function holdTheRoundScoreFortheCurrentPlayer() {
    /* Vérification du joueur en cours */
    if (currentPlayer === "player1") {
        /* Mise à jour des scores en conséquences */
        globalScoreOfThePlayer1 += Number(roundScoreOfThePlayer1);
        roundScoreOfThePlayer1 = 0;
        updateScoresOfThePlayer1();
        /* Si le score est supérieur ou égal à 100 : le joueur a gagné */
        if (globalScoreOfThePlayer1 >= 100) {
            alert("Player 1 : you win the party !");
            resetTheParty();
        }
    } else {
        /* Mise à jour des scores en conséquences */
        globalScoreOfThePlayer2 += Number(roundScoreOfThePlayer2);
        roundScoreOfThePlayer2 = 0;
        updateScoresOfThePlayer2();
        /* Si le score est supérieur ou égal à 100 : le joueur a gagné */
        if (globalScoreOfThePlayer2 >= 100) {
            alert("Player 2 : you win the party !");
            resetTheParty();
        }
    }
};

/* Fonction permettant de réinitialisé le jeu */
var newGameClicked = document.getElementById("idNewGame");
newGameClicked.onclick = resetTheParty;

/* Fonction affichant le player1 en tant que joueur en cours */
function updateCurrentPlayerToPlayer1() {
    currentPlayer = "player1";
    document.getElementById("identityPlayer2").style.fontWeight = "normal";
    document.getElementById("identityPlayer2").innerHTML = "Player 2";
    document.getElementById("identityPlayer1").style.fontWeight = "bold";
    document.getElementById("identityPlayer1").insertAdjacentHTML('beforeend', ' \u2022');
    document.getElementById("backgroundPlayer2").style.visibility = "hidden";
    document.getElementById("backgroundPlayer1").style.visibility = "visible";
};

/* Fonction affichant le player2 en tant que joueur en cours */
function updateCurrentPlayerToPlayer2() {
    currentPlayer = "player2";
    document.getElementById("identityPlayer1").style.fontWeight = "normal";
    document.getElementById("identityPlayer1").innerHTML = "Player 1";
    document.getElementById("identityPlayer2").style.fontWeight = "bold";
    document.getElementById("identityPlayer2").insertAdjacentHTML('beforeend', ' \u2022');
    document.getElementById("backgroundPlayer1").style.visibility = "hidden";
    document.getElementById("backgroundPlayer2").style.visibility = "visible";
};

/* Fonction qui permet de mettre à jour l'image du dé en fonction du résultat du lancé */
function updateImageDice(resultRandomDice) {
    switch (Number(resultRandomDice)) {
        case 1:
            imageDice.setAttribute("src", "images/dice - number1.svg");
            break;
        case 2:
            imageDice.setAttribute("src", "images/dice - number2.svg");
            break;
        case 3:
            imageDice.setAttribute("src", "images/dice - number3.svg");
            break;
        case 4:
            imageDice.setAttribute("src", "images/dice - number4.svg");
            break;
        case 5:
            imageDice.setAttribute("src", "images/dice - number5.svg");
            break;
        case 6:
            imageDice.setAttribute("src", "images/dice - number6.svg");
            break;
    };
};

/* Fonction qui permet de remettre à blanc les commentaires sur l'éventuel lancé de dé précédent */
function resetComments() {
    commentToShow.innerHTML = "";
};

/* Fonction qui permet de remettre à zéro les scores à la fin de la partie */
function resetTheParty() {
    globalScoreOfThePlayer1 = 0;
    globalScoreOfThePlayer2 = 0;
    roundScoreOfThePlayer1 = 0;
    roundScoreOfThePlayer2 = 0;
    updateScoresOfThePlayer1();
    updateScoresOfThePlayer2();
    imageDice.setAttribute("src", "images/dice - toRoll.svg");
    document.getElementById("backgroundPlayer2").style.visibility = "hidden";
    document.getElementById("backgroundPlayer1").style.visibility = "visible";
    if (currentPlayer === "player2") {
        updateCurrentPlayerToPlayer1();
    };
};