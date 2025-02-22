function teclaBuscar (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('mostrar').innerHTML = '';
    buscar('');
  }
}

function buscar() {
  var lema = document.getElementById("buscar").value;
  if (lema == 'mostrar todo') {lema = '#';}
  var array = base;
  for (let i = 0; i < array.length; i++) {
    var documento = array[i].replace('https://github.com/jucardus/jucardus.github.io/blob/main','..');
    recorrer(documento,lema);
  }
}

function recorrer (documento,lema) {
  fetch(documento)
    .then(response => response.text())
    .then(contenidoDoc => {
      if(buscar2 (contenidoDoc, lema)) {
        modificar(documento, contenidoDoc);
      }    
    });
}

function buscar2 (contenidoDoc,lema) {
  if (contenidoDoc.indexOf(lema) >= 0) return true;
  return false;
}

function modificar (documento, contenidoDoc) {
  var contador = 0;
  var titulo = contenidoDoc.replace(/## /g,'').replace(/\n.*/g,'');
  let enlace = '<b>' + titulo + '</b> → <a href="' + documento.replace('.md','.html') + '">' + documento.replace('.md','') + "</a><p>";
  contador = contador + 1;
  if (enlace == '') {enlace = '<span style="color: OrangeRed;">[ ninguna coincidencia ]</span>';}
  document.getElementById('buscar').value = '';
  document.getElementById('mostrar').innerHTML += enlace;
  window.scrollTo(0, 0);
  document.getElementById('buscar').focus();
}
