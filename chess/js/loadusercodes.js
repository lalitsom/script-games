function setcodes_inselect(){

  tmpcodes = window.codes
    for (var codename in window.codes){
      if (tmpcodes.hasOwnProperty(codename)) {
            var optionobj1 = ($("<option>").attr("value",codename).text(codename)).get(0);
           
           $('select')[0].append( optionobj1 ); 
           $('select').material_select();

           var optionobj2 = ($("<option>").attr("value",codename).text(codename)).get(0);
           $('select')[1].append( optionobj2 );
           $('select').material_select();
      }
  }
  
}

setcodes_inselect();

// refresh code
myCodeMirror_p1.setValue(window.codes[$('#blue_select_code')[0].value].toString()); 
myCodeMirror_p2.setValue(window.codes[$('#red_select_code')[0].value].toString()); 


// on select trigger change
$('#blue_select_code').on('change', function() {
  ai1 = window.codes[this.value]
  myCodeMirror_p1.setValue(ai1.toString()); 
})

$('#red_select_code').on('change', function() {
  ai2 = window.codes[this.value]
  myCodeMirror_p2.setValue(ai2.toString());
})