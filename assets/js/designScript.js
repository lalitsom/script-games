function setTextareaCode(){
  p1_code = document.getElementById('player1_textarea')
  p1_code.innerHTML =ai1.toString();

  p2_code = document.getElementById('player2_textarea')
  p2_code.value =ai2.toString();

}

function getTextareaCode(){
  p1_code = document.getElementById('player1_textarea')
  eval('ai1 = ' + p1_code.value);

  p2_code = document.getElementById('player2_textarea')
  eval('ai2 = ' + p2_code.value);

}

setTextareaCode();

function ToggleEditorFocus(editorId){
  console.log(editorId)
  if( $(editorId).hasClass("full-focused")){
      $(editorId).removeClass("full-focused");
  }else{
    $(editorId).addClass("full-focused");
  }
}
