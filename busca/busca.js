let base = [
  'https://github.com/jucardus/jucardus.github.io/blob/main/indices/alfabetico.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/traducciones/traducciones.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/traducciones/charlie/charlie.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/traducciones/charlie/prefacio/prefacio.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/actividad/actividad.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/diccionarios/diccionarios.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/diccionarios/ingles-espanol/ingles-espanol.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/diccionarios/ingles-espanol/i/i.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/diccionarios/vocabulario/vocabulario.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/enlaces/enlaces.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/escritos/apotegmas/apotegmas.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/escritos/escritos.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/escritos/citas/citas.md',
  'https://github.com/jucardus/jucardus.github.io/blob/main/programacion/programacion.md'
  ];

function teclaBuscar (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscar('');
  }
}

function buscar() {
  let lema = document.getElementById("buscar").value;
  if (lema == 'mostrar todo') {lema = '#';}
  var array = base;
  for (let i = 0; i < array.length; i++) {
    recorrer(array[i].replace('https://github.com/jucardus/jucardus.github.io/blob/main/','/'),lema);
  }
}

function recorrer (documento,lema) {
  fetch(documento)
    .then(response => response.text())
    .then(contenidoDoc => {
      if(buscar(contenidoDoc, lema)) {
        modificar(documento, contenidoDoc);
      }    
    });
}

function buscar(contenidoDoc,lema) {
  if (contenidoDoc.indexOf(lema) >= 0) return true;
  return false;
}

function modificar (documento, contenidoDoc) {
  var titulo = contenidoDoc.replace(/## /g,'').replace(/\n.*/g,'');
  let enlace = '<b>' + titulo + '</b> → <a href="' + documento + '" target="_blank">' + documento + "</a><p>";
  document.getElementById('mostrar').innerHTML +=  enlace;
}
