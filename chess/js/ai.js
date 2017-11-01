// first ai for white player

ai1 = function (fenState) {
  // random moves
  var game = new Chess()
  game.load(fenState)

  var possibleMoves = game.moves();

  var randomIndex = Math.floor(Math.random() * possibleMoves.length);

  console.log('white', possibleMoves[randomIndex])

  return possibleMoves[randomIndex];
}





ai2 = function (fenState) {

  var game = new Chess(fenState)
  var possibleMoves = game.moves();


  // user defined functions
  function getEmptyFields(_fen) {

    _fen = _fen.substring(0,_fen.indexOf(' '))
    sum =0;
    for (char of _fen){
      if (isNaN(char) === false){
        sum += parseInt(char)
      }
    }
    return sum;
  }
  //end of user defined functions


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
  console.log('black', bestMove)
  return bestMove;
}
