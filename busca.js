function teclaBuscar (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar('');
  }
}
function buscar() {
  let recibido = document.getElementById("buscar").value;
  var array = base;
  var resultado = [];
  if (recibido.length >= 2 && recibido != ' ' && recibido != '  ') {
    for (var i = 0; i < array.length; i++) {
      if (array[i].toUpperCase().indexOf(recibido.toUpperCase()) >= 0) {
        var linea = array[i].split(' ¶ ');
          var titulo = linea[0];
          var url = linea[1];
          var orden = titulo + url;
            var orden = orden.toUpperCase().replace(/ /g,'').replace(/,/g,'').replace(/-/g,'').replace(/;/g,'').replace(/\[/g,'').replace(/\{/g,'').replace(/Á/g,'A').replace(/É/g,'E').replace(/Í/g,'I').replace(/Ó/g,'O').replace(/Ú/g,'U').replace(/Ü/g,'U').replace(/Ñ/g,'N');
          var enlace = '<a class="enlacista" href="' + url + '">' + titulo + '</a>';
          var nuevaLinea = '<li><!--' + orden + '-->' + enlace + '</li>';
        resultado.push(nuevaLinea);
      }
    }
    resultado = resultado.sort((a, b) => a.localeCompare(b)); // ordenamiento alfabewtico
    resultado = [...new Set(resultado)]; // eliminar elementos repetidos
    resultado = resultado.filter(Boolean); // eliminar elementos vaciwos
    var enlaces = resultado.join('');
      var enlaces = '<ul>' + enlaces + '</ul';
    if (enlaces.indexOf('href') == -1) {var enlaces = '<span class="previo">[ ninguna coincidencia ]</span>';}
    document.getElementById('buscar').value = '';
    document.getElementById('mostrar').innerHTML = enlaces;
  } else {
    document.getElementById('buscar').value = '';
    document.getElementById('mostrar').innerHTML =  '<span class="previo">[ mínimo dos caracteres de busca ]</span>';
  }
}
