// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

let texto = '';

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function inicio () {
  fetch('base.csv')
  .then(response => response.text())
  .then(textString => {
    formateo(textString);
  });
}

function formateo (recibido) {
  var recibido = recibido.replace(/,TEMA,TÍTULO,CONTENIDO,ENLACE,IMAGEN,FECHA\n/g,'').replace(/, /g,'ŧ ').replace(/\"/g,'');
  var recibido = recibido.replace(/\n/g,'¶¶¶¶¶');
  texto = recibido;
  var contador = 0;
  var resultado = [];
  var arrayContenido = recibido.split('¶¶¶¶¶');
  for (var i = 0; i < arrayContenido.length; i++) {
    var linea = arrayContenido[i].split(',');
      var nmr = linea[0];
        var numero = numeros (nmr);
      var tm = linea[1];
        var tema = temas (tm);
      var ttl = linea[2];
        if (ttl == '') {var ttl = linea[3]?.slice(0,40);}
        var titulo = titulos (ttl);
      var enlc = linea[4];
        var enlace = enlaces (enlc);
      var cntnd = linea[3];
        var contenido = contenidos (cntnd);
      var imgn = linea[5];
        var imagen = imagenes (imgn);
      var fch = linea[6];
        var fecha = fechas (fch);
      var nuevaLinea = numero + ' --- ' + tema + ' --- ' + titulo + ' --- ' + enlace + ' --- ' + contenido + ' --- ' + imagen + ' --- ' + fecha;
      if (tm != 'undefined') {
        resultado.push(nuevaLinea);
      }
  }
  var enviar = resultado.join('<p>');
    var enviar = enviar.replace(/ŧ /g,', ');
    var enviar = enviar.replace(/ŧ/g,', ');
    var enviar = enviar.replace(/\.\.\.\./g,'...');
    var enviar = enviar.replace(/ \.\.\./g,'...');
  document.getElementById('mostrar').innerHTML = enviar;
  document.getElementById('buscador').style.display = 'none';
  window.scrollTo(0, 0);
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function numeros (nmr) {
  var devolver = '[' + nmr + ']';
  return devolver;
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function temas (tm) {
  var devolver = '<span id = "etiquetas" onclick = "">' + tm + '</span>';
  return devolver;
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function titulos (ttl) {
  var devolver = '<h2 class = "tituloEntradas">' + ttl + '</h2>';
  return devolver;
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function enlaces (enlc) {
  var dominio = enlc.slice(enlc.indexOf('://') + 3).replace(/\/.*/g,'');
  var devolver = '<a class = "enlaces" href="' + enlc + '" target = "_blank">' + dominio + '</span>';
  return devolver;
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function contenidos (cntnd) {
  var texto = cntnd.replace(/¦/g,'<br/>').replace(/¶/g,'<p>');
  var devolver = '<span class = "contenido">' + texto + '</span>';
  return devolver;
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function imagenes (imgn) {
  var devolver = '' + imgn + '';
  return devolver;
}

// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
