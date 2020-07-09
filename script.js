// Un alert espone 5 numeri casuali (univoci).
// Poi parte un timer di 30 secondi.
// Dopo 30 secondi l’utente deve inserire, un prompt alla volta, i numeri che ha visto precedentemente.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati

// genero 5 numeri casuali
var numbersCPU = [];
var min = 1;
var max = 100;

for (var i = 0; i < 5; i++) {
  numbersCPU[i] = getRandom(min, max);
}
console.log(numbersCPU);

// espongo i 5 numeri generati tramite un alert
alert("Memorizza questi numeri: " + numbersCPU);

// faccio partire il gioco dopo di 30 secondi
setTimeout(startGame(numbersCPU), 30000);

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
  alert("Hai indovinato " + numbersGuessed + " numeri: " + numbersFound);
}

// --------------------------- FUNCTIONS Utility --------------------------- //
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
