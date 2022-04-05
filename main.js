// Palos de la baraja española (B-Basto, C-Copa, E-Espada, O-Oro)
const SUITS = ["B", "C", "E", "O"];

// Números de las cartas españolas
const NUMBERS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "10",
  "11",
  "12",
];

// Cartas de los jugadores
let player1Cards, player2Cards;

// Carta de triunfo
let trumpCard;

// Puntos de los jugadores
let player1Points = 0, player2Points = 0;

export default class Bristle {
  constructor(cards = newBundle()) {
    this.cards = cards;
  };
  
  // Cantidad de cartas que debe ser igual a 40, 10 por cada palo
  get numberOfCards() {
    return this.cards.length;
  };
  
  pop() {
    return this.cards.shift();
  };

  push(card) {
    this.cards.push(card);
  };
  
  // Mezclar las cartas
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
};

class Card {
  constructor(suit, number) {
    this.suit = suit;
    this.number = number;
  };
  
  // Valor de una carta específica
  get cardValue() {
    let val = 0;
	
    switch(number) {
      case "1":
      val = 11;
      break;
      case "3":
      val = 10;
      break;
      case "10":
      val = 2;
      break;
      case "11":
      val = 3;
      break;
      case "12":
      val = 4;
      break;
      default:
      val = 0;
    }
	
	  return val;
  }
};

// Crear el maso de cartas
function newBundle() {
  return SUITS.flatMap(suit => {
    return NUMBERS.map(number => {
      return new Card(suit, number);
    });
  });
};

function startGame() {
  // Crear el maso
  const bristle = new Bristle();
  
  // Barajar cartas
  bristle.shuffle();
  
  // Repartir tres cartas a cada jugador
  for (i = 1; i < 7; i++) {
    player1Cards += bristle.pop;
    player2Cards += bristle.pop;
  }

  // Sacar la carta de triunfo
  trumpCard = bristle.pop;
};

// Tirar las cartas y definir quien gana, contando los puntos
for (let i; i > bristle.numberOfCards - 6; i++) {
  function play() {
    card1 = player1Cards.pop;
    card2 = player2Cards.pop;

    // Si el PALO de las cartas jugadas es igual o distinto
    if (card1.suit === card2.suit) {
      if (card1.cardValue > card2.cardValue) {
        player1Points += card1.cardValue + card2.cardValue;
      } else if (card2.cardValue > card1.cardValue) {
        player2Points += card2.cardValue + card1.cardValue;
      }
    } else {
      if (card1.suit === trumpCard.suit) {
        player1Points += card1.cardValue + card2.cardValue;
      } else if (card2.suit === trumpCard.suit) {
        player2Points += card2.cardValue + card1.cardValue;
      } else {
        if (card1.cardValue > card2.cardValue) {
          player1Points += card1.cardValue + card2.cardValue;
        } else if (card2.cardValue > card1.cardValue) {
          player2Points += card2.cardValue + card1.cardValue;
        }
      }
    }
  }
}

// Ganador
function whoWon() {
  if (player1Points > player2Points) {
    return "Jugador 1";
  } else if (player2Points > player1Points) {
    return "Jugador 2";
  } else {
    return "Empate";
  }
}