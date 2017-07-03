/*
JavsScript
*/
  // creamos un objeto de firebase, y le pasamos la URL como parametro
  var ref = new Firebase("https://proyectorpi.firebaseio.com/");

  // Traemos el valor de los sensores
  ref.once("value", function(res) {

    var sensorTemp = res.child("sensor/temp");
    var valorSensorTemp = sensorTemp.val()
    $('#temp').text(valorSensorTemp);

    var sensorph = res.child("sensor/ph");
    var valorSensorph = sensorph.val()
    $('#ph').text(valorSensorph);
    
    var sensorsoil = res.child("sensor/soil");
    var valorSensorsoil = sensorsoil.val()
    $('#soil').text(valorSensorsoil);

    // llamamos, la funcion cambiarImagen.
    cambiarImagen(valorSensorph,valorSensorTemp,valorSensorsoil)

  });

  // Obtenemos el valor de los sensores cada vez que hay un cambio
  // (En tiempo real)
  ref.on("child_changed", function(res) {

    var valorSensorTemp = res.val().temp
    $('#temp').text(valorSensorTemp);

    var valorSensorph = res.val().ph
    $('#ph').text(valorSensorph);        
	
	 var valorSensorsoil = res.val().soil
    $('#soil').text(valorSensorsoil);  
    cambiarImagen(valorSensorph,valorSensorTemp,valorSensorsoil)

  });        

  /* 
    función para cambiar la imagen de fondo
    de acuerdo a los valores de los sensores
  */

  function cambiarImagen(valorSensorph, valorSensorTemp, valorSensorsoil){

    if(valorSensorph>=7){

        console.log("Es de dia");

        if(valorSensorTemp<17){

          console.log("dia frio");
          $("#imgDiaFrio").siblings().fadeOut(3000);
          $("#imgDiaFrio").fadeIn(3000);
          $("#dia").text("Dia Frio");

        }
        else if(valorSensorTemp>17 && valorSensorTemp<=23){
          console.log("dia fresco");
          $("#imgDiaFresco").siblings().fadeOut(3000);
          $("#imgDiaFresco").fadeIn(3000)
          $("#dia").text("Dia Fresco");
        }

        else if(valorSensorTemp>24){
          console.log("dia Calido");
          $("#imgDiaCalido").siblings().fadeOut(3000);
          $("#imgDiaCalido").fadeIn(3000);
          $("#dia").text("Dia Calido");
        }

    }else{
        console.log("Es de noche");
        $("#imgNoche").siblings().fadeOut(3000);
        $("#imgNoche").fadeIn(3000);          
        $("#dia").text("Noche");

    }
 }       