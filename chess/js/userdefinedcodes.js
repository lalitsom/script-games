window.codes = {}


// create an empty json object by your github username under global 'codes' json object



// assign the function under your username json container


// lalitsom #1
window.codes.lalitsom_killall = function (fenState) {

  // kill whenever you can  
  var game = new Chess(fenState);
  var possibleMoves = game.moves();

  // define on your functions
  function getEmptyFields(_fen) {
    _fen = _fen.substring(0,_fen.indexOf(' '));
    sum =0;
    for (char of _fen){
      if (isNaN(char) === false){
        sum += parseInt(char);
      }
    }
    return sum;
  }
  //end of function def


bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  emptyFields = getEmptyFields(fenState)

  for (move of possibleMoves) {
    let $game = new Chess(fenState)
    $game.move(move)

    if ( getEmptyFields($game.fen()) > emptyFields){
      bestMove = move;
      break;
    }

  }
  
  return bestMove;
}




// lalitsom#2
// assign another function under different name

window.codes.lalitsom_random = function (fenState) {
  
  // this function just choose random moves
  var game = new Chess();
  game.load(fenState);
  var possibleMoves = game.moves();
  var randomIndex = Math.floor(Math.random() * possibleMoves.length);  
  return possibleMoves[randomIndex];
}


















// add your  code here

// window.codes.yourGithubUsername_yourUniqueFunction = function (fenState) {

//   // do some calculations and calculate the best move
  
//   return bestMove;
// }
