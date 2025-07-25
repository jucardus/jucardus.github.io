let baseArray = base;

// Function to get URL parameter and call buscarFecha
document.addEventListener('DOMContentLoaded', () => {
  // Get the URL parameters
  const params = new URLSearchParams(window.location.search);
  // Get the value of the 'e' parameter
  const recibido = params.get('e');

  // Check if the parameter exists and call the function
  if (recibido) {
    var originalString = recibido;
    var characterToInsert = "-";
    var insertionPosition = 2;
    var newString = originalString.slice(0, insertionPosition) + characterToInsert + originalString.slice(insertionPosition);
    var insertionPosition = 5;
    var newString = newString.slice(0, insertionPosition) + characterToInsert + newString.slice(insertionPosition);
    var characterToInsert = " ";
    var insertionPosition = 8;
    var newString = newString.slice(0, insertionPosition) + characterToInsert + newString.slice(insertionPosition);
    var characterToInsert = ":";
    var insertionPosition = 11;
    var newString = newString.slice(0, insertionPosition) + characterToInsert + newString.slice(insertionPosition);
    var fecha = '20' + newString;
    buscarFecha(fecha.trim());
  } else {
    recientes();
  }
});

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function recientes () {
  //baseArray = base;
  document.getElementById('buscador').style.display = 'none';
  var resultado = [];
  var contador = 0;
  let array = baseArray.slice();
  for (var i = 0; i < array.length; i++) {
    var linea = array[i].split('▒');
      var orden = linea[0];
      var titulo = linea[1];
      var etiquetas = linea[3];
        var etiquetas = etiquetas.replace(/, /g, ',');
        var arrayEtiquetas = etiquetas.split(',');
          var etiquetasUnidas = [];
          var etiquetasAlmo = [];
            for (var j = 0; j < arrayEtiquetas.length; j++) {
              var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span>';
                etiquetasUnidas.push(nuevaEtiqueta);
              var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                etiquetasAlmo.push(nuevaAlmo);
            }
          var etiquetasTodas = etiquetasUnidas.join(', ');
          var almohadillas = etiquetasAlmo.join(' ');
      var numero = linea[2];
        var enlaceTuit = 'jucardus.github.io/?e=' + linea[4].replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
        var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
        var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '</a>';
      var fecha = linea[4];
        var fechaCopiar = '<span class="fechasCopiar" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
      var contenido = convertirUrls(linea[5]);
    var nuevaLinea = '<div id="entradas"><h3 class="titulos"><span class="subtituloBuscar" onclick="buscarFecha(\'' + fecha + '\')">' + titulo + '</span></h3><div id="submenu">' + numero + ' · <span class="etiquetas">' + etiquetasTodas + '</span> · ' + fechaCopiar + '</div></div>';
    resultado.push(nuevaLinea);
    contador = contador + 1;
    if (contador == 12) {break;}
  }
  var enviar = resultado.join('');
  document.getElementById("mostrar").innerHTML = enviar;
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function teclaBuscar (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar('');
  }
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function buscar (recibido) {
  document.getElementById('buscador').style.display = 'none';
  var buscar = document.getElementById('textInput').value;
  var recibidoOriginal = buscar;
  document.getElementById("mostrar").innerHTML = buscar;
  if (recibido != '') {buscar = recibido;}
  var resultado = [];
  let array = baseArray;
  for (var i = 0; i < array.length; i++) {
    if (array[i].toUpperCase().indexOf(buscar.toUpperCase()) >= 0) {
      var linea = array[i].split('▒');
      var orden = linea[0];
      var titulo = linea[1];
      var etiquetas = linea[3];
        var etiquetas = etiquetas.replace(/, /g, ',');
        var arrayEtiquetas = etiquetas.split(',');
          var etiquetasUnidas = [];
          var etiquetasAlmo = [];
            for (var j = 0; j < arrayEtiquetas.length; j++) {
              var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span>';
                etiquetasUnidas.push(nuevaEtiqueta);
              var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                etiquetasAlmo.push(nuevaAlmo);
            }
          var etiquetasTodas = etiquetasUnidas.join(', ');
          var almohadillas = etiquetasAlmo.join(' ');
      var numero = linea[2];
        var enlaceTuit = 'jucardus.github.io/?e=' + linea[4].replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
        var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
        var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '</a>';
      var fecha = linea[4];
        var fechaCopiar = '<span class="fechasCopiar" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
      var contenido = convertirUrls(linea[5]);
    var nuevaLinea = '<div id="entradas"><h3 class="titulos"><span class="subtituloBuscar" onclick="buscarFecha(\'' + fecha + '\')">' + titulo + '</span></h3><div id="submenu">' + numero + ' · <span class="etiquetas">' + etiquetasTodas + '</span> · ' + fechaCopiar + '</div></div>';
      resultado.push(nuevaLinea);
    }
  }
  resultado = resultado.sort((a, b) => a.localeCompare(b));
  var enviar = resultado.join('');
  if (enviar.indexOf('<') == -1) {enviar = '<div id="previos">[ ninguna coincidencia ]</div>'}
  document.getElementById("mostrar").innerHTML = enviar + '<p/><p/>';
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
  if (recibidoOriginal == 'listar temas') {temasTodos ();}
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function buscarFecha (recibido) {
  document.getElementById('buscador').style.display = 'none';
  var buscar = recibido;
  var resultado = [];
  let array = baseArray;
  for (var i = 0; i < array.length; i++) {
    var fields = array[i].split('▒');
    var fecha = fields[4];
    if (fecha === buscar) {
      var linea = array[i].split('▒');
        var orden = linea[0];
        var titulo = linea[1];
        var etiquetas = linea[3];
          var etiquetas = etiquetas.replace(/, /g, ',');
          var arrayEtiquetas = etiquetas.split(',');
            var etiquetasUnidas = [];
            var etiquetasAlmo = [];
            for (var j = 0; j < arrayEtiquetas.length; j++) {
              var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span>';
                etiquetasUnidas.push(nuevaEtiqueta);
              var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                etiquetasAlmo.push(nuevaAlmo);
            }
            var etiquetasTodas = etiquetasUnidas.join(', ');
            var almohadillas = etiquetasAlmo.join(' ');
        var numero = linea[2];
          var enlaceTuit = 'jucardus.github.io/?e=' + recibido.replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
          var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
          var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '</a>';
        var fecha = linea[4];
          var fecha = '<span class="fechasCopiar" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
        var contenido = convertirUrls(linea[5]);
        var imagen = linea[6];
          if (imagen != '') {imagen = '<div id="imagenes"><img class="imagenes" src="' + imagen + '" /></div>';} else {imagen = '';}
      var nuevaLinea = '<div id="entradasBusca"><!--' + orden + '--><div id="encabezado"><h2 class="titulos">' + titulo + '</h2><div id="submenu">' + numero + ' · <span class="etiquetas">' + etiquetasTodas + '</span> · ' + fecha + '</div></div><div id="contenidos">' + contenido + '</div>' + imagen + '</div>';
      resultado.push(nuevaLinea);
    }
  }
  resultado = resultado.sort((a, b) => a.localeCompare(b));
  var enviar = resultado.join('');
  document.getElementById("mostrar").innerHTML = enviar + '<p/><p/>';
  document.getElementById('textInput').value = '';
  limpiarHash ();
  const url = new URL(window.location);
  var param = recibido.replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
  url.searchParams.set('e', param);
  history.replaceState(null, '', url.toString());
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function indice () {
  document.getElementById('buscador').style.display = 'none';
  var buscar = '-';
  document.getElementById("mostrar").innerHTML = buscar;
  var resultado = [];
  let array = baseArray;
  for (var i = 0; i < array.length; i++) {
    if (array[i].toUpperCase().indexOf(buscar.toUpperCase()) >= 0) {
      var linea = array[i].split('▒');
      var orden = linea[0];
      var titulo = linea[1];
      var etiquetas = linea[3];
        var etiquetas = etiquetas.replace(/, /g, ',');
        var arrayEtiquetas = etiquetas.split(',');
          var etiquetasUnidas = [];
          var etiquetasAlmo = [];
            for (var j = 0; j < arrayEtiquetas.length; j++) {
              var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span>';
                etiquetasUnidas.push(nuevaEtiqueta);
              var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                etiquetasAlmo.push(nuevaAlmo);
            }
          var etiquetasTodas = etiquetasUnidas.join(', ');
          var almohadillas = etiquetasAlmo.join(' ');
      var numero = linea[2];
        var enlaceTuit = 'jucardus.github.io/?e=' + linea[4].replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
        var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
        var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '</a>';
      var fecha = linea[4];
        var fechaCopiar = '<span class="fechasCopiar" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
      var contenido = convertirUrls(linea[5]);
    var nuevaLinea = '<div id="entradas"><!--' + orden + '--><h3 class="titulos"><span class="subtituloBuscar" onclick="buscarFecha(\'' + fecha + '\')">' + titulo + '</span></h3><div id="submenu">' + numero + ' · <span class="etiquetas">' + etiquetasTodas + '</span> · ' + fechaCopiar + '</div></div>';
      resultado.push(nuevaLinea);
    }
  }
  resultado = resultado.sort((a, b) => a.localeCompare(b));
  var enviar = resultado.join('');
  document.getElementById("mostrar").innerHTML = enviar;
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function mostrarBuscador () {
  window.scrollTo(0, 0);
  document.getElementById('buscador').style.display = 'block';
  document.getElementById('textInput').focus();
  document.getElementById("mostrar").innerHTML = '';
  limpiarHash ();
  limpiarQuery();
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function limpiarHash () {
  const url = window.location.href.split('#')[0];
  history.pushState({}, document.title, url);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function temasAnterior () { // EN DESUSO
  document.getElementById('buscador').style.display = 'none';
  var buscar = '-';
  document.getElementById("mostrar").innerHTML = buscar;
  var resultado = [];
  let array = baseArray;
  for (var i = 0; i < array.length; i++) {
    if (array[i].toUpperCase().indexOf(buscar.toUpperCase()) >= 0) {
      var linea = array[i].split('▒');
        var orden = linea[3];
        var etiquetas = linea[3];
          var etiquetas = etiquetas.replace(/, /g, ',');
            var arrayEtiquetas = etiquetas.split(',');
            var etiquetasUnidas = [];
            for (var j = 0; j < arrayEtiquetas.length; j++) {
              var nuevaEtiqueta = '<li><span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span></li>';
              resultado.push(nuevaEtiqueta);
            }
    }
  }
  resultado = resultado.sort((a, b) => a.localeCompare(b));
  resultado = [...new Set(resultado)]; // eliminar elementos repetidos
  var enviar = resultado.join('');
  document.getElementById("mostrar").innerHTML = '<ul>' + enviar + '</ul>';
  document.getElementById('textInput').value = '';
  limpiarHash ();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function temas() {
  document.getElementById('buscador').style.display = 'none';
  var buscar = '-';
  document.getElementById("mostrar").innerHTML = buscar;

  // Create a map to store label counts
  let labelCounts = new Map();
  let array = baseArray;

  // Count occurrences of each label
  for (var i = 0; i < array.length; i++) {
    if (array[i].toUpperCase().indexOf(buscar.toUpperCase()) >= 0) {
      var linea = array[i].split('▒');
      var etiquetas = linea[3];
      var arrayEtiquetas = etiquetas.replace(/, /g, ',').split(',');

      // Count each label
      arrayEtiquetas.forEach(label => {
        labelCounts.set(label, (labelCounts.get(label) || 0) + 1);
      });
    }
  }

  // Create the display array
  var resultado = [];
  for (let [label, count] of labelCounts) {
    var ordenamiento = label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase();
    var nuevaEtiqueta = `<li><!--${ordenamiento}--><span class="etiquetasTemas" onclick="buscarTema('${label}')"><b>${label}</b></span> – <span class="ascdsc" onclick="asc('${label}')">Asc.</span> · <span class="ascdsc" onclick="dsc('${label}')">Dsc.</span> – ${count}</li>`;
    resultado.push(nuevaEtiqueta);
  }

  // Sort and remove duplicates (though Map ensures uniqueness)
  resultado = resultado.sort((a, b) => a.localeCompare(b));

  // Display the results
  var enviar = resultado.join('');
  document.getElementById("mostrar").innerHTML = '<ul>' + enviar + '</ul>';
  document.getElementById('textInput').value = '';
  limpiarHash();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function archivo() {
  document.getElementById('buscador').style.display = 'none';
  var buscar = '-';
  document.getElementById('mostrar').innerHTML = buscar;
  var resultado = [];
  let array = baseArray;
  for (var i = 0; i < array.length; i++) {
    if (array[i].toUpperCase().indexOf(buscar.toUpperCase()) >= 0) {
      var linea = array[i].split('▒');
        var orden = linea[0];
        var titulo = linea[1];
        var etiquetas = linea[3];
          var etiquetas = etiquetas.replace(/, /g, ',');
          var arrayEtiquetas = etiquetas.split(',');
            var etiquetasUnidas = [];
            var etiquetasAlmo = [];
              for (var j = 0; j < arrayEtiquetas.length; j++) {
                var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')">' + arrayEtiquetas[j] + '</span>';
                  etiquetasUnidas.push(nuevaEtiqueta);
                var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                  etiquetasAlmo.push(nuevaAlmo);
              }
            var etiquetasTodas = etiquetasUnidas.join(', ');
            var almohadillas = etiquetasAlmo.join(' ');
        var numero = linea[2];
          var enlaceTuit = 'jucardus.github.io/?e=' + linea[4].replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
          var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
          var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '.</a>';
        var fecha = linea[4];
          var fechaCopiar = '<span class="fechasCopiarArchivo" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
        var contenido = convertirUrls(linea[5]);
      var nuevaLinea = '<div id="entradasArchivo"><b>' + numero + ' <span class="subtituloBuscar" onclick="buscarFecha(\'' + fecha + '\')">' + titulo + '</span></b> – <span class="etiquetasArchivo">' + etiquetasTodas + '</span> – ' + fechaCopiar + '</div>';
      resultado.push('<h2 style="text-align: center; padding-top: 15px;">' + fecha.slice(0, 7) + '</h2></div>');
      resultado.push('<h3 style="padding-top: 12px;">' + fecha.slice(0, 10) + '</h3>');
      resultado.push(nuevaLinea);
    }
  }
  resultado = [...new Set(resultado)];
  resultado = resultado.filter(Boolean);
  var enviar = resultado.join('');
  document.getElementById("mostrar").innerHTML = enviar;
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function buscarTema (recibido) {
  document.getElementById('buscador').style.display = 'none';
  var buscar = document.getElementById('textInput').value;
  document.getElementById("mostrar").innerHTML = buscar;
  if (recibido != '') {buscar = recibido;}
  var resultado = [];
  let array = baseArray;
  for (var i = 0; i < array.length; i++) {
    if (array[i].toUpperCase().indexOf(buscar.toUpperCase()) >= 0) {
      var linea = array[i].split('▒');
      var orden = linea[0];
      var titulo = linea[1];
      var etiquetas = linea[3];
        var etiquetas = etiquetas.replace(/, /g, ',');
        var arrayEtiquetas = etiquetas.split(',');
          var etiquetasUnidas = [];
          var etiquetasAlmo = [];
            for (var j = 0; j < arrayEtiquetas.length; j++) {
              var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span>';
                etiquetasUnidas.push(nuevaEtiqueta);
              var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                etiquetasAlmo.push(nuevaAlmo);
            }
          var etiquetasTodas = etiquetasUnidas.join(', ');
          var almohadillas = etiquetasAlmo.join(' ');
      var numero = linea[2];
        var enlaceTuit = 'jucardus.github.io/?e=' + linea[4].replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
        var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
        var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '</a>';
      var fecha = linea[4];
        var fechaCopiar = '<span class="fechasCopiar" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
      var contenido = convertirUrls(linea[5]);
    var nuevaLinea = '<div id="entradas"><!--' + orden + '--><h3 class="titulos"><span class="subtituloBuscar" onclick="buscarFecha(\'' + fecha + '\')">' + titulo + '</span></h3><div id="submenu">' + numero + ' · <span class="etiquetas">' + etiquetasTodas + '</span> · ' + fechaCopiar + '</div></div>';
      if (etiquetas.indexOf(recibido) >= 0) {
        resultado.push(nuevaLinea);
      }
    }
  }
  resultado = resultado.sort((a, b) => a.localeCompare(b));
  var enviar = resultado.join('');
  if (enviar.indexOf('<') == -1) {enviar = '<div id="previos">[ ninguna coincidencia ]</div>'}
  document.getElementById("mostrar").innerHTML = enviar + '<p/><p/>';
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function azar () {
  var arrayDesordenar = baseArray.slice();
  arrayDesordenar = desordenar(arrayDesordenar).slice(10,13);
  var resultado = [];
  for (var i = 0; i < arrayDesordenar.length; i++) {
    var linea = arrayDesordenar[i].split('▒');
      var orden = linea[0];
      var titulo = linea[1];
      var etiquetas = linea[3];
        var etiquetas = etiquetas.replace(/, /g, ',');
        var arrayEtiquetas = etiquetas.split(',');
          var etiquetasUnidas = [];
          var etiquetasAlmo = [];
            for (var j = 0; j < arrayEtiquetas.length; j++) {
              var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span>';
                etiquetasUnidas.push(nuevaEtiqueta);
              var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                etiquetasAlmo.push(nuevaAlmo);
            }
          var etiquetasTodas = etiquetasUnidas.join(', ');
          var almohadillas = etiquetasAlmo.join(' ');
      var numero = linea[2];
        var enlaceTuit = 'jucardus.github.io/?e=' + linea[4].replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
        var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
        var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '</a>';
      var fecha = linea[4];
        var fechaCopiar = '<span class="fechasCopiar" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
      var contenido = convertirUrls(linea[5]);
    var nuevaLinea = '<div id="entradas"><h3 class="titulos"><span class="subtituloBuscar" onclick="buscarFecha(\'' + fecha + '\')">' + titulo + '</span></h3><div id="submenu">' + numero + ' · <span class="etiquetas">' + etiquetasTodas + '</span> · ' + fechaCopiar + '</div></div>';
    resultado.push(nuevaLinea);
  }
  var enviar = resultado.join('');
  document.getElementById("mostrar").innerHTML = enviar;
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function desordenar(arrayD) {
  let currentIndex = arrayD.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arrayD[currentIndex], arrayD[randomIndex]] = [arrayD[randomIndex], arrayD[currentIndex]];
  }
  return arrayD;
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function convertirUrls(inputText) {
  const urlRegex = /\b(https?:\/\/[^\s<>"'()]+)/gi;
  return inputText.replace(urlRegex, (fullUrl) => {
    try {
      const cleanUrl = fullUrl.replace(/[,?:;.!]+$/, '');
      const domain = new URL(cleanUrl).hostname.replace('www.', '');
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${domain}</a>` +
             fullUrl.slice(cleanUrl.length);
    } catch {
      return fullUrl;
    }
  });
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function autor () {
  const authorDiv = document.getElementById("autor");
  const mostrarDiv = document.getElementById("mostrar");
  mostrarDiv.innerHTML = authorDiv.innerHTML;
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function arriba () {
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function limpiarQuery() {
  const cleanUrl = window.location.origin + window.location.pathname;
  history.pushState({}, document.title, cleanUrl);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function copiarEnlace (fecha) {
  var enlace = 'https://jucardus.github.io/?e=' + fecha.replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
  navigator.clipboard.writeText(enlace);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function asc (recibido) {
  document.getElementById('buscador').style.display = 'none';
  document.getElementById("mostrar").innerHTML = buscar;
  var buscar = recibido;
  var resultado = [];
  let array = baseArray;
  for (var i = 0; i < array.length; i++) {
    if (array[i].toUpperCase().indexOf(buscar.toUpperCase()) >= 0) {
      var linea = array[i].split('▒');
        var orden = linea[0];
        var titulo = linea[1];
        var etiquetasO = linea[3];
        var etiquetas = linea[3];
          var etiquetas = etiquetas.replace(/, /g, ',');
          var arrayEtiquetas = etiquetas.split(',');
            var etiquetasUnidas = [];
            var etiquetasAlmo = [];
              for (var j = 0; j < arrayEtiquetas.length; j++) {
                var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span>';
                  etiquetasUnidas.push(nuevaEtiqueta);
                var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                  etiquetasAlmo.push(nuevaAlmo);
              }
            var etiquetasTodas = etiquetasUnidas.join(', ');
            var almohadillas = etiquetasAlmo.join(' ');
        var numero = linea[2];
          var enlaceTuit = 'jucardus.github.io/?e=' + linea[4].replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
          var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
          var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '</a>';
        var fecha = linea[4];
          var fechaCopiar = '<span class="fechasCopiar" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
        var contenido = convertirUrls(linea[5]);
      var nuevaLinea = '<div id="entradas"><h3 class="titulos"><span class="subtituloBuscar" onclick="buscarFecha(\'' + fecha + '\')">' + titulo + '</span></h3><div id="submenu">' + numero + ' · <span class="etiquetas">' + etiquetasTodas + '</span> · ' + fechaCopiar + '</div></div>';
      if (etiquetasO.indexOf(recibido) >= 0) {
        resultado.push(nuevaLinea);
      }
    }
  }
  resultado = resultado.reverse();
  var enviar = resultado.join('');
  if (enviar.indexOf('<') == -1) {enviar = '<div id="previos">[ ninguna coincidencia ]</div>'}
  document.getElementById("mostrar").innerHTML = enviar + '<p/><p/>';
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function dsc (recibido) {
  document.getElementById('buscador').style.display = 'none';
  document.getElementById("mostrar").innerHTML = buscar;
  var buscar = recibido;
  var resultado = [];
  let array = baseArray;
  for (var i = 0; i < array.length; i++) {
    if (array[i].toUpperCase().indexOf(buscar.toUpperCase()) >= 0) {
      var linea = array[i].split('▒');
        var orden = linea[0];
        var titulo = linea[1];
        var etiquetasO = linea[3];
        var etiquetas = linea[3];
          var etiquetas = etiquetas.replace(/, /g, ',');
          var arrayEtiquetas = etiquetas.split(',');
            var etiquetasUnidas = [];
            var etiquetasAlmo = [];
              for (var j = 0; j < arrayEtiquetas.length; j++) {
                var nuevaEtiqueta = '<span class="menuEnlace" onclick="buscarTema(\'' + arrayEtiquetas[j] + '\')"><b>' + arrayEtiquetas[j] + '</b></span>';
                  etiquetasUnidas.push(nuevaEtiqueta);
                var nuevaAlmo = '%23' + arrayEtiquetas[j].toLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ü/g,'v').replace(/ñ/g,'n').replace(/ /g,'_').replace(/-/g,'_') + '_jucardus';
                  etiquetasAlmo.push(nuevaAlmo);
              }
            var etiquetasTodas = etiquetasUnidas.join(', ');
            var almohadillas = etiquetasAlmo.join(' ');
        var numero = linea[2];
          var enlaceTuit = 'jucardus.github.io/?e=' + linea[4].replace(/-/g,'').replace(/:/g,'').replace(/ /g,'').slice(2);
          var tuit = numero + '. ' + titulo + ' — ' + linea[3] + '%0A%0A→ ' + enlaceTuit + '%0A%0A' + almohadillas;
          var numero = '<a class="numeros" target="_blank" href="https://x.com/intent/tweet?text=' + tuit + '">' + numero + '</a>';
        var fecha = linea[4];
          var fechaCopiar = '<span class="fechasCopiar" onclick="copiarEnlace(\'' + fecha + '\')">' + fecha + '</span>';
        var contenido = convertirUrls(linea[5]);
      var nuevaLinea = '<div id="entradas"><h3 class="titulos"><span class="subtituloBuscar" onclick="buscarFecha(\'' + fecha + '\')">' + titulo + '</span></h3><div id="submenu">' + numero + ' · <span class="etiquetas">' + etiquetasTodas + '</span> · ' + fechaCopiar + '</div></div>';
      if (etiquetasO.indexOf(recibido) >= 0) {
        resultado.push(nuevaLinea);
      }
    }
  }
  var enviar = resultado.join('');
  if (enviar.indexOf('<') == -1) {enviar = '<div id="previos">[ ninguna coincidencia ]</div>'}
  document.getElementById("mostrar").innerHTML = enviar + '<p/><p/>';
  document.getElementById('textInput').value = '';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}

//¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶

function temasTodos () { // listar temas
  document.getElementById('buscador').style.display = 'none';
  var resultadoT = [];
  let array = baseArray;
  for (var k = 0; k < array.length; k++) {
    var linea = array[k].split('▒');
      var etiquetas = linea[3];
        var etiquetas = etiquetas.replace(/, /g, ',');
          var arrayEtiquetas = etiquetas.split(',');
            for (var l = 0; l < arrayEtiquetas.length; l++) {
              resultadoT.push(arrayEtiquetas[l]);
            }
  }
  resultadoT = resultadoT.sort((a, b) => a.localeCompare(b));
  resultadoT = [...new Set(resultadoT)]; // eliminar elementos repetidos
  var enviar = resultadoT.join(', ');
  document.getElementById("mostrar").innerHTML = '<p>' + enviar + '.</p>';
  limpiarHash ();
  limpiarQuery();
  window.scrollTo(0, 0);
}
