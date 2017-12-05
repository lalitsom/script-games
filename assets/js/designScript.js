function setTextareaCode(){
  p1_code = document.getElementById('player1_textarea')
  p1_code.innerHTML =ai1.toString();

  p2_code = document.getElementById('player2_textarea')
  p2_code.innerHTML =ai2.toString();

}

function getTextareaCode(){
  eval('ai1 = ' + myCodeMirror_p1.getValue());
  eval('ai2 = ' + myCodeMirror_p2.getValue());
}

 // setTextareaCode();

function ToggleEditorFocus(editorId){
  console.log(editorId)
  if( $(editorId).hasClass("full-focused")){
      $(editorId).removeClass("full-focused");
  }else{
    $(editorId).addClass("full-focused");
  }
}
