// Un alert espone 10 numeri casuali (univoci).
// Poi parte un timer di 30 secondi.
// Dopo 30 secondi l’utente deve inserire, un prompt alla volta, i numeri che ha visto precedentemente.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati

// genero 5 numeri casuali
var numbersCPU = [];
var min = 1;
var max = 100;
// variabile superglobale elements visibile anche all'interno delle funzioni
elements = 5;

numbersCPU = randomArray(elements, min, max);
console.log(numbersCPU);

// espongo i 5 numeri generati tramite un alert
for (var i = 0; i < numbersCPU.length; i++) {
  alert("Memorizza il " + (i+1) +" numero: " + numbersCPU[i]);
}

// messaggio di attesa
$('h1').addClass('active').html('Attendi 30 secondi...');

// faccio partire il gioco dopo di 30 secondi
setTimeout(function(){

  // tolgo messaggio di attesa
  $('h1').removeClass('active');

  startGame(numbersCPU);

  // messaggio fine gioco
  $('h1').addClass('active').html('Fine del gioco!');

}, 30000);

// --------------------------- FUNCTIONS procedurali --------------------------- //
function startGame(numbersCPU) {
  // tramite 5 prompt faccio inserire i 5 numeri visualizzati
  var numbersUser = [];
  var num;
  var i = 0;
  while (i < numbersCPU.length) {
    num = prompt("Inserisci il " + (i+1) + " numero che ricordi");
    if (!inRange(1,100,num)) {
      alert("Attenzione, inserisci un numero tra " + min + " e " + max);
    } else if (inArray(numbersUser, num)){
      alert("Attenzione hai già inserito questo numero");
    } else {
      numbersUser[i] = num;
      i++;
    }
  }
  console.log(numbersUser);
  foundNumbers(numbersUser);
}

function foundNumbers(numbersUser) {
  // verifico quanti e quali numeri inseriti corrispondono ai 5 numeri casuali
  var numbersFound = [];
  for (var i = 0; i < numbersUser.length; i++) {
    if (inArray(numbersCPU, numbersUser[i])) {
      numbersFound.push(numbersUser[i]);
    }
  }
  console.log(numbersFound);
  printResult(numbersFound);
}

function printResult(numbersFound) {
  // stampo a video i numeri indovinati
  var numbersGuessed = numbersFound.length;
  console.log(numbersGuessed);
  if (numbersGuessed == elements) {
    alert("Hai vinto! Hai indovinato tutti i numeri: " + numbersFound);
  } else {
    alert("Hai indovinato " + numbersGuessed + " numeri: " + numbersFound);
  }
}

// --------------------------- FUNCTIONS Utility --------------------------- //
// funzione che restituisce un array di numeri casuali, non ripetuti, dando come parametri valore min, valore max e numero elementi. Se i parametri non sono corretti restituisce false
function randomArray(elements, min, max) {
  var array = [];
  var random;
  while (array.length < elements) {
    random = getRandom(min, max);
    // controllo che i numeri generati non siano duplicati
    if (!inArray(array,random)) {
      array.push(random);
    }
  }
  return array;
}

function inArray (array, elemento) {
  var i = 0;
  var trovato = false;
  // questo ciclo si deve interompere se raggiungo la lunghezza dell'array oppure se trovo coorispondenza
  while (i < array.length && trovato == false) {
    if(array[i] == elemento) {
      trovato = true;
    }
    i++
  }
  return trovato;
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

function inRange(min, max, num) {
  //l-utente non puo inserire elementi che non siano numeri e che non siano nel range giusto
  if(num >= min && num <= max && !isNaN(num)) {
    return true;
  }
  return false;
}
