function recientes() {
  var array = base;
  var contador = 0;
  var resultado = [];
  let temasTodos = [];
  for (var i = 0; i < array.length; i++) {
    var linea = array[i].split(' ¶ ');
      var tema = linea[0];
      temasTodos.push(tema);
  }
  temasTodos = temasTodos.sort((a, b) => a.localeCompare(b)); // ordenamiento alfabewtico
  temasTodos = [...new Set(temasTodos)]; // eliminar elementos repetidos
  temasTodos = temasTodos.filter(Boolean); // eliminar elementos vaciwos
  var temasMostrar = temasTodos.join(', ');
  document.getElementById('mostrarTemas').innerHTML = temasMostrar;
  for (var i = 0; i < array.length; i++) {
    var linea = array[i].split(' ¶ ');
    var tema = linea[0];
    var subtema = linea[1];
    var url = linea[2];
      var dominio = url?.slice(url.indexOf('://') + 3);
      var dominio = dominio?.replace(/\/.*/g,'');
      if (dominio == 'youtu.be') {var dominio = 'www.youtube.com';}
      if (dominio == 'goo.gl') {var dominio = 'maps.google.com';}
      var favicon = 'https://www.google.com/s2/favicons?domain=' + dominio + '&sz=128';
    var orden = tema + subtema;
      var orden = orden.toUpperCase().replace(/ /g,'').replace(/,/g,'').replace(/-/g,'').replace(/;/g,'').replace(/\[/g,'').replace(/\{/g,'').replace(/Á/g,'A').replace(/É/g,'E').replace(/Í/g,'I').replace(/Ó/g,'O').replace(/Ú/g,'U').replace(/Ü/g,'U').replace(/Ñ/g,'N');
    var enlace = '<a class="enlacista" href="' + url + '" target="_blank">' + url + '</a>';
    var nuevaLinea = '<!--' + orden + '--><img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace;
    resultado.push(nuevaLinea);
    contador = contador + 1;
    if (contador == 12) {break;}
  }
  resultado = resultado.sort((a, b) => a.localeCompare(b)); // ordenamiento alfabewtico
  resultado = [...new Set(resultado)]; // eliminar elementos repetidos
  resultado = resultado.filter(Boolean); // eliminar elementos vaciwos
  var enlaces = resultado.join('<p>');
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
  var array = base;
  var resultado = [];
  var recibidoOriginal = recibido.replace(/ /g,'%20');
  if (recibido.length >= 2 && recibido != ' ' && recibido != '  ' && recibido != 'temastemastemas') {
    document.getElementById('mostrar').innerHTML = '<span class="previo">[ BUSCANDO ]</span>';
    var buscadores = '<div id="buscadores">';
      var buscadores = buscadores + '<a class="buscadores" href="https://www.bing.com/search?q=' + recibidoOriginal + '" target="_blank">Bing</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://search.brave.com/search?q=' + recibidoOriginal + '" target="_blank">Brave</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://dle.rae.es/' + recibidoOriginal + '" target="_blank">DRAE</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://duckduckgo.com/?q=' + recibidoOriginal + '" target="_blank">DuckDuckGo</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://www.google.com/search?q=' + recibidoOriginal + '" target="_blank">Google</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://www.linguee.es/espanol-ingles/search?source=auto&query=' + recibidoOriginal + '" target="_blank">Linguee</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=1&wdqb=' + recibidoOriginal + '" target="_blank">MDBG</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://www.merriam-webster.com/dictionary/' + recibidoOriginal + '" target="_blank">Merriam</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://rumble.com/search/all?q=' + recibidoOriginal + '" target="_blank">Rumble</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://twitter.com/search?q=' + recibidoOriginal + '&src=typed_query&f=top" target="_blank">Twitter</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://search.yahoo.com/search?p=' + recibidoOriginal + '" target="_blank">Yahoo</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://yandex.com/search/?text=' + recibidoOriginal + '" target="_blank">Yandex</a>';
      var buscadores = buscadores + ' · <a class="buscadores" href="https://www.youtube.com/results?search_query=' + recibidoOriginal + '" target="_blank">YouTube</a>';
      var buscadores = buscadores + '</div>';
    for (var i = 0; i < array.length; i++) {
      if (array[i].toUpperCase().indexOf(recibido.toUpperCase()) >= 0) {
        var linea = array[i].split(' ¶ ');
          var tema = linea[0];
          var subtema = linea[1];
          var url = linea[2];
            var dominio = url?.slice(url.indexOf('://') + 3);
              var dominio = dominio?.replace(/\/.*/g,'');
              if (dominio == 'youtu.be') {var dominio = 'www.youtube.com';}
              if (dominio == 'goo.gl') {var dominio = 'maps.google.com';}
            var favicon = 'https://www.google.com/s2/favicons?domain=' + dominio + '&sz=128';
          var orden = tema + subtema;
            var orden = orden.toUpperCase().replace(/ /g,'').replace(/,/g,'').replace(/-/g,'').replace(/;/g,'').replace(/\[/g,'').replace(/\{/g,'').replace(/Á/g,'A').replace(/É/g,'E').replace(/Í/g,'I').replace(/Ó/g,'O').replace(/Ú/g,'U').replace(/Ü/g,'U').replace(/Ñ/g,'N');
          var enlace = '<a class="enlacista" href="' + url + '" target="_blank">' + url + '</a>';
          var nuevaLinea = '<!--' + orden + '--><img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace;
        resultado.push(nuevaLinea);
      }
    }
    resultado = resultado.sort((a, b) => a.localeCompare(b)); // ordenamiento alfabewtico
    resultado = [...new Set(resultado)]; // eliminar elementos repetidos
    resultado = resultado.filter(Boolean); // eliminar elementos vaciwos
    var enlaces = resultado.join('<p>');
    if (enlaces.indexOf('http') == -1) {var enlaces = '<span class="previo">[ ninguna coincidencia ]</span>';}
    document.getElementById('buscar').value = '';
    document.getElementById('mostrar').innerHTML = '<span style="padding: 10px 0px 10px 0px;">' + buscadores + '</span><p>' + enlaces;
  } else {
    document.getElementById('buscar').value = '';
    document.getElementById('mostrar').innerHTML =  '<span class="previo">[ mínimo dos caracteres de busca ]</span>';
  }
}
