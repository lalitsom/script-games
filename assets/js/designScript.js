function getTextareaCode(){
  eval('ai1 = ' + myCodeMirror_p1.getValue());
  eval('ai2 = ' + myCodeMirror_p2.getValue());
}
 

function ToggleEditorFocus(editorId){
  console.log(editorId)
  if( $(editorId).hasClass("full-focused")){
      $(editorId).removeClass("full-focused");
  }else{
    $(editorId).addClass("full-focused");
  }
}


// initialization for select
 $(document).ready(function() {
    $('select').material_select();
  });

 $('select').on('contentChanged', function() {
  $(this).material_select();
});

       