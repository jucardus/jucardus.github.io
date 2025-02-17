function recientes() {
  var array = base;
  var contador = 0;
  var resultado = [];
  let temasTodos = [];
  for (var i = 0; i < array.length; i++) {
    var linea = array[i].split(' ¶ ');
      var tema = linea[0];
      var subtema = linea[1];
      var url = linea[2];
    var nuevaLinea = '<p><b><a href="' + url + '">' + tema + '</a></b> <span class="barrita">&ndash;</span> ' + subtema + '</p>';
    resultado.push(nuevaLinea);
    contador = contador + 1;
    if (contador == 12) {break;}
  }
  var enlaces = resultado.join('');
  document.getElementById('mostrar').innerHTML = enlaces;
}
function teclaBuscar (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar('');
  }
}
function buscar() {
  let recibido = document.getElementById("buscar").value;
  if (recibido == 'mostrar todo') {var recibido = ' ¶ ';}
  var array = base;
  var resultado = [];
  if (recibido.length >= 2 && recibido != ' ' && recibido != '  ' && recibido != 'temastemastemas') {
    document.getElementById('mostrar').innerHTML = '<span class="previo">[ BUSCANDO ]</span>';
    for (var i = 0; i < array.length; i++) {
      if (array[i].toUpperCase().indexOf(recibido.toUpperCase()) >= 0) {
        var linea = array[i].split(' ¶ ');
        var linea = array[i].split(' ¶ ');
          var tema = linea[0];
          var subtema = linea[1];
          var url = linea[2];
          var orden = tema.toUpperCase().replace(/ /g,'').replace(/,/g,'').replace(/-/g,'').replace(/;/g,'').replace(/\[/g,'').replace(/\{/g,'').replace(/Á/g,'A').replace(/É/g,'E').replace(/Í/g,'I').replace(/Ó/g,'O').replace(/Ú/g,'U').replace(/Ü/g,'U').replace(/Ñ/g,'N');
        var nuevaLinea = '<p><!--' + orden + '--><b><a href="' + url + '">' + tema + '</a></b> <span class="barrita">&ndash;</span> ' + subtema + '</p>';
        resultado.push(nuevaLinea);
      }
    }
    resultado = resultado.sort((a, b) => a.localeCompare(b));
    var enlaces = resultado.join('<p>');
    if (enlaces.indexOf('http') == -1) {var enlaces = '<span class="previo">[ ninguna coincidencia ]</span>';}
    document.getElementById('buscar').value = '';
    document.getElementById('mostrar').innerHTML = enlaces;
  } else {
    document.getElementById('buscar').value = '';
    document.getElementById('mostrar').innerHTML =  '<span class="previo">[ mínimo dos caracteres de busca ]</span>';
  }
}
