function azar() {
    var array = baseA;
    var resultado = [];
    var treinta = [];
    var treinta = desordenar(array).slice(10,30);
    for (var i = 0; i < treinta.length; i++) {
        var linea = treinta[i].toString().replace('▓ ','').replace(' ▓','').split(' ▒ ');
        var tema = linea[0].toString();
        var subtema1 = linea[1].toString();
            var subtema = subtema1.replace(/ · .*/g,'').replace(/\* /g,'');
            var desarrollo = '<div id="desarrollos">' + subtema1.replace(/.* · /g,'') + '</div>';
        var url = linea[2].toString();
            var dominio = url.slice(url.indexOf('://') + 3);
            var dominio = dominio.replace(/\/.*/g,'');
            if (dominio == 'youtu.be') {var dominio = 'www.youtube.com';}
            if (dominio == 'goo.gl') {var dominio = 'maps.google.com';}
            var favicon = 'https://www.google.com/s2/favicons?domain=' + dominio + '&sz=128';
            if (dominio == 'sitiow.web.app') {var favicon = 'https://sitiow.web.app/favicon.png';}
        var etiqueta = linea[3].toString();
            var etiquetaT = tema + '%20%E2%94%8B%20' + subtema + '%20%E2%94%8B%20%23%20%23' + '%20%E2%94%8B%20%E2%86%92%20sitiow.web.app/' + etiqueta;
            var enlaceT = 'https://x.com/intent/post?text=' + etiquetaT;
            var etiqueta = '<a class="tuit" href="' + enlaceT + '" target="_blank">' + etiqueta + '</a>';
        var enlace = '<a href="' + url + '" target="_blank">' + url + '</a>';
        var nuevaLinea = '<img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta;

        if (subtema1.indexOf(' · ') >= 0 && subtema1.indexOf('U2FsdGVkX') == -1) {
            var nuevaLinea = '<img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + desarrollo;
        }

        if (subtema1.indexOf('U2FsdGVkX') >= 0) {
            var textoC = desarrollo.replace('<div id="desarrollos">','').replace('</div>','').toString().trim();
            var textoD = CryptoJS.AES.decrypt(textoC, 'Sca4P5tPj2xM7iN8aGiz9Ex3Lm').toString(CryptoJS.enc.Utf8);
            //var textoD = CryptoJS.AES.decrypt(textoC, clave).toString(CryptoJS.enc.Utf8);
            var nuevaLinea = '<!--' + orden.toUpperCase() + '--><img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + '<div id="desarrollos">' + textoD + '</div>';
        }

        if (url.indexOf('https://sitiow.web.app') >= 0 && url.indexOf('.txt') >= 0) {
            var enlace = '<a href="' + url + '" target="_blank">' + url + '</a>'; var favicon = 'https://sitiow.web.app/favicon.png';
            var iframe = '<div id="iframes"><iframe src="' + url + '" id="insertado" scrolling="no" frameborder="0"></iframe></div>';
            var nuevaLinea = '<img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ver todo → ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + iframe;
        }

        if (url.indexOf('https://sitiow.web.app') >= 0 && url.indexOf('.png') >= 0) {
            var enlace = '<a href="' + url + '" target="_blank">' + url + '</a>'; var favicon = 'https://sitiow.web.app/favicon.png';
            var iframe = '<div id="imagenes"><img class="insertadas" src="' + url + '"></img></div>';
            var nuevaLinea = '<img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + iframe;
        }

        if (url.indexOf('https://sitiow.web.app') >= 0 && url.indexOf('.jpg') >= 0) {
            var enlace = '<a href="' + url + '" target="_blank">' + url + '</a>'; var favicon = 'https://sitiow.web.app/favicon.png';
            var iframe = '<div id="imagenes"><img class="insertadas" src="' + url + '"></img></div>';
            var nuevaLinea = '<img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + iframe;
        }

        if (nuevaLinea.indexOf('aaaaa') == -1 && nuevaLinea.indexOf('bbbbb') == -1) {
            resultado.push(nuevaLinea);
        }

    }
    resultado = [...new Set(resultado)];
    resultado = resultado.filter(Boolean);
        var resultado = resultado.join('<p>');
        var resultado = resultado.replace(/ -- /g,' &mdash; ');
        var resultado = resultado.replace(/ \* /g,' ');
        var resultado = resultado.replace(/{/g,'<span class="citas">{');
        var resultado = resultado.replace(/}/g,'}</span>');
    document.getElementById('buscar').value = "";
    document.getElementById('buscar').focus();
    document.getElementById('mostrar').innerHTML = resultado;
    var param = window.location.href;
        if (param.indexOf('?=') >= 0) {
            var parametro = window.location.href.replace(/.*?=/g,'');
            buscar(parametro);
        }
}

function desordenar(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
