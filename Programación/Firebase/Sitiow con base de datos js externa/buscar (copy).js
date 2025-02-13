function buscar (parametro) {
    var array = baseA;
    if (parametro == null) {
        var recibidoOriginal = document.getElementById('buscar').value;
        var recibido = recibidoOriginal;
    } else {
        window.history.replaceState({}, document.title, "/" + parametro);
        var recibidoOriginal = parametro;
        var recibido = parametro;
            var recibido = recibido.replace(/\+/g,'%20');
            var recibido = recibido.replace(/%20/g,' ');
            var recibido = recibido.replace(/%C3%A1/g,'Á');
            var recibido = recibido.replace(/%C3%A9/g,'É');
            var recibido = recibido.replace(/%C3%AD/g,'Í');
            var recibido = recibido.replace(/%C3%B3/g,'Ó');
            var recibido = recibido.replace(/%C3%BA/g,'Ú');
            var recibido = recibido.replace(/%C3%BC/g,'Ü');
            var recibido = recibido.replace(/%C3%B1/g,'Ñ');
            var recibido = recibido.replace(/%C3%A1/g,'á');
            var recibido = recibido.replace(/%C3%A9/g,'é');
            var recibido = recibido.replace(/%C3%AD/g,'í');
            var recibido = recibido.replace(/%C3%B3/g,'ó');
            var recibido = recibido.replace(/%C3%BA/g,'ú');
            var recibido = recibido.replace(/%C3%BC/g,'ü');
            var recibido = recibido.replace(/%C3%B1/g,'ñ');
            //var recibido = recibido.replace(/b1/g,'▓');
            //var recibido = recibido.replace(/b2/g,'▒');
    }
    if (recibido.length >= 1 && recibido != ' ') {
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
        var resultado = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i].toString().indexOf(recibido) >= 0 || array[i].split('▒').slice(0,1).toString().toUpperCase().indexOf(recibido.toUpperCase()) >= 0 || array[i].split('▒').slice(1,2).toString().toUpperCase().indexOf(recibido.toUpperCase()) >= 0 || array[i].split('▒').slice(2,3).toString().toUpperCase().indexOf(recibido.toUpperCase()) >= 0) {
                var linea = array[i].toString().replace('▓ ','').replace(' ▓','').split(' ▒ ');
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
                    if (dominio == 'sitiow.web.app') {
                        var favicon = 'https://sitiow.web.app/favicon.png';
                    }
                var etiqueta = linea[3].toString();
                    var etiquetaT = tema + '%20%E2%94%8B%20' + subtema + '%20%E2%94%8B%20%23%20%23' + '%20%E2%94%8B%20%E2%86%92%20sitiow.web.app/' + etiqueta;
                    var enlaceT = 'https://x.com/intent/post?text=' + etiquetaT;
                    var etiqueta = '<a class="tuit" href="' + enlaceT + '" target="_blank">' + etiqueta + '</a>';
                var orden = tema + subtema;
                var orden = orden.toString().toUpperCase().replace(/ /g,'').replace(/,/g,'').replace(/-/g,'').replace(/ \[.*/g,'').replace(/Á/g,'A').replace(/É/g,'E').replace(/Í/g,'I').replace(/Ó/g,'O').replace(/Ú/g,'U').replace(/Ü/g,'U').replace(/Ñ/g,'N'); //.replace(/[^a-z0-9]/gi,'');
                var enlace = '<a href="' + url + '" target="_blank">' + url + '</a>';
                var nuevaLinea = '<!--' + orden.toUpperCase() + '--><img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta;

                if (subtema1.indexOf(' · ') >= 0 && subtema1.indexOf('U2FsdGVkX') == -1) {
                    var nuevaLinea = '<!--' + orden.toUpperCase() + '--><img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + desarrollo;
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
                    var nuevaLinea = '<!--' + orden.toUpperCase() + '--><img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ver todo → ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + iframe;
                }

                if (url.indexOf('https://sitiow.web.app') >= 0 && url.indexOf('.png') >= 0) {
                    var enlace = '<a href="' + url + '" target="_blank">' + url + '</a>'; var favicon = 'https://sitiow.web.app/favicon.png';
                    var iframe = '<div id="imagenes"><img class="insertadas" src="' + url + '"></img></div>';
                    var nuevaLinea = '<!--' + orden.toUpperCase() + '--><img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + iframe;
                }

                if (url.indexOf('https://sitiow.web.app') >= 0 && url.indexOf('.jpg') >= 0) {
                    var enlace = '<a href="' + url + '" target="_blank">' + url + '</a>'; var favicon = 'https://sitiow.web.app/favicon.png';
                    var iframe = '<div id="imagenes"><img class="insertadas" src="' + url + '"></img></div>';
                    var nuevaLinea = '<!--' + orden.toUpperCase() + '--><img id="favicones" src="' + favicon + '" /><b>' + tema + '</b> <span class="barrita">┋</span> ' + subtema + ' <span class="barrita">┋</span> ' + enlace + ' <span class="barrita">┋</span> ' + etiqueta + iframe;
                }

                if (nuevaLinea.indexOf('aaaaa') == -1 && nuevaLinea.indexOf('bbbbb') == -1) {
                    resultado.push(nuevaLinea);
                }

            }
        }
        resultado = resultado.sort((a, b) => a.localeCompare(b));
        resultado = [...new Set(resultado)];
        resultado = resultado.filter(Boolean);
            var resultado = resultado.join('<p>');
            var resultado = resultado.replace(/ -- /g,' &mdash; ');
            var resultado = resultado.replace(/ \* /g,' ');
            if (resultado.indexOf('http') == -1) {
                var resultado = '<div style="color: Orange; font-weight: bold; text-align: center;">[ NINGUNA COINCIDENCIA ]</div>';
            }
            var enviar = buscadores + '<p>' + resultado;
        document.getElementById('buscar').value = "";
        document.getElementById('buscar').focus();
        document.getElementById('mostrar').innerHTML = enviar;
    }
}
