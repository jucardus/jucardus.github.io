let texto = '';
let direccion = '';
function inicio () {
  direccion = window.location.href.replace(/.*io\/\?=/g,'');
    if (direccion.match(/^[0-9]+$/) != null && direccion.length == 10) {
      let str1 = '-'; let str2 = ' '; let str3 = ':';
      let idx1 = 2; direccion = direccion.substring(0, idx1) + str1 + direccion.substring(idx1);
      let idx2 = 5; direccion = direccion.substring(0, idx2) + str1 + direccion.substring(idx2);
      let idx3 = 8; direccion = direccion.substring(0, idx3) + str2 + direccion.substring(idx3);
      let idx4 = 11; direccion = direccion.substring(0, idx4) + str3 + direccion.substring(idx4);
    } else {}
  fetch('index.txt')
  .then(response => response.text()) 
  .then(textString => {
    formateo(textString);
  });
}
function formateo (recibido) {
  texto = recibido;
  var contador = 0;
  var recibido = recibido.replace(/,TEM,TIT,CON,ENL,IMG,FEC\n/g,'').replace(/, /g,'ŧ ').replace(/\"/g,'');
  var recibido = recibido.replace(/\n/g,'¶¶¶¶¶');
  var resultado = [];
  var arrayContenido = recibido.split('¶¶¶¶¶');
  for (var i = 0; i < arrayContenido.length; i++) {
    var linea = arrayContenido[i].split(',');
      var nmr = linea[0];
        var fechaSimple = 'jucardus.github.io/' + linea[6]?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
        if (linea[4] == '') {
          var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,140) + '... ← ' + fechaSimple + '%0A%0A@jucardus%20%23">' + nmr + '</a>';
        }
        if (linea[4] != '') {
          var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A@jucardus%20%23">' + nmr + '</a>';
        }
      var tm = linea[1];
        var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
      var ttl = linea[2];
        if (linea[2] == '') {ttl = linea[3]?.slice(0,39) + '...';}
        var ttl = '<h3 class="titulos">' + ttl?.replace('....','...') + '</h3>';
      var enlc = linea[4];
        if (enlc != '') {
          var dominio = enlc?.slice(enlc.indexOf('://') + 3).replace(/\/.*/g,'');
          var enlc = ' → <a class="enlacista" href="' + enlc + '" target="_blank">' + dominio + '</a>';
        } else {enlc = '';}
      var cntnd = linea[3];
        var cntnd = cntnd?.replace(/¦/g,'<br/>').replace(/¶/g,'<p>');
        var cntnd = '<p class="contenido">' + cntnd + enlc + '</p>';
      var imgn = linea[5];
      var fch = linea[6];
        var fechaSimple = fch?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
        var fch = '<span onclick="copiarEnlace(\'' + fechaSimple + '\')" class="fecha">' + fch?.slice(2) + '</span>';
      var nuevaLinea = '<div id="entrada">' + ttl + '<div id="clasificacion">' + nmr + ' · ' + tm + ' · ' + fch + '</div>' + cntnd + imgn + '</div>';
      if (ttl != '<h3 class="titulos">undefined</h3>') {
        resultado.push(nuevaLinea);
        contador = contador + 1;
          if (contador == 10) {break;}
      }
  }
  var enviar = resultado.join('<p>');
    var enviar = enviar.replace(/ŧ /g,', ');
    var enviar = enviar.replace(/ŧ/g,', ');
  document.getElementById('mostrar').innerHTML = enviar;
  document.getElementById('buscador').style.display = 'none';
  subrayar('inicio');
  window.scrollTo(0, 0);
  if (direccion != '' && direccion.indexOf('jucardus') == -1) {
    buscar(direccion);
  }
}
function autor() {
  var contenidoAutor = "<ul><li><b>Autor:</b> Julio Cárdenas Pelizzari ©</li><li><b>Contacto:</b> jucardus en gmail punto com</li><li><b>Donaciones:</b> pp.jucardus.com</li><li><b>Invitación a pCloud:</b> i.jucardus.com</li><li><b>Facebook:</b> fb.jucardus.com</li><li><b>X Twitter:</b> x.jucardus.com</li></ul>";
  document.getElementById('mostrar').innerHTML = contenidoAutor;
  subrayar('autor');
  document.getElementById('buscador').style.display = 'none';
  window.scrollTo(0, 0);
}
function aclaraciones() {
  var aclaraciones = "<ul><li>La página de inicio, y todas las etiquetas o temas, muestran las diez entradas más recientes.</li><li>Clica en la lupa para buscar entre todas las entradas del sitio, sin límite de coincidencias. El mínimo de caracteres de búsqueda es dos.</li><li>Clica en los números verdes debajo de los títulos para compartir la entrada en X Twitter.</li><li>Para copiar el enlace a una entrada en particular, clica en la fecha en color gris debajo del título correspondiente.</li><li>Si deseas hacer comentarios, críticas o correcciones a mi contenido, sírvete escribir a jucardus en gmail punto com.</li></ul>";;
  document.getElementById('mostrar').innerHTML = aclaraciones;
  subrayar('aclaraciones');
  document.getElementById('buscador').style.display = 'none';
  window.scrollTo(0, 0);
}
function segunTema (temaRecibido) {
  var recibido = texto;
  var contador = 0;
  var contador = 0;
  var recibido = recibido.replace(/,TEM,TIT,CON,ENL,IMG,FEC\n/g,'').replace(/, /g,'ŧ ').replace(/\"/g,'');
  var recibido = recibido.replace(/\n/g,'¶¶¶¶¶');
  var resultado = [];
  var arrayContenido = recibido.split('¶¶¶¶¶');
  for (var i = 0; i < arrayContenido.length; i++) {
    var linea = arrayContenido[i].split(',');
      var nmr = linea[0];
        var fechaSimple = 'jucardus.github.io/' + linea[6]?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
        if (linea[4] == '') {
          var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,140) + '... ← ' + fechaSimple + '%0A%0A@jucardus%20%23">' + nmr + '</a>';
        }
        if (linea[4] != '') {
          var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A@jucardus%20%23">' + nmr + '</a>';
        }
      var tm = linea[1];
        var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
      var ttl = linea[2];
        if (linea[2] == '') {ttl = linea[3]?.slice(0,39) + '...';}
        var ttl = '<h3 class="titulos">' + ttl?.replace('....','...') + '</h3>';
      var enlc = linea[4];
        if (enlc != '') {
          var dominio = enlc?.slice(enlc.indexOf('://') + 3).replace(/\/.*/g,'');
          var enlc = ' → <a class="enlacista" href="' + enlc + '" target="_blank">' + dominio + '</a>';
        } else {enlc = '';}
      var cntnd = linea[3];
        var cntnd = cntnd?.replace(/¦/g,'<br/>').replace(/¶/g,'<p>');
        var cntnd = '<p class="contenido">' + cntnd + enlc + '</p>';
      var imgn = linea[5];
      var fch = linea[6];
        var fechaSimple = fch?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
        var fch = '<span onclick="copiarEnlace(\'' + fechaSimple + '\')" class="fecha">' + fch?.slice(2) + '</span>';
      var nuevaLinea = '<div id="entrada">' + ttl + '<div id="clasificacion">' + nmr + ' · ' + tm + ' · ' + fch + '</div>' + cntnd + imgn + '</div>';
      if (tm.toUpperCase().indexOf(temaRecibido.toUpperCase()) >= 0) {
        resultado.push(nuevaLinea);
        contador = contador + 1;
          if (contador == 10) {break;}
      }
  }
  var enviar = resultado.join('<p>');
    var enviar = enviar.replace(/ŧ /g,', ');
    var enviar = enviar.replace(/ŧ/g,', ');
  document.getElementById('mostrar').innerHTML = enviar;
  document.getElementById('buscador').style.display = 'none';
  subrayar(temaRecibido);
  window.scrollTo(0, 0);
}
function subrayar (temaSubrayar) {
  var fondoNoClicados = '4px solid White';
  const temasTodos = document.getElementsByClassName('temas');
  for (let i = 0; i < temasTodos.length; i++) {
    temasTodos[i].style.borderBottom = fondoNoClicados;
  }
  if (temaSubrayar == 'poesía') {temaSubrayar = 'poesia';}
  document.getElementById(temaSubrayar).style.borderBottom = '4px solid Orange';
  document.getElementById('buscador').style.display = 'none';
}
function mostrarBuscador () {
  document.getElementById('buscador').style.display = 'block';
  document.getElementById('buscar').focus();
}
function teclaBuscar (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar('');
  }
}
function buscar (recibidoDireccion) {
  let lema = document.getElementById("buscar").value.toUpperCase();
  if (recibidoDireccion != '') {
    lema = direccion
      .replace(/%C3%A1/g,'Á')
      .replace(/%C3%A9/g,'É')
      .replace(/%C3%AD/g,'Í')
      .replace(/%C3%B3/g,'Ó')
      .replace(/%C3%BA/g,'Ú')
      .replace(/%C3%BC/g,'Ü')
      .replace(/%C3%B1/g,'Ñ')
      .replace(/%20/g,' ')
      .toUpperCase();
  }
  var recibido = texto;
  var recibido = recibido.replace(/,TEM,TIT,CON,ENL,IMG,FEC\n/g,'').replace(/, /g,'ŧ ').replace(/\"/g,'');
  var recibido = recibido.replace(/\n/g,'¶¶¶¶¶');
  var resultadoBusca = [];
  var arrayContenido = recibido.split('¶¶¶¶¶');
  for (var i = 0; i < arrayContenido.length; i++) {
    if (arrayContenido[i].toUpperCase().indexOf(lema) >= 0 && lema.length >= 2) {
      var linea = arrayContenido[i].split(',');
        var nmr = linea[0];
          var fechaSimple = 'jucardus.github.io/' + linea[6]?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
          if (linea[4] == '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,140) + '... ← ' + fechaSimple + '%0A%0A@jucardus%20%23">' + nmr + '</a>';
          }
          if (linea[4] != '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A@jucardus%20%23">' + nmr + '</a>';
          }
        var tm = linea[1];
          var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
        var ttl = linea[2];
          if (linea[2] == '') {ttl = linea[3]?.slice(0,39) + '...';}
          var ttl = '<h3 class="titulos">' + ttl?.replace('....','...') + '</h3>';
        var enlc = linea[4];
          if (enlc != '') {
            var dominio = enlc?.slice(enlc.indexOf('://') + 3).replace(/\/.*/g,'');
            var enlc = ' → <a class="enlacista" href="' + enlc + '" target="_blank">' + dominio + '</a>';
          } else {enlc = '';}
        var cntnd = linea[3];
          var cntnd = cntnd?.replace(/¦/g,'<br/>').replace(/¶/g,'<p>');
          var cntnd = '<p class="contenido">' + cntnd + enlc + '</p>';
        var imgn = linea[5];
        var fch = linea[6];
          var fechaSimple = fch?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
          var fch = '<span onclick="copiarEnlace(\'' + fechaSimple + '\')" class="fecha">' + fch?.slice(2) + '</span>';
        var nuevaLineaBusca = '<div id="entrada">' + ttl + '<div id="clasificacion">' + nmr + ' · ' + tm + ' · ' + fch + '</div>' + cntnd + imgn + '</div>';
        resultadoBusca.push(nuevaLineaBusca);
        }
  }
  var enviar = resultadoBusca.join('<p>');
    var enviar = enviar.replace(/ŧ /g,', ');
    var enviar = enviar.replace(/ŧ/g,', ');
  if (enviar.indexOf('<') == -1) {enviar = '&#12288;<span style="color: OrangeRed;">[ ninguna coincidencia ]</span>';}
  document.getElementById('mostrar').innerHTML = enviar;
  document.getElementById('buscar').value = '';
  document.getElementById('buscador').style.display = 'none';
  var fondoNoClicados = '4px solid White';
  const temasTodos = document.getElementsByClassName('temas');
  for (let i = 0; i < temasTodos.length; i++) {
    temasTodos[i].style.borderBottom = fondoNoClicados;
  }
  window.scrollTo(0, 0);
  const nextURL = 'https://jucardus.github.io/';
  const nextTitle = 'My new page title';
  const nextState = { additionalInformation: 'Updated the URL with JS' };
  window.history.replaceState(nextState, nextTitle, nextURL);
}
function copiarEnlace (fechaSimpleRecibida) {
  var urlFecha = 'jucardus.github.io/' + fechaSimpleRecibida;
  navigator.clipboard.writeText(urlFecha);
  //buscar(fechaSimpleRecibida);
}
