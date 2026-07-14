// ============================================================
//  CONFIGURACIÓN - URL DE TU GAS
// ============================================================
var GAS_URL = 'https://script.google.com/macros/s/AKfycbyze7IlrJtuNVOvXcXOnyt_2ek5rHiX8AVrouIen8nTlujCGUZYrq4qPv5ry03qkbzA/exec';

// ============================================================
//  OBTENER QUERY DESDE LA URL
// ============================================================
var QUERY_ID = null;
(function() {
    var params = new URLSearchParams(window.location.search);
    var q = params.get('q');
    if (q && q.match(/^\d{12}$/)) {
        QUERY_ID = q;
    }
    console.log('QUERY_ID desde URL:', QUERY_ID);
})();

// ============================================================
//  DETECTAR MÓVIL
// ============================================================
var isMobile = window.innerWidth <= 768;

function aplicarLayout() {
    isMobile = window.innerWidth <= 768;
    var desktopApp = document.getElementById('app');
    var mobileTabs = document.getElementById('mobileTabs');
    var mobileSections = document.getElementById('mobileSections');

    if (isMobile) {
        desktopApp.style.display = 'none';
        mobileTabs.style.display = 'flex';
        mobileSections.style.display = 'flex';
        document.body.style.display = 'flex';
        document.body.style.flexDirection = 'column';
    } else {
        desktopApp.style.display = 'grid';
        mobileTabs.style.display = 'none';
        mobileSections.style.display = 'none';
        document.body.style.display = 'block';
    }
}

aplicarLayout();
window.addEventListener('resize', aplicarLayout);

// ============================================================
//  TABS MÓVILES
// ============================================================
var tabButtons = document.querySelectorAll('.tab-btn');
var mobileSectionsList = {
    a: document.getElementById('mobile-section-a'),
    b: document.getElementById('mobile-section-b'),
    c: document.getElementById('mobile-section-c')
};

function cambiarPestanaMovil(tab) {
    tabButtons.forEach(function(b) { b.classList.remove('active'); });
    var targetBtn = document.querySelector('.tab-btn[data-tab="' + tab + '"]');
    if (targetBtn) targetBtn.classList.add('active');
    for (var key in mobileSectionsList) {
        if (mobileSectionsList[key]) {
            mobileSectionsList[key].classList.remove('active');
        }
    }
    if (mobileSectionsList[tab]) {
        mobileSectionsList[tab].classList.add('active');
    }
    
    if (tab === 'c') {
        var mobileDivC = document.getElementById('mobile-section-c');
        if (mobileDivC) {
            setTimeout(function() {
                mobileDivC.scrollTop = 0;
            }, 50);
        }
    }
}

tabButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var tab = this.dataset.tab;
        cambiarPestanaMovil(tab);
    });
});

// ============================================================
//  FUNCIÓN DE NAVEGACIÓN PRINCIPAL
// ============================================================
function navegarA(destino) {
    var navItems = document.querySelectorAll('.nav-principal li');
    navItems.forEach(function(li) {
        li.classList.remove('activo');
        if (li.dataset.nav === destino) {
            li.classList.add('activo');
        }
    });

    var navItemsMovil = document.querySelectorAll('.nav-principal-movil li');
    navItemsMovil.forEach(function(li) {
        li.classList.remove('activo');
        if (li.dataset.nav === destino) {
            li.classList.add('activo');
        }
    });

    var divC = document.getElementById('divC');
    if (divC) divC.scrollTop = 0;

    if (destino === 'inicio') {
        if (entradasRecientes.length > 0) {
            var entrada = entradasRecientes[0];
            mostrarEntradaCompleta(entrada, false);
            mostrarEntradaCompleta(entrada, true);
            actualizarURL(entrada.ddd);
            actualizarBanner(entrada.aaa, entrada.ddd);
            renderizarEntradasParciales(entradasRecientes);
            resaltarPrimeraEntradaEnB();
        }
        document.querySelectorAll('#listaEtiquetas li, #mobileListaEtiquetas li').forEach(function(li) {
            li.classList.remove('activo');
        });
        actualizarTituloPagina(null);
    } else if (destino === 'aclaraciones') {
        var textoAclaraciones = '<h2>Aclaraciones</h2><div class="contenido-bbb"><h3>Propósito del sitio</h3><p>En este sitio encontrarás algunos diccionarios en desarrollo —como el de chino, inglés o el multilingüe—, así como ciertas herramientas para el estudio del latín y el chino con frases desglosadas y notas gramaticales sucintas. También estoy reuniendo citas de autores diversos, apotegmas y proverbios seleccionados con esmero. Otro tema de interés son los vocabularios de francés e inglés, en los que se muestran traducciones de términos en contextos principalmente literarios, para profundizar en el conocimiento de esas lenguas. — ¡Gracias por tu visita!</p><h3>Cómo funciona el sitio</h3><ul><li>Al abrir el sitio se muestran las treinta entradas más recientes, en la segunda columna, así como las etiquetas principales en la primera columna y la entrada más reciente hacia la derecha.</li><li>El cuadro de busca en la primera columna y debajo del título principal, encuentra en la base de datos todas las coincidencias del término ingresado, pero hasta un máximo de setenta, con las más recientes a la cabeza.</li><li>Si clicas en cualquiera de las etiquetas, sea en la columna con las etiquetas principales o en una entrada abierta, se realizará una búsqueda de la etiqueta clicada en toda la base de datos, mostrando hasta un máximo de setenta coincidencias.</li><li>Las entradas completas y abiertas en la tercera columna cuentan con una sección de etiquetas y otra inferior con herramientas de compartición (Enlace, Copiar, QR, Tuitear), de mucha utilidad para la difusión en las redes.</li><li>Clica en el título principal para recargar el sitio y reiniciar todo.</li><li>Si deseas informar de algún enlace roto, hacer comentarios o hacer correcciones acerca del contenido, no dudes en contactar conmigo mediante mi correo electrónico <b>jucardus en gmail punto com</b>.</li><li><b>Actividad reciente:</b> <span class="busca-interna" onclick="buscarEntradaPorId('260712112704')">¡Clícame!</span></li></ul></div>';
        contenidoCompletoEl.innerHTML = textoAclaraciones;
        mobileContenidoCompletoEl.innerHTML = textoAclaraciones;
        actualizarBanner('Aclaraciones', null);
        actualizarTituloPagina(null);
        if (isMobile) {
            cambiarPestanaMovil('c');
        }
    } else if (destino === 'autor') {
        var textoAutor = '<h2>Autor y contacto</h2><div class="contenido-bbb"><ul><li><b>Autor:</b> Jucardus ©</li><li><b>Contacto:</b> <a href="https://quickchart.io/qr?text=jucardus@gmail.com&size=250x250&margin=5&ecLevel=M&dark=185&light=f0f0f0&caption=%20jucardus@gmail.com&captionFontFamily=Verdana&captionFontSize=19&format=png" class="shortLinksSpans" target="_blank" rel="noopener noreferrer nofollow">jucardus en gmail punto com ↗</a></li><li><b>Linktree Jucardus:</b> <a href="https://linktr.ee/jucardus" rel="noopener noreferrer" target="_blank">linktr.ee/jucardus ↗</a></li><li><b>Mis sitios web:</b> <span class="busca-interna" onclick="buscarPorEtiqueta('Mis sitios web *')">¡Clícame!</span></li><li><b>Enlace corto:</b> jucardus.com</li><li><b>Donaciones:</b> [ pendiente ]</li></ul><p>Si deseas informar de algún enlace roto, hacer comentarios o hacer correcciones acerca del contenido de este sitio, o incluso solicitar el servicio de traducciones del inglés al español, no dudes en contactar conmigo mediante mi correo electrónico <b>jucardus en gmail punto com</b>.</p></div>';
        contenidoCompletoEl.innerHTML = textoAutor;
        mobileContenidoCompletoEl.innerHTML = textoAutor;
        actualizarBanner('Autor y contacto', null);
        actualizarTituloPagina(null);
        if (isMobile) {
            cambiarPestanaMovil('c');
        }
    } else if (destino === 'donaciones') {
        var textoDonaciones = '<h2>Donaciones</h2><div class="contenido-bbb"><p style="color: #6a7a8a;">[ en preparación ]</p><p>Esta sección estará disponible próximamente para quienes deseen apoyar el proyecto.</p><p style="color: #6a7a8a;">¡Gracias por tu interés!</p></div>';
        contenidoCompletoEl.innerHTML = textoDonaciones;
        mobileContenidoCompletoEl.innerHTML = textoDonaciones;
        actualizarBanner('Donaciones', null);
        actualizarTituloPagina(null);
        if (isMobile) {
            cambiarPestanaMovil('c');
        }
    }

    limpiarBusqueda();
}

// ============================================================
//  FUNCIÓN PARA ACTUALIZAR EL TÍTULO DE LA PÁGINA
// ============================================================
function actualizarTituloPagina(entrada) {
    var titleEl = document.getElementById('dynamicTitle');
    if (!titleEl) return;

    if (entrada) {
        var etiquetaPrincipal = null;
        if (entrada.ccc) {
            var etiquetas = entrada.ccc.split(',').map(function(e) { return e.trim(); });
            for (var i = 0; i < etiquetas.length; i++) {
                if (etiquetas[i].endsWith(' *')) {
                    etiquetaPrincipal = etiquetas[i].replace(' *', '');
                    break;
                }
            }
        }

        var titulo = entrada.aaa || 'Entrada';
        if (etiquetaPrincipal) {
            titulo += ' | ' + etiquetaPrincipal;
        }
        titulo += ' | Jucardus.com';
        titleEl.textContent = titulo;
        console.log('✅ Título actualizado:', titulo);
    } else {
        titleEl.textContent = 'Jucardus.com';
        console.log('✅ Título restaurado: Jucardus.com');
    }
}

// ============================================================
//  FUNCIÓN PARA FORMATEAR FECHA
// ============================================================
function formatearFecha(id) {
    if (!id || id.length !== 12) return id;
    var anio = id.substring(0, 2);
    var mes = id.substring(2, 4);
    var dia = id.substring(4, 6);
    var hora = id.substring(6, 8);
    var min = id.substring(8, 10);
    var seg = id.substring(10, 12);
    return anio + '·' + mes + '·' + dia + ' - ' + hora + ':' + min + ':' + seg;
}

// ============================================================
//  FUNCIONES DE LIMPIEZA DE BÚSQUEDA
// ============================================================
function limpiarBusqueda() {
    busquedaInput.value = '';
    mobileBusquedaInput.value = '';
}

function seleccionarTextoBusqueda() {
    busquedaInput.select();
    mobileBusquedaInput.select();
}

// ============================================================
//  FUNCIÓN PARA RESALTAR PRIMERA ENTRADA EN B
// ============================================================
function resaltarPrimeraEntradaEnB() {
    var items = listaEntradasParcialesEl.querySelectorAll('li');
    items.forEach(function(li, index) {
        li.classList.remove('destacado');
        if (index === 0 && li.dataset && li.dataset.id) {
            li.classList.add('destacado');
        }
    });
    var mobileItems = mobileListaEntradasParcialesEl.querySelectorAll('li');
    mobileItems.forEach(function(li, index) {
        li.classList.remove('destacado');
        if (index === 0 && li.dataset && li.dataset.id) {
            li.classList.add('destacado');
        }
    });
}

// ============================================================
//  FUNCIONES DE PROCESAMIENTO
// ============================================================

function limpiarEtiqueta(etiqueta) {
    return etiqueta.replace(' *', '').trim();
}

function esEtiquetaPrincipal(etiqueta) {
    return etiqueta.endsWith(' *');
}

function obtenerEtiquetaPrincipal(etiquetas) {
    if (!etiquetas) return null;
    var lista = etiquetas.split(',').map(function(e) { return e.trim(); });
    for (var i = 0; i < lista.length; i++) {
        if (esEtiquetaPrincipal(lista[i])) {
            return lista[i];
        }
    }
    return null;
}

function procesarContenidoBBB(bbb) {
    if (!bbb) return '';

    var html = bbb;

    html = html.replace(/@@(https?:\/\/[^\|]+)\|([^@]+)@@/g, function(match, url, texto) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer nofollow">' + texto.trim() + ' ↗</a>';
    });

    html = html.replace(/@@(\d{12})\|([^@]+)@@/g, function(match, id, texto) {
        return '<span class="busca-interna" onclick="buscarEntradaPorId(\'' + id + '\')">' + texto.trim() + '</span>';
    });

    html = html.replace(/¶¶(https?:\/\/[^\|]+)\|([^¶]+)¶¶/g, function(match, url, desc) {
        return '<div class="images-container"><img src="' + url + '" alt="' + desc.trim() + '" loading="lazy" /></div>';
    });

    html = html.replace(/®®([^\|]+)\|([^®]+)®®/g, function(match, ruby, texto) {
        return '<ruby>' + texto.trim() + '<rt>' + ruby.trim() + '</rt></ruby>';
    });

    html = html.replace(/\n/g, '<br>');

    return html;
}

// ============================================================
//  FUNCIONES DE MANEJO DE URL Y BANNER
// ============================================================

function actualizarURL(id) {
    if (id) {
        var nuevaURL = window.location.pathname + '?q=' + id;
        window.history.pushState({ id: id }, '', nuevaURL);
    } else {
        var urlSinQuery = window.location.pathname;
        window.history.pushState({}, '', urlSinQuery);
    }
}

function eliminarQueryDeURL() {
    var urlSinQuery = window.location.pathname;
    window.history.pushState({}, '', urlSinQuery);
    QUERY_ID = null;
}

function actualizarBanner(titulo, id) {
    if (titulo && id) {
        tituloBannerEl.textContent = titulo;
        fechaBannerEl.textContent = formatearFecha(id);
        fechaBannerEl.style.display = 'inline';
    } else if (titulo) {
        tituloBannerEl.textContent = titulo;
        fechaBannerEl.textContent = '';
        fechaBannerEl.style.display = 'none';
    } else {
        tituloBannerEl.textContent = 'Inicio';
        fechaBannerEl.textContent = '';
        fechaBannerEl.style.display = 'none';
    }
}

// ============================================================
//  FUNCIONES DE RENDERIZADO
// ============================================================

function renderizarEtiquetas(etiquetas) {
    listaEtiquetasEl.innerHTML = '';
    mobileListaEtiquetasEl.innerHTML = '';

    if (!etiquetas || etiquetas.length === 0) {
        var li = document.createElement('li');
        li.textContent = 'Sin etiquetas principales';
        li.style.color = '#6a7a8a';
        li.style.fontStyle = 'italic';
        li.style.cursor = 'default';
        listaEtiquetasEl.appendChild(li);
        var liMobile = li.cloneNode(true);
        mobileListaEtiquetasEl.appendChild(liMobile);
        return;
    }

    var unique = [...new Set(etiquetas)];
    unique.sort(function(a, b) { return a.localeCompare(b); });
    unique.forEach(function(etq) {
        var li = document.createElement('li');
        li.dataset.etiqueta = etq;
        li.textContent = limpiarEtiqueta(etq);
        li.addEventListener('click', function() {
            eliminarQueryDeURL();
            seleccionarEtiqueta(etq);
            if (isMobile) {
                cambiarPestanaMovil('b');
            }
            limpiarBusqueda();
        });
        listaEtiquetasEl.appendChild(li);

        var liMobile = document.createElement('li');
        liMobile.dataset.etiqueta = etq;
        liMobile.textContent = limpiarEtiqueta(etq);
        liMobile.addEventListener('click', function() {
            eliminarQueryDeURL();
            seleccionarEtiqueta(etq);
            if (isMobile) {
                cambiarPestanaMovil('b');
            }
            limpiarBusqueda();
        });
        mobileListaEtiquetasEl.appendChild(liMobile);
    });
}

function renderizarEntradasParciales(entradas) {
    listaEntradasParcialesEl.innerHTML = '';
    if (!entradas || entradas.length === 0) {
        listaEntradasParcialesEl.innerHTML = '<li style="color:#6a7a8a; font-style:italic; cursor:default;">No hay entradas</li>';
        contadorEntradasEl.textContent = '(0)';
    } else {
        contadorEntradasEl.textContent = '(' + entradas.length + ')';
        entradas.forEach(function(entrada) {
            var li = document.createElement('li');
            li.dataset.id = entrada.ddd;
            var titulo = entrada.aaa || 'Sin título';
            var etiquetas = entrada.ccc || '';
            li.innerHTML = '<span class="titulo-parcial">' + titulo + '</span><span class="etiquetas-parcial">' + etiquetas + '</span>';
            li.addEventListener('click', function() {
                abrirEntradaPorId(entrada.ddd);
                limpiarBusqueda();
                if (isMobile) {
                    cambiarPestanaMovil('c');
                }
            });
            listaEntradasParcialesEl.appendChild(li);
        });
    }

    mobileListaEntradasParcialesEl.innerHTML = '';
    if (!entradas || entradas.length === 0) {
        mobileListaEntradasParcialesEl.innerHTML = '<li style="color:#6a7a8a; font-style:italic; cursor:default;">No hay entradas</li>';
        mobileContadorEntradasEl.textContent = '(0)';
        mobileContadorBadgeEl.textContent = '0';
    } else {
        mobileContadorEntradasEl.textContent = '(' + entradas.length + ')';
        mobileContadorBadgeEl.textContent = entradas.length;
        entradas.forEach(function(entrada) {
            var li = document.createElement('li');
            li.dataset.id = entrada.ddd;
            var titulo = entrada.aaa || 'Sin título';
            var etiquetas = entrada.ccc || '';
            li.innerHTML = '<span class="titulo-parcial">' + titulo + '</span><span class="etiquetas-parcial">' + etiquetas + '</span>';
            li.addEventListener('click', function() {
                abrirEntradaPorId(entrada.ddd);
                limpiarBusqueda();
                if (isMobile) {
                    cambiarPestanaMovil('c');
                }
            });
            mobileListaEntradasParcialesEl.appendChild(li);
        });
    }

    if (divB) divB.scrollTop = 0;
}

function mostrarEntradaCompleta(entrada, esMovil) {
    var targetEl = esMovil ? mobileContenidoCompletoEl : contenidoCompletoEl;

    if (!entrada) {
        targetEl.innerHTML = '<h2>Entrada no encontrada</h2><p style="color:#6a7a8a;">No se pudo cargar la entrada.</p>';
        if (!esMovil) {
            actualizarBanner('Error', null);
            actualizarTituloPagina(null);
        }
        return;
    }

    actualizarTituloPagina(entrada);

    var html = '<h2>' + entrada.aaa + '</h2>';
    html += '<div class="contenido-bbb">' + procesarContenidoBBB(entrada.bbb) + '</div>';

    var etiquetas = entrada.ccc.split(',').map(function(e) { return e.trim(); }).filter(function(e) { return e; });
    if (etiquetas.length > 0) {
        html += '<div class="etiquetas-completas"><h4>Etiquetas</h4><ul>';
        etiquetas.forEach(function(etq) {
            var etqLimpia = limpiarEtiqueta(etq);
            var etqEscapada = etqLimpia.replace(/'/g, "\\'");
            var esPrincipal = esEtiquetaPrincipal(etq);
            var claseExtra = esPrincipal ? ' style="font-weight:700;color:#b0c4d8;"' : '';
            html += '<li onclick="buscarPorEtiqueta(\'' + etqEscapada + '\')"' + claseExtra + '>' + etqLimpia + '</li>';
        });
        html += '</ul></div>';
    }

    var enlacePermanente = 'https://jucardus.github.io/?q=' + entrada.ddd;
    var tweetText = encodeURIComponent(entrada.aaa + ' ¦ ' + entrada.ccc + ' ¦ ' + enlacePermanente);
    var tweetUrl = 'https://x.com/intent/tweet?text=' + tweetText;
    var textoCopiar = entrada.aaa + ' ¦ ' + entrada.ccc + ' ¦ ' + enlacePermanente;
    var textoCopiarEscapado = textoCopiar.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    var qrId = 'qr-container' + (esMovil ? '-movil' : '');

    html += '<div class="compartir">';
    html += '<h4>Compartir</h4>';
    html += '<div class="botones-compartir">';
    html += '<span class="btn-compartir" onclick="copiarEnlacePermanente(\'' + entrada.ddd + '\', this)">Enlace</span>';
    html += '<span class="btn-compartir" onclick="copiarAlPortapapeles(\'' + textoCopiarEscapado + '\', this)">Copiar</span>';
    html += '<span class="btn-compartir" onclick="mostrarQR(\'' + entrada.ddd + '\', \'' + qrId + '\', this)">QR</span>';
    html += '<a class="btn-compartir" href="' + tweetUrl + '" target="_blank" rel="noopener noreferrer">𝕏 Tuitear ↗</a>';
    html += '</div>';
    html += '<div id="' + qrId + '" style="display:none;margin-top:18px;padding:0;border-radius:7px;text-align:center;background:transparent;"></div>';
    html += '</div>';

    targetEl.innerHTML = html;
}

// ============================================================
//  FUNCIONES PARA COPIAR, QR Y ENLACES
// ============================================================

function copiarEnlacePermanente(id, elementoBoton) {
    var enlace = 'https://jucardus.github.io/?q=' + id;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(enlace)
            .then(function() {
                mostrarFeedbackCopiado(elementoBoton, '✅ Enlace copiado');
            })
            .catch(function() {
                copiarConTextarea(enlace, elementoBoton, '✅ Enlace copiado');
            });
    } else {
        copiarConTextarea(enlace, elementoBoton, '✅ Enlace copiado');
    }
}

function copiarAlPortapapeles(texto, elementoBoton) {
    if (!texto) {
        console.warn('No hay texto para copiar');
        return;
    }

    var textoLimpio = texto
        .replace(/\[\[\[espacio\]\]\]/g, ' ')
        .replace(/\[\[\[comilla\]\]\]/g, "'")
        .replace(/\[\[\[comillas\]\]\]/g, '"')
        .replace(/\[\[\[et\]\]\]/g, '&')
        .replace(/\[\[\[menor\]\]\]/g, '<')
        .replace(/\[\[\[mayor\]\]\]/g, '>');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textoLimpio)
            .then(function() {
                mostrarFeedbackCopiado(elementoBoton, '✅ Copiado');
            })
            .catch(function() {
                copiarConTextarea(textoLimpio, elementoBoton, '✅ Copiado');
            });
    } else {
        copiarConTextarea(textoLimpio, elementoBoton, '✅ Copiado');
    }
}

function copiarConTextarea(texto, elementoBoton, mensaje) {
    var textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.width = '1px';
    textarea.style.height = '1px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    mostrarFeedbackCopiado(elementoBoton, mensaje);
}

function mostrarFeedbackCopiado(elementoBoton, mensaje) {
    if (elementoBoton) {
        var original = elementoBoton.textContent;
        elementoBoton.textContent = mensaje || '✅ Copiado';
        elementoBoton.classList.add('copiar-exito');
        setTimeout(function() {
            elementoBoton.textContent = original;
            elementoBoton.classList.remove('copiar-exito');
        }, 2000);
    }
}

function mostrarQR(id, containerId, elementoBoton) {
    var container = document.getElementById(containerId);
    if (!container) {
        console.warn('Contenedor QR no encontrado:', containerId);
        return;
    }

    var enlace = 'https://jucardus.github.io/?q=' + id;
    var qrUrl = 'https://quickchart.io/qr?text=' + encodeURIComponent(enlace) + '&size=250&margin=4&ecLevel=H&dark=2a3a4a&light=d0d4d8';

    if (container.style.display !== 'none' && container.dataset.qrId === id) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    container.dataset.qrId = id;
    container.style.display = 'block';
    container.innerHTML = '<img src="' + qrUrl + '" alt="Código QR" style="max-width:80%;width:220px;border-radius:7px;background:#d0d4d8;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,0.2);display:block;margin:0 auto;" /><br><small style="display:block;margin-top:4px;color:#8a9aaa;font-size:0.8rem;font-weight:400;">Escanea para abrir esta entrada</small>';

    var targetSection = container.closest('.div-c') || container.closest('.section#mobile-section-c');
    if (targetSection) {
        var img = container.querySelector('img');
        if (img) {
            img.onload = function() {
                setTimeout(function() {
                    targetSection.scrollTop = targetSection.scrollHeight;
                }, 50);
            };
            if (img.complete) {
                setTimeout(function() {
                    targetSection.scrollTop = targetSection.scrollHeight;
                }, 50);
            }
        } else {
            setTimeout(function() {
                targetSection.scrollTop = targetSection.scrollHeight;
            }, 100);
        }
    }

    if (elementoBoton) {
        var original = elementoBoton.textContent;
        elementoBoton.textContent = 'QR ✓';
        setTimeout(function() {
            elementoBoton.textContent = original;
        }, 1500);
    }
}

// ============================================================
//  FUNCIÓN BUSCAR POR ETIQUETA
// ============================================================
function buscarPorEtiqueta(etiqueta) {
    if (!etiqueta || etiqueta.trim() === '') return;

    var items = listaEtiquetasEl.querySelectorAll('li');
    var encontrada = false;
    var etqLimpia = limpiarEtiqueta(etiqueta);

    items.forEach(function(li) {
        var etq = li.dataset.etiqueta;
        if (etq) {
            var etqLimpiaLi = limpiarEtiqueta(etq);
            if (etqLimpiaLi === etqLimpia) {
                li.click();
                encontrada = true;
                li.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }
    });

    if (!encontrada) {
        seleccionarEtiqueta(etiqueta);
    }

    if (isMobile) {
        cambiarPestanaMovil('b');
    }

    limpiarBusqueda();
}

// ============================================================
//  FUNCIONES DE INTERACCIÓN
// ============================================================

function mostrarTodas() {
    var items = listaEtiquetasEl.querySelectorAll('li');
    items.forEach(function(li) {
        li.classList.remove('activo');
    });
    var mobileItems = mobileListaEtiquetasEl.querySelectorAll('li');
    mobileItems.forEach(function(li) {
        li.classList.remove('activo');
    });

    actualizarBanner('Inicio', null);
    modoActual = 'inicio';
    renderizarEntradasParciales(entradasRecientes);

    if (entradasRecientes.length > 0) {
        var entrada = entradasRecientes[0];
        mostrarEntradaCompleta(entrada, false);
        mostrarEntradaCompleta(entrada, true);
        actualizarURL(entrada.ddd);
        actualizarBanner(entrada.aaa, entrada.ddd);
        resaltarPrimeraEntradaEnB();
    } else {
        contenidoCompletoEl.innerHTML = '<h2>Sin entradas</h2><p style="color:#6a7a8a;">No hay entradas disponibles.</p>';
        mobileContenidoCompletoEl.innerHTML = '<h2>Sin entradas</h2><p style="color:#6a7a8a;">No hay entradas disponibles.</p>';
    }
    limpiarBusqueda();
}

function seleccionarEtiqueta(etiqueta) {
    var items = listaEtiquetasEl.querySelectorAll('li');
    items.forEach(function(li) {
        li.classList.remove('activo');
        if (li.dataset.etiqueta === etiqueta) {
            li.classList.add('activo');
        }
    });
    var mobileItems = mobileListaEtiquetasEl.querySelectorAll('li');
    mobileItems.forEach(function(li) {
        li.classList.remove('activo');
        if (li.dataset.etiqueta === etiqueta) {
            li.classList.add('activo');
        }
    });

    var displayName = limpiarEtiqueta(etiqueta);
    modoActual = 'etiqueta';

    listaEntradasParcialesEl.innerHTML = '<li class="cargando">Buscando...</li>';
    contadorEntradasEl.textContent = '(…)';
    mobileListaEntradasParcialesEl.innerHTML = '<li class="cargando">Buscando...</li>';
    mobileContadorEntradasEl.textContent = '(…)';
    mobileContadorBadgeEl.textContent = '…';
    contenidoCompletoEl.innerHTML = '<h2>Buscando...</h2><p style="color:#6a7a8a;">Obteniendo entradas con la etiqueta "' + displayName + '"</p>';
    mobileContenidoCompletoEl.innerHTML = '<h2>Buscando...</h2><p style="color:#6a7a8a;">Obteniendo entradas con la etiqueta "' + displayName + '"</p>';

    var url = GAS_URL + '?etiqueta=' + encodeURIComponent(etiqueta);
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error en la búsqueda: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            var resultados = data.resultados || [];
            renderizarEntradasParciales(resultados);
            if (resultados && resultados.length > 0) {
                var entrada = resultados[0];
                mostrarEntradaCompleta(entrada, false);
                mostrarEntradaCompleta(entrada, true);
                actualizarURL(entrada.ddd);
                actualizarBanner(entrada.aaa, entrada.ddd);
                resaltarPrimeraEntradaEnB();
            } else {
                contenidoCompletoEl.innerHTML = '<h2>Sin resultados</h2><p style="color:#6a7a8a;">No hay entradas con la etiqueta "' + displayName + '".</p>';
                mobileContenidoCompletoEl.innerHTML = '<h2>Sin resultados</h2><p style="color:#6a7a8a;">No hay entradas con la etiqueta "' + displayName + '".</p>';
                actualizarBanner('🏷️ ' + displayName + ' (sin resultados)', null);
            }
            if (isMobile) {
                cambiarPestanaMovil('b');
            }
        })
        .catch(function(error) {
            console.error('Error al buscar por etiqueta:', error);
            listaEntradasParcialesEl.innerHTML = '<li style="color:#c0392b; font-style:italic; cursor:default;">❌ Error</li>';
            mobileListaEntradasParcialesEl.innerHTML = '<li style="color:#c0392b; font-style:italic; cursor:default;">❌ Error</li>';
        });
}

function abrirEntradaPorId(id) {
    modoActual = 'entrada';
    entradaAbiertaId = id;

    contenidoCompletoEl.innerHTML = '<h2>Cargando...</h2><p style="color:#6a7a8a;">Obteniendo datos...</p>';
    mobileContenidoCompletoEl.innerHTML = '<h2>Cargando...</h2><p style="color:#6a7a8a;">Obteniendo datos...</p>';

    var url = GAS_URL + '?q=' + encodeURIComponent(id);
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error al buscar entrada: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            var entrada = data.entrada || null;
            if (entrada) {
                mostrarEntradaCompleta(entrada, false);
                mostrarEntradaCompleta(entrada, true);
                actualizarURL(entrada.ddd);
                actualizarBanner(entrada.aaa, entrada.ddd);
                var items = listaEntradasParcialesEl.querySelectorAll('li');
                items.forEach(function(li) {
                    li.classList.remove('destacado');
                    if (li.dataset.id === id) {
                        li.classList.add('destacado');
                    }
                });
                var mobileItems = mobileListaEntradasParcialesEl.querySelectorAll('li');
                mobileItems.forEach(function(li) {
                    li.classList.remove('destacado');
                    if (li.dataset.id === id) {
                        li.classList.add('destacado');
                    }
                });

                var etiquetaPrincipal = obtenerEtiquetaPrincipal(entrada.ccc);
                if (etiquetaPrincipal) {
                    var etqLimpia = limpiarEtiqueta(etiquetaPrincipal);
                    document.querySelectorAll('#listaEtiquetas li, #mobileListaEtiquetas li').forEach(function(li) {
                        li.classList.remove('activo');
                        if (li.dataset && li.dataset.etiqueta) {
                            var etqLi = limpiarEtiqueta(li.dataset.etiqueta);
                            if (etqLi === etqLimpia) {
                                li.classList.add('activo');
                                if (li.closest('#listaEtiquetas')) {
                                    li.scrollIntoView({ block: 'center', behavior: 'smooth' });
                                }
                            }
                        }
                    });
                }
            } else {
                contenidoCompletoEl.innerHTML = '<h2>Entrada no encontrada</h2><p style="color:#6a7a8a;">El ID no corresponde a ninguna entrada.</p>';
                mobileContenidoCompletoEl.innerHTML = '<h2>Entrada no encontrada</h2><p style="color:#6a7a8a;">El ID no corresponde a ninguna entrada.</p>';
                actualizarBanner('Error: ID no encontrado', null);
                actualizarTituloPagina(null);
            }
        })
        .catch(function(error) {
            console.error('Error al abrir entrada:', error);
            contenidoCompletoEl.innerHTML = '<h2>Error</h2><p style="color:#6a7a8a;">No se pudo cargar la entrada.</p>';
            mobileContenidoCompletoEl.innerHTML = '<h2>Error</h2><p style="color:#6a7a8a;">No se pudo cargar la entrada.</p>';
        });
}

function buscarEntradaPorId(id) {
    abrirEntradaPorId(id);
}

function buscarTexto(query) {
    if (!query || query.trim() === '') {
        eliminarQueryDeURL();
        mostrarTodas();
        return;
    }

    modoActual = 'busqueda';
    var q = query.trim();
    actualizarBanner('🔍 "' + q + '"', null);

    listaEntradasParcialesEl.innerHTML = '<li class="cargando">Buscando...</li>';
    contadorEntradasEl.textContent = '(…)';
    mobileListaEntradasParcialesEl.innerHTML = '<li class="cargando">Buscando...</li>';
    mobileContadorEntradasEl.textContent = '(…)';
    mobileContadorBadgeEl.textContent = '…';
    contenidoCompletoEl.innerHTML = '<h2>Buscando...</h2><p style="color:#6a7a8a;">Buscando entradas que contengan "' + q + '"</p>';
    mobileContenidoCompletoEl.innerHTML = '<h2>Buscando...</h2><p style="color:#6a7a8a;">Buscando entradas que contengan "' + q + '"</p>';

    var url = GAS_URL + '?buscar=' + encodeURIComponent(q);
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error en la búsqueda: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            var resultados = data.resultados || [];
            renderizarEntradasParciales(resultados);
            if (resultados && resultados.length > 0) {
                var entrada = resultados[0];
                mostrarEntradaCompleta(entrada, false);
                mostrarEntradaCompleta(entrada, true);
                actualizarURL(entrada.ddd);
                actualizarBanner(entrada.aaa, entrada.ddd);
                resaltarPrimeraEntradaEnB();
            } else {
                contenidoCompletoEl.innerHTML = '<h2>Sin resultados</h2><p style="color:#6a7a8a;">No se encontraron entradas que contengan "' + q + '".</p>';
                mobileContenidoCompletoEl.innerHTML = '<h2>Sin resultados</h2><p style="color:#6a7a8a;">No se encontraron entradas que contengan "' + q + '".</p>';
            }
            seleccionarTextoBusqueda();
            if (isMobile) {
                cambiarPestanaMovil('b');
            }
        })
        .catch(function(error) {
            console.error('Error en búsqueda de texto:', error);
            listaEntradasParcialesEl.innerHTML = '<li style="color:#c0392b; font-style:italic; cursor:default;">❌ Error</li>';
            mobileListaEntradasParcialesEl.innerHTML = '<li style="color:#c0392b; font-style:italic; cursor:default;">❌ Error</li>';
        });
}

// ============================================================
//  CARGA INICIAL DE DATOS
// ============================================================

function cargarDatosIniciales(datos) {
    if (!datos || !datos.etiquetas || !datos.entradasRecientes) {
        listaEtiquetasEl.innerHTML = '<li style="color:#c0392b; font-style:italic; cursor:default;">❌ Error al cargar datos</li>';
        mobileListaEtiquetasEl.innerHTML = '<li style="color:#c0392b; font-style:italic; cursor:default;">❌ Error al cargar datos</li>';
        return;
    }

    etiquetasPrincipales = datos.etiquetas || [];
    entradasRecientes = datos.entradasRecientes || [];
    datosCargados = true;

    renderizarEtiquetas(etiquetasPrincipales);
    renderizarEntradasParciales(entradasRecientes);

    if (QUERY_ID) {
        var id = QUERY_ID;
        var url = GAS_URL + '?q=' + encodeURIComponent(id);
        fetch(url)
            .then(function(response) { return response.json(); })
            .then(function(data) {
                var entrada = data.entrada || null;
                if (entrada) {
                    entradaAbiertaId = entrada.ddd;
                    mostrarEntradaCompleta(entrada, false);
                    mostrarEntradaCompleta(entrada, true);
                    actualizarURL(entrada.ddd);
                    actualizarBanner(entrada.aaa, entrada.ddd);
                    var items = listaEntradasParcialesEl.querySelectorAll('li');
                    items.forEach(function(li) {
                        li.classList.remove('destacado');
                        if (li.dataset.id === id) {
                            li.classList.add('destacado');
                        }
                    });
                    var mobileItems = mobileListaEntradasParcialesEl.querySelectorAll('li');
                    mobileItems.forEach(function(li) {
                        li.classList.remove('destacado');
                        if (li.dataset.id === id) {
                            li.classList.add('destacado');
                        }
                    });
                    var etiquetaPrincipal = obtenerEtiquetaPrincipal(entrada.ccc);
                    if (etiquetaPrincipal) {
                        var etqLimpia = limpiarEtiqueta(etiquetaPrincipal);
                        document.querySelectorAll('#listaEtiquetas li, #mobileListaEtiquetas li').forEach(function(li) {
                            li.classList.remove('activo');
                            if (li.dataset && li.dataset.etiqueta) {
                                var etqLi = limpiarEtiqueta(li.dataset.etiqueta);
                                if (etqLi === etqLimpia) {
                                    li.classList.add('activo');
                                    if (li.closest('#listaEtiquetas')) {
                                        li.scrollIntoView({ block: 'center', behavior: 'smooth' });
                                    }
                                }
                            }
                        });
                    }
                    if (isMobile) {
                        cambiarPestanaMovil('c');
                    }
                } else {
                    contenidoCompletoEl.innerHTML = '<h2>Entrada no encontrada</h2><p style="color:#6a7a8a;">El ID "' + id + '" no corresponde a ninguna entrada.</p>';
                    mobileContenidoCompletoEl.innerHTML = '<h2>Entrada no encontrada</h2><p style="color:#6a7a8a;">El ID "' + id + '" no corresponde a ninguna entrada.</p>';
                    actualizarBanner('Error: ID no encontrado', null);
                    actualizarTituloPagina(null);
                }
            })
            .catch(function(error) {
                console.error('Error al procesar query:', error);
            });
        return;
    }

    if (entradasRecientes.length > 0) {
        var entrada = entradasRecientes[0];
        entradaAbiertaId = entrada.ddd;
        mostrarEntradaCompleta(entrada, false);
        mostrarEntradaCompleta(entrada, true);
        actualizarURL(entrada.ddd);
        actualizarBanner(entrada.aaa, entrada.ddd);
        resaltarPrimeraEntradaEnB();
    } else {
        contenidoCompletoEl.innerHTML = '<h2>Sin entradas</h2><p style="color:#6a7a8a;">La base de datos está vacía.</p>';
        mobileContenidoCompletoEl.innerHTML = '<h2>Sin entradas</h2><p style="color:#6a7a8a;">La base de datos está vacía.</p>';
        actualizarBanner('Sin entradas', null);
        actualizarTituloPagina(null);
    }
}

// ============================================================
//  VARIABLES GLOBALES
// ============================================================
var entradasRecientes = [];
var etiquetasPrincipales = [];
var entradaActual = null;
var modoActual = 'inicio';
var datosCargados = false;
var entradaAbiertaId = null;

// Elementos desktop
var listaEtiquetasEl = document.getElementById('listaEtiquetas');
var listaEntradasParcialesEl = document.getElementById('listaEntradasParciales');
var contadorEntradasEl = document.getElementById('contadorEntradas');
var contenidoCompletoEl = document.getElementById('contenidoCompleto');
var tituloBannerEl = document.getElementById('tituloBanner');
var fechaBannerEl = document.getElementById('fechaBanner');
var busquedaInput = document.getElementById('busquedaInput');
var divB = document.getElementById('divB');

// Elementos móvil
var mobileListaEtiquetasEl = document.getElementById('mobileListaEtiquetas');
var mobileListaEntradasParcialesEl = document.getElementById('mobileListaEntradasParciales');
var mobileContadorEntradasEl = document.getElementById('mobileContadorEntradas');
var mobileContadorBadgeEl = document.getElementById('mobileContadorBadge');
var mobileContenidoCompletoEl = document.getElementById('mobileContenidoCompleto');
var mobileBusquedaInput = document.getElementById('mobileBusquedaInput');

// ============================================================
//  INICIALIZACIÓN
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado. QUERY_ID:', QUERY_ID);
    console.log('GAS_URL:', GAS_URL);

    busquedaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarTexto(this.value);
            if (isMobile) {
                cambiarPestanaMovil('b');
            }
        }
    });

    mobileBusquedaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarTexto(this.value);
            if (isMobile) {
                cambiarPestanaMovil('b');
            }
        }
    });

    busquedaInput.addEventListener('input', function() {
        mobileBusquedaInput.value = this.value;
    });
    mobileBusquedaInput.addEventListener('input', function() {
        busquedaInput.value = this.value;
    });

    var url = GAS_URL + '?action=getData';
    console.log('Cargando datos desde:', url);
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error al obtener datos: ' + response.status);
            }
            return response.json();
        })
        .then(function(datos) {
            console.log('Datos obtenidos correctamente');
            cargarDatosIniciales(datos);
        })
        .catch(function(error) {
            console.error('Error al cargar datos iniciales:', error);
            listaEtiquetasEl.innerHTML = '<li style="color:#c0392b; font-style:italic; cursor:default;">❌ Error al cargar datos</li>';
            mobileListaEtiquetasEl.innerHTML = '<li style="color:#c0392b; font-style:italic; cursor:default;">❌ Error al cargar datos</li>';
        });
});

// Exponer funciones globalmente
window.abrirEntradaPorId = abrirEntradaPorId;
window.mostrarTodas = mostrarTodas;
window.seleccionarEtiqueta = seleccionarEtiqueta;
window.buscarPorEtiqueta = buscarPorEtiqueta;
window.buscarEntradaPorId = buscarEntradaPorId;
window.buscarTexto = buscarTexto;
window.copiarAlPortapapeles = copiarAlPortapapeles;
window.copiarEnlacePermanente = copiarEnlacePermanente;
window.mostrarQR = mostrarQR;
window.cargarDatosIniciales = cargarDatosIniciales;
window.actualizarURL = actualizarURL;
window.eliminarQueryDeURL = eliminarQueryDeURL;
window.actualizarBanner = actualizarBanner;
window.cambiarPestanaMovil = cambiarPestanaMovil;
window.navegarA = navegarA;
window.formatearFecha = formatearFecha;
window.limpiarBusqueda = limpiarBusqueda;
window.seleccionarTextoBusqueda = seleccionarTextoBusqueda;
window.resaltarPrimeraEntradaEnB = resaltarPrimeraEntradaEnB;
window.actualizarTituloPagina = actualizarTituloPagina;

console.log('Script cargado correctamente.');
