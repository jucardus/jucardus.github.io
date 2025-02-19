let texto = '';
let direccion = '';

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function inicio () {
  direccion = window.location.href.replace(/.*io\/\?q=/g,'');
    if (direccion.match(/^[0-9]+$/) != null && direccion.length == 10) {
      let str1 = '-'; let str2 = ' '; let str3 = ':';
      let idx1 = 2; direccion = direccion.substring(0, idx1) + str1 + direccion.substring(idx1);
      let idx2 = 5; direccion = direccion.substring(0, idx2) + str1 + direccion.substring(idx2);
      let idx3 = 8; direccion = direccion.substring(0, idx3) + str2 + direccion.substring(idx3);
      let idx4 = 11; direccion = direccion.substring(0, idx4) + str3 + direccion.substring(idx4);
    } else {}
  fetch('= JUCARDUS =_= base =.csv')
  .then(response => response.text())
  .then(textString => {
    formateo(textString);
  });
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

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
        var hashtag = formateoHashtag (linea[1]);
        if (linea[4] == '') {
          var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,108) + '... ← ' + fechaSimple + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
        }
        if (linea[4] != '') {
          var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
        }
      var tm = linea[1];
        var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
      var ttl = linea[2];
        if (linea[2] == '') {ttl = linea[3]?.slice(0,39) + '...';}
        var ttl = '<h3 class="titulos" onclick="mostrarUnico(\'' + linea[6] + '\')">' + ttl + '</h3>';
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
    var enviar = enviar.replace(/\.\.\.\./g,'...');
    var enviar = enviar.replace(/ \.\.\./g,'...');
  document.getElementById('mostrar').innerHTML = enviar;
  document.getElementById('buscador').style.display = 'none';
  subrayar('inicio');
  window.history.replaceState({}, document.title, '/' + '');
  document.getElementById("qrCambiante").src = 'https://quickchart.io/qr?text=jucardus.github.io&size=100x100&margin=1&ecLevel=M&dark=222&light=fff&format=png';
  window.scrollTo(0, 0);
  if (direccion != '' && direccion.indexOf('jucardus') == -1) {
    buscar(direccion);
  }
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

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
        var hashtag = formateoHashtag (linea[1]);
        if (linea[4] == '') {
          var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,108) + '... ← ' + fechaSimple + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
        }
        if (linea[4] != '') {
          var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
        }
      var tm = linea[1];
        var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
      var ttl = linea[2];
        if (linea[2] == '') {ttl = linea[3]?.slice(0,39) + '...';}
        var ttl = '<h3 class="titulos" onclick="mostrarUnico(\'' + linea[6] + '\')">' + ttl + '</h3>';
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
    var enviar = enviar.replace(/\.\.\.\./g,'...');
    var enviar = enviar.replace(/ \.\.\./g,'...');
  document.getElementById('mostrar').innerHTML = enviar;
  document.getElementById('buscador').style.display = 'none';
  subrayar(temaRecibido);
  document.getElementById("qrCambiante").src = 'https://quickchart.io/qr?text=jucardus.github.io/' + temaRecibido + '&size=100x100&margin=1&ecLevel=M&dark=222&light=fff&format=png';
  window.scrollTo(0, 0);
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function subrayar (temaSubrayar) {
  var fondoNoClicados = '4px solid White';
  const temasTodos = document.getElementsByClassName('temas');
    for (let i = 0; i < temasTodos.length; i++) {
      temasTodos[i].style.borderBottom = fondoNoClicados;
    }
    if (temaSubrayar == 'poesía') {temaSubrayar = 'poesia';}
  window.history.replaceState({}, document.title, '/' + temaSubrayar);
  document.getElementById(temaSubrayar).style.borderBottom = '4px solid Orange';
  document.getElementById('buscador').style.display = 'none';
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function mostrarBuscador () {
  limpiarSubrayados ();
  window.history.replaceState({}, document.title, '/' + 'busca');
  document.getElementById('mostrar').innerHTML = '';
  document.getElementById('buscador').style.display = 'block';
  document.getElementById('buscar').focus();
  document.getElementById("qrCambiante").src = 'https://quickchart.io/qr?text=jucardus.github.io/busca&size=100x100&margin=1&ecLevel=M&dark=222&light=fff&format=png';
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function teclaBuscar (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar('');
  }
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function buscar (recibidoDireccion) {
  var lema = document.getElementById("buscar").value.toUpperCase();
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
  var contador = 0;
  var recibido = texto;
  var recibido = recibido.replace(/,TEM,TIT,CON,ENL,IMG,FEC\n/g,'').replace(/, /g,'ŧ ').replace(/\"/g,'');
  var recibido = recibido.replace(/\n/g,'¶¶¶¶¶');
  var resultadoBusca = [];
  var arrayContenido = recibido.split('¶¶¶¶¶');
  for (var i = 0; i < arrayContenido.length; i++) {
    if (arrayContenido[i].toUpperCase().indexOf(lema) >= 0 && lema.length >= 1 && lema != ' ') {
      var linea = arrayContenido[i].split(',');
        var nmr = linea[0];
          var fechaSimple = 'jucardus.github.io/' + linea[6]?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
          var hashtag = formateoHashtag (linea[1]);
          if (linea[4] == '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,108) + '... ← ' + fechaSimple + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
          }
          if (linea[4] != '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
          }
        var tm = linea[1];
          var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
        var ttl = linea[2];
          if (linea[2] == '') {ttl = linea[3]?.slice(0,39) + '...';}
          var ttl = '<h3 class="titulos" onclick="mostrarUnico(\'' + linea[6] + '\')">' + ttl + '</h3>';
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
        var buscado = lema.replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').replace(/%20/g,'').toLowerCase();
        if (buscado.match(/^[0-9]+$/) != null && buscado.length == 10) {
          var nuevaLineaBusca = '<div id="entrada">' + ttl + '<div id="clasificacion">' + nmr + ' · ' + tm + ' · ' + fch + '</div>' + cntnd + imgn + '</div>';
        } else {
          var nuevaLineaBusca = '<div id="entradaBusca">' + ttl + '<div id="clasificacion">' + nmr + ' · ' + tm + ' · ' + fch + '</div></div>';
          contador = contador + 1;
        }
        resultadoBusca.push(nuevaLineaBusca);
    }
  }
  var enviar = resultadoBusca.join('<p>');
    var enviar = enviar.replace(/ŧ /g,', ');
    var enviar = enviar.replace(/ŧ/g,', ');
    var enviar = enviar.replace(/\.\.\.\./g,'...');
    var enviar = enviar.replace(/ \.\.\./g,'...');
  document.getElementById('buscador').style.display = 'none';
  if (enviar.indexOf('<') == -1) {
    enviar = '<div id="ninguna">[ ninguna coincidencia ]</div>';
    document.getElementById('buscador').style.display = 'block';
  }
  document.getElementById('mostrar').innerHTML = '<div id="resultadosBusca">' + enviar + '</div>';
  document.getElementById('buscar').value = '';
  var fondoNoClicados = '4px solid White';
  const temasTodos = document.getElementsByClassName('temas');
  for (let i = 0; i < temasTodos.length; i++) {
    temasTodos[i].style.borderBottom = fondoNoClicados;
  }
  if (recibidoDireccion != '') {
    var numero = recibidoDireccion.replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').replace(/%20/g,'').toLowerCase();
    window.history.replaceState({}, document.title, '/' + numero);
    document.getElementById("qrCambiante").src = 'https://quickchart.io/qr?text=jucardus.github.io/' + numero + '&size=100x100&margin=1&ecLevel=M&dark=222&light=fff&format=png';
  } else {
    window.history.replaceState({}, document.title, '/' + lema.toLowerCase());
    document.getElementById("qrCambiante").src = 'https://quickchart.io/qr?text=jucardus.github.io/' + lema + '&size=100x100&margin=1&ecLevel=M&dark=222&light=fff&format=png';
  }
  window.scrollTo(0, 0);
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function copiarEnlace (fechaSimpleRecibida) {
  var urlFecha = 'jucardus.github.io/' + fechaSimpleRecibida;
  navigator.clipboard.writeText(urlFecha);
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function mostrarUnico (lema) {
  texto = texto.replace(/,TEM,TIT,CON,ENL,IMG,FEC\n/g,'').replace(/, /g,'ŧ ').replace(/\"/g,'').replace(/\n/g,'¶¶¶¶¶');
  var resultadoBusca = [];
  var arrayContenido = texto.split('¶¶¶¶¶');
  for (var i = 0; i < arrayContenido.length; i++) {
    if (arrayContenido[i].toUpperCase().indexOf(lema) >= 0 && lema.length >= 2) {
      var linea = arrayContenido[i].split(',');
        var nmr = linea[0];
          var fechaSimple = 'jucardus.github.io/' + linea[6]?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
          var hashtag = formateoHashtag (linea[1]);
          if (linea[4] == '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,108) + '... ← ' + fechaSimple + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
          }
          if (linea[4] != '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
          }
        var tm = linea[1];
          var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
        var ttl = linea[2];
          if (linea[2] == '') {
            ttl = linea[3]?.slice(0,39) + '...';
            var tituloOriginal = ttl?.toUpperCase() + ' | JUCARDUS';
          }
          var ttl = '<h3 class="titulos">' + ttl + '</h3>';
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
    var enviar = enviar.replace(/\.\.\.\./g,'...');
    var enviar = enviar.replace(/ \.\.\./g,'...');
  document.getElementById('mostrar').innerHTML = enviar;
  document.getElementById('buscador').style.display = 'none';
  var fondoNoClicados = '4px solid White';
  const temasTodos = document.getElementsByClassName('temas');
  for (let i = 0; i < temasTodos.length; i++) {
    temasTodos[i].style.borderBottom = fondoNoClicados;
  }
  var lema = lema.slice(2).replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').replace(/%20/g,'').toLowerCase();
  window.history.replaceState({}, document.title, '/' + lema);
  document.getElementById("qrCambiante").src = 'https://quickchart.io/qr?text=jucardus.github.io/' + lema + '&size=100x100&margin=1&ecLevel=M&dark=222&light=fff&format=png';
  window.scrollTo(0, 0);
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function az () {
  var contador = 0;
  var recibido = texto;
  var recibido = recibido.replace(/,TEM,TIT,CON,ENL,IMG,FEC\n/g,'').replace(/, /g,'ŧ ').replace(/\"/g,'');
  var recibido = recibido.replace(/\n/g,'¶¶¶¶¶');
  var resultado = [];
  var arrayContenido = recibido.split('¶¶¶¶¶');
  for (var i = 0; i < arrayContenido.length; i++) {
    var linea = arrayContenido[i].split(',');
      var nmr = linea[0];
        var fechaSimple = 'jucardus.github.io/' + linea[6]?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
        var hashtag = formateoHashtag (linea[1]);
          if (linea[4] == '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,108) + '... ← ' + fechaSimple + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
          }
          if (linea[4] != '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
          }
      var tm = linea[1];
        var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
      var ttl = linea[2];
        if (linea[2] == '') {ttl = linea[3]?.slice(0,39) + '...';}
        var orden = ttl?.toUpperCase().replace(/ /g,'').replace(/,/g,'').replace(/;/g,'').replace(/-/g,'').replace(/\?/g,'').replace(/\¿/g,'').replace(/\¡/g,'').replace(/\!/g,'').replace(/\//g,'').replace(/ŧ/g,'').replace(/«/g,'').replace(/»/g,'').replace('...','');
        var ttl = '<h3 class="titulos" onclick="mostrarUnico(\'' + linea[6] + '\')">' + ttl + '</h3>';
      var fch = linea[6];
        var fechaSimple = fch?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
        var fch = '<span onclick="copiarEnlace(\'' + fechaSimple + '\')" class="fecha">' + fch?.slice(2) + '</span>';
      var nuevaLinea = '<div id="entradaAzarAZ"><!--' + orden + '-->' + ttl + '<div id="clasificacion">' + nmr + ' · ' + tm + ' · ' + fch + '</div></div>';
      if (nuevaLinea.indexOf("'undefined'") == -1) {
        resultado.push(nuevaLinea);
        contador = contador + 1;
      }
  }
  resultado = resultado.sort((a, b) => a.localeCompare(b));
  var enviar = resultado.join('');
  var enviar = enviar.replace(/ŧ /g,', ');
  var enviar = enviar.replace(/ŧ/g,', ');
  var enviar = enviar.replace(/\.\.\.\./g,'...');
  var enviar = enviar.replace(/ \.\.\./g,'...');
  document.getElementById('mostrar').innerHTML = '<div id="azarAZ"><span style="color: OrangeRed;">' + contador + ' entradas en total.</span><p>' + enviar + '</div>';
  document.getElementById('buscador').style.display = 'none';
  subrayar('az');
  window.history.replaceState({}, document.title, '/' + 'az');
  document.getElementById("qrCambiante").src = 'https://quickchart.io/qr?text=jucardus.github.io/az&size=100x100&margin=1&ecLevel=M&dark=222&light=fff&format=png';
  window.scrollTo(0, 0);
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function azar () {
  var recibido = texto;
  var recibido = recibido.replace(/,TEM,TIT,CON,ENL,IMG,FEC\n/g,'').replace(/, /g,'ŧ ').replace(/\"/g,'');
  var recibido = recibido.replace(/\n/g,'¶¶¶¶¶');
  var resultado = [];
  var arrayContenido = recibido.split('¶¶¶¶¶');
  for (var i = 0; i < arrayContenido.length; i++) {
    var linea = arrayContenido[i].split(',');
      var nmr = linea[0];
        var fechaSimple = 'jucardus.github.io/' + linea[6]?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
        var hashtag = formateoHashtag (linea[1]);
          if (linea[4] == '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3]?.slice(0,108) + '... ← ' + fechaSimple + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
          }
          if (linea[4] != '') {
            var nmr = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + linea[0] + '. ' + linea[1] + ' — ' + linea[3] + ' → ' + linea[4] + '%0A%0A%23' + hashtag + '_jucardus">' + nmr + '</a>';
          }
      var tm = linea[1];
        var tm = '<span class="etiquetas" onclick="segunTema(\'' + tm?.replace(/ .*/g,'').toLowerCase() + '\')">' + tm + '</span>';
      var ttl = linea[2];
        if (linea[2] == '') {ttl = linea[3]?.slice(0,39) + '...';}
        var ttl = '<h3 class="titulos" onclick="mostrarUnico(\'' + linea[6] + '\')">' + ttl + '</h3>';
      var fch = linea[6];
        var fechaSimple = fch?.slice(2).replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
        var fch = '<span onclick="copiarEnlace(\'' + fechaSimple + '\')" class="fecha">' + fch?.slice(2) + '</span>';
      var nuevaLinea = '<div id="entradaAzarAZ">' + ttl + '<div id="clasificacion">' + nmr + ' · ' + tm + ' · ' + fch + '</div></div>';
      if (nuevaLinea.indexOf("'undefined'") == -1) {
        resultado.push(nuevaLinea);
      }
  }
  var enviar = desordenar(resultado).slice(9,12).join('');
  var enviar = enviar.replace(/ŧ /g,', ');
  var enviar = enviar.replace(/ŧ/g,', ');
  var enviar = enviar.replace(/\.\.\.\./g,'...');
  var enviar = enviar.replace(/ \.\.\./g,'...');
  document.getElementById('mostrar').innerHTML = '<div id="azarAZ">' + enviar + '</div>';
  document.getElementById('buscador').style.display = 'none';
  subrayar('azar');
  window.history.replaceState({}, document.title, '/' + 'azar');
  document.getElementById("qrCambiante").src = 'https://quickchart.io/qr?text=jucardus.github.io/azar&size=100x100&margin=1&ecLevel=M&dark=222&light=fff&format=png';
  window.scrollTo(0, 0);
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function desordenar(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function limpiarSubrayados () {
  var lineaBlanca = '4px solid White';
  const temasTodos = document.getElementsByClassName('temas');
    for (let i = 0; i < temasTodos.length; i++) {
      temasTodos[i].style.borderBottom = lineaBlanca;
    }
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function formateoHashtag (recibido) {
  var enviar = recibido?.toLowerCase()
    .replace(/ .*/g,'')
    .replace(/-.*/g,'')
    .replace(/á/g,'a')
    .replace(/é/g,'e')
    .replace(/í/g,'i')
    .replace(/ó/g,'o')
    .replace(/ú/g,'u')
    .replace(/ü/g,'u')
    .replace(/ñ/g,'n');
  var inicial = enviar?.slice(0,1);
  var enviar = enviar?.slice(1)
    .replace(/a/g,'')
    .replace(/e/g,'')
    .replace(/i/g,'')
    .replace(/o/g,'')
    .replace(/u/g,'')
    .replace(/u/g,'')
    .replace(/n/g,'');
  var enviar = inicial + enviar;
  return enviar;
}
