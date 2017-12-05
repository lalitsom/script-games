var _chess = {};
  _chess.board;
   _chess.game = new Chess(),
  _chess.statusEl = $('#status'),
  _chess.fenEl = $('#fen'),
  _chess.pgnEl = $('#pgn');

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (_chess.game.game_over() === true ||
      (_chess.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (_chess.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  // see if the move is legal
  var move = _chess.game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';

  updateStatus();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  _chess.board.position(_chess.game.fen());
};

var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (_chess.game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (_chess.game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (_chess.game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (_chess.game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }
    document.getElementById('statusId').innerHTML = status;
  _chess.statusEl.html(status);
  _chess.fenEl.html(_chess.game.fen());
  _chess.pgnEl.html(_chess.game.pgn());
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
_chess.board = ChessBoard('board', cfg);

updateStatus();


var totalMoves = {
  w: {total: 0, captured: 0},
  b: {total: 0, captured: 0}
}

var moveTime = {
  w: {time_list: [], min_time: 20000, max_time: 0, sum_time: 0},
  b: {time_list: [], min_time: 20000, max_time: 0, sum_time: 0}
}

function toggle(){
  updateStatus();
  if(document.getElementById('play_btn').style.display == "none"){
    showPlayBtn();
    pauseTimeLoop();
  }else{
    showPauseBtn();
    getTextareaCode();
    runNextMove();
  }
}


function showPauseBtn(){
  document.getElementById('pause_btn').style.display = "inline-block";
  document.getElementById('play_btn').style.display = "none";
}

function showPlayBtn(){
  document.getElementById('pause_btn').style.display = "none";
  document.getElementById('play_btn').style.display = "inline-block";
}

function pauseTimeLoop(){
  if(window.timer_handle){
    clearTimeout(window.timer_handle);
  }
}



function startPlaying() {
  getTextareaCode();
  console.log('match-started');
  initBoard();
  runNextMove();
}


function initBoard() {
  pauseTimeLoop();
  showPlayBtn();
  _chess.game.reset();
  _chess.board.position(_chess.game.fen())
  totalMoves = {
    w: {total: 0, captured: 0},
    b: {total: 0, captured: 0}
  }

  moveTime = {
    w: {time_list: [], min_time: 20000, max_time: 0, sum_time: 0},
    b: {time_list: [], min_time: 20000, max_time: 0, sum_time: 0}
  }
  updateStatus();
}



function runNextMove(){
updateStatus();
var possibleMoves = _chess.game.moves();
  // exit if game is over
  if (_chess.game.game_over() === true || _chess.game.in_draw() === true || possibleMoves.length === 0){

    return;
  }

  var date = new Date()
  var startTime = date.getTime()

  if(_chess.game.turn() === 'w'){
    _chess.game.move( ai1(_chess.game.fen()) );
  }else if (_chess.game.turn() === 'b') {
    _chess.game.move( ai2(_chess.game.fen()) );
  }

  date = new Date();
  var timeElapsed = date.getTime() - startTime
console.log(_chess.game.turn());

  if(_chess.game.turn()=== 'w'){
    updateStatsData(timeElapsed, moveTime.b, totalMoves.b)

}else if (_chess.game.turn() === 'b') {
  updateStatsData(timeElapsed, moveTime.w, totalMoves.w)
}

  _chess.board.position(_chess.game.fen());
  updateStatsView();
  window.timer_handle = setTimeout(runNextMove, 400);

}


function updateStatsData(_tElapsed,p_time,p_moves){
  if(_tElapsed > p_time.max_time){
    p_time.max_time = _tElapsed;
  }
  if(_tElapsed < p_time.min_time){
    p_time.min_time = _tElapsed;
  }
  p_time.sum_time += _tElapsed;
  p_moves.total += 1;
  p_time.time_list.push(_tElapsed)
}

function updateStatsView(){
//white
document.getElementById('min_time_p1').innerHTML = moveTime.w.min_time;
document.getElementById('max_time_p1').innerHTML = moveTime.w.max_time;
var avg_time =  parseInt(moveTime.w.sum_time/totalMoves.w.total);
document.getElementById('avg_time_p1').innerHTML = avg_time;

//black

document.getElementById('min_time_p2').innerHTML = moveTime.b.min_time;
document.getElementById('max_time_p2').innerHTML = moveTime.b.max_time;
avg_time =  parseInt(moveTime.b.sum_time/totalMoves.b.total);
document.getElementById('avg_time_p2').innerHTML = avg_time;
}
