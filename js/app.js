 let card = document.getElementsByClassName("card");
 let cards = [...card];
 const deck = document.getElementById("deck");
 var flipped = [];

 var display;
 let minutes = 0;
 let seconds = 0;
 var totalTime;

 const gamerMoves = document.querySelector('.moves');

 let stars = 3;
 let moves = document.getElementById('#moves');
 let resultTotalStars = document.querySelector('.totalStars');
 let resultPersonal = document.querySelector('.personal');
 let resultTime = document.querySelector('.watch');

 let pairCard = document.getElementsByClassName("match");
 document.body.onload = startGame();

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
   var currentIndex = array.length,
     temporaryValue, randomIndex;

   while (currentIndex !== 0) {
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }

   return array;
 };


 // Gamer Moves and reducing stars
 function countMoves() {
   moves++;
   gamerMoves.innerHTML = moves;
   if (moves == 10) {
     document.querySelector('.stars').firstElementChild.remove();
     stars--;
   }
   if (moves == 20) {
     document.querySelector('.stars').firstElementChild.remove();
     stars--;
   }
 }

 // timer
 const timer = document.querySelector('.timer');
 // var stopwatch =document.getElementById('#stopwatch');

 function myTimer() {
   seconds++;
   if (seconds >= 60) {
     seconds = 0;
     minutes++;
   }
   display = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
   timer.innerHTML = display;
   count();
 }

 function count() {
   totalTime = setTimeout(myTimer, 1000);
 }



 /* function to start game, shuffle cards, reset moves, reset stars,
  reset timer */
 function startGame() {
   cards = shuffle(cards);
   for (var i = 0; i < cards.length; i++) {
     deck.innerHTML = "";
     [].forEach.call(cards, function(symbol) {
       deck.appendChild(symbol);
     });
     cards[i].classList.remove("show", "open", "match", "disabled", "animated", "flipInY", "rubberBand");
   }
   moves = 0;
   gamerMoves.innerHTML = "0";

   var node = document.createElement("LI");
   var child = document.createElement("i");
   child.className = "fa fa-star";

   node.appendChild(child);
   for (var i = stars; i < 3; i++) {
     if (stars < 3) {
       document.querySelector('.stars').appendChild(node);
       stars++;
     }
   }
   minutes = 0;
   seconds = 0;
   var timer = document.querySelector('.timer');
   timer.innerHTML = "00:00";
   clearInterval(totalTime);
   count();
 }


 function resultMove() {
   flipped.push(this);
   var x = flipped.length;
   if (x === 2) {
     countMoves();
     if (flipped[0].type === flipped[1].type) {
       matched();
     } else {
       unmatched();
     }
   }

 }

 var flip = function() {
   this.classList.add("animated", "flipInY");
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
 }

 for (var i = 0; i < cards.length; i++) {
   card = cards[i];
   card.addEventListener("click", flip);
   card.addEventListener("click", resultMove);

 }

 // if cards match
 function matched() {
   flipped[0].classList.remove("animated", "flipInY", "disabled");
   flipped[1].classList.remove("animated", "flipInY", "disabled");
   flipped[0].classList.add("animated", "rubberBand");
   flipped[1].classList.add("animated", "rubberBand");
   flipped[0].classList.add("match");
   flipped[1].classList.add("match");
   flipped[0].classList.remove("show", "open", "flipInY");
   flipped[1].classList.remove("show", "open", "flipInY");
   for (var i = 0; i < cards.length; i++) {
     card = cards[i];
     card.classList.add("disabled");
   }
   setTimeout(function() {
     flipped[0].classList.remove("show", "open", "unmatched", "animated", "flipInY", "shake", "rubberBand");
     flipped[1].classList.remove("show", "open", "unmatched", "animated", "flipInY", "shake", "rubberBand");
     for (var i = 0; i < cards.length; i++) {
       card = cards[i];
       if (flipped[0] != cards[i]) {
         card.classList.remove("disabled");
       }
       if (flipped[1] != cards[i]) {
         card.classList.remove("disabled");
       }
     }
     flipped = [];
   }, 1000);
 }

 // if cards don't match
 function unmatched() {
   flipped[0].classList.remove("animated", "flipInY", "disabled");
   flipped[1].classList.remove("animated", "flipInY", "disabled");
   flipped[0].classList.add("unmatched", "animated", "shake");
   flipped[1].classList.add("unmatched", "animated", "shake");

   for (var i = 0; i < cards.length; i++) {
     card = cards[i];
     card.classList.add("disabled");
   }
   setTimeout(function() {
     flipped[0].classList.remove("show", "open", "unmatched", "disabled", "animated", "flipInY", "shake");
     flipped[1].classList.remove("show", "open", "unmatched", "disabled", "animated", "flipInY", "shake");
     for (var i = 0; i < cards.length; i++) {
       card = cards[i];
       card.classList.remove("disabled");
     }
     flipped = [];
   }, 1000);
 }

 // Modal Popup
 let modal = document.querySelector(".modal");
 let results = document.querySelector(".results");
 let againButton = document.querySelector(".again-button");

 // all cards are matched, Modal opens, Results are displayed
 function gameOver() {
   if (pairCard.length == 16) {
     modal.classList.toggle("show-modal");
     resultTotalStars.innerHTML = stars;
     resultPersonal.innerHTML = moves;
     resultTime.innerHTML = display;
   };
 }
 // playAgain Button closes Modal and restarts the game
 function playAgain() {
   modal.classList.toggle("show-modal");
   startGame();
   //pairCard.classList.toggle("match");
 }

 for (var i = 0; i < cards.length; i++) {
   card = cards[i];
   card.addEventListener("click", gameOver);
 };

 againButton.addEventListener("click", playAgain);
