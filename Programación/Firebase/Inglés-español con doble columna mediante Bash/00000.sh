#!/bin/bash

clear
echo ""
echo "INGLÉS-ESPAÑOL"
echo ""
read -p " INGLÉS : " ingles
    if [[ $ingles == "00000" ]]
        then
            bash 00000.sh
    fi
    if [[ $ingles == "11111" ]]
        then
#¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶ PREPARACIOWN DE TRADUCCIONES
            split -l 100 --suffix-length=3 --additional-suffix=.html aaaaa.txt ines-
            head -1 ines-*.html > zzzzz.txt
            sed -i -e 's/<p>//g' zzzzz.txt
            sed -i -e 's/==> /<p>• <a href="/g' zzzzz.txt
            sed -i -e ':a;N;$!ba;s/ <==\n/">/g' zzzzz.txt
            sed -i -e 's/<\/p>/ ... <\/a><\/p>/g' zzzzz.txt
            sed -i -e '1s/^/{{{encabezado}}}\n/' ines-*.html
            sed -i -e '$s/$/{{{pie}}}/' ines-*.html
            sed -i -e 's/{{{encabezado}}}/<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv="Content-Type" content="text\/html; charset=UTF-8" \/>\n<meta name="Author" content="Julio Cárdenas Pelizzari" \/>\n<meta name = "keywords" content = "diccionario inglés-español, inglés-español, inglés, English-Spanish dictionary, English-Spanish, Spanish dictionary, dictionary" \/>\n<meta name = "description" content = "Diccionario inglés-español" \/>\n<meta name = "viewport" content = "width=device-width, initial-scale=1\.0" \/>\n<link rel="stylesheet" href="styles\.css" \/>\n<title>INGLÉS\-ESPAÑOL<\/title>\n<\/head>\n<body>\n<div id="traducciones">/g' ines-*.html
            sed -i -e 's/{{{pie}}}/\n<\/div>\n<\/body>\n<\/html>/g' ines-*.html
            sed -i -e '/^$/d' zzzzz.txt
            fecha=$(date +"%Y·%m·%d")
            conteo=$(grep -o -i → aaaaa.txt | wc -l)
#¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶ IWNDEX.HTML
            echo '<!DOCTYPE html>' > index.html
            echo '<html>' >> index.html
            echo '<head>' >> index.html
            echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' >> index.html
            echo '<meta name="Author" content="Julio Cárdenas Pelizzari" />' >> index.html
            echo '<meta name = "keywords" content = "diccionario inglés-español, inglés-español, inglés, English-Spanish dictionary, English-Spanish, Spanish dictionary, dictionary" />' >> index.html
            echo '<meta name = "description" content = "Diccionario inglés-español" />' >> index.html
            echo '<meta name = "viewport" content = "width=device-width, initial-scale=1.0" />' >> index.html
            echo '<link rel="stylesheet" href="styles.css" />' >> index.html
            echo '<title>INGLÉS-ESPAÑOL</title>' >> index.html
            echo '</head>' >> index.html
            echo '<body>' >> index.html
            echo '<div id="tituloCelular">' >> index.html
            echo '<h2>&#12288;<a href="indice.html" target="principalCelular">≣ Inglés-español</a></h2>' >> index.html
            echo '</div>' >> index.html
            echo '<div id="indice">' >> index.html
            echo '<div id="margen">' >> index.html
            echo '<h1>Diccionario inglés-español<br><span style="font-size: 50%;">&#12288;de <u>jucardus.com</u></span></h1>' >> index.html
            echo '<div id="actualizacion"><b>Actualización:</b> {{{{{fecha}}}}}<br><b>Conteo de traducciones:</b> {{{{{conteo}}}}}<br><b>Servicio de traducciones:</b> jucardus@gmail.com<br><b>Donaciones:</b> paypal.me/jucardus</br></div>' >> index.html
            cat zzzzz.txt >> index.html
            echo '</div>' >> index.html
            echo '</div>' >> index.html
            echo '<div id="contenido">' >> index.html
            echo '<iframe name="principal" id="principal" scrolling="no" frameborder=0 src="ines-aaa.html"></iframe>' >> index.html
            echo '</div>' >> index.html
            echo '<div id="contenidoCelular">' >> index.html
            echo '<iframe name="principalCelular" id="principalCelular" scrolling="no" frameborder=0 src="indice.html"></iframe>' >> index.html
            echo '</div>' >> index.html
            echo '</body>' >> index.html
            echo '</html>' >> index.html
            sed -i -e "s/{{{{{fecha}}}}}/$fecha/g" index.html
            sed -i -e "s/{{{{{conteo}}}}}/$conteo/g" index.html
            sed -i -e 's/.html"><b>/\.html" target="principal"><b>/g' index.html
#¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶ INDICE.HTML
            echo '<!DOCTYPE html>' > indice.html
            echo '<html>' >> indice.html
            echo '<head>' >> indice.html
            echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' >> indice.html
            echo '<meta name="Author" content="Julio Cárdenas Pelizzari" />' >> indice.html
            echo '<meta name = "keywords" content = "diccionario inglés-español, inglés-español, inglés, English-Spanish dictionary, English-Spanish, Spanish dictionary, dictionary" />' >> indice.html
            echo '<meta name = "description" content = "Diccionario inglés-español" />' >> indice.html
            echo '<meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" name="viewport" />' >> indice.html
            echo '<link rel="stylesheet" href="styles.css" />' >> indice.html
            echo '</head>' >> indice.html
            echo '<body>' >> indice.html
            echo '<div id="enlacesIndice">' >> indice.html
            echo '<div id="actualizacion"><b>Actualización:</b> {{{{{fecha}}}}}<br><b>Conteo de traducciones:</b> {{{{{conteo}}}}}<br><b>Servicio de traducciones:</b> jucardus@gmail.com<br><b>Autor:</b> Julio Cárdenas Pelizzari<br><b>Donaciones:</b> paypal.me/jucardus</br></div>' >> indice.html
            cat zzzzz.txt >> indice.html
            echo '</div>' >> indice.html
            echo '</body>' >> indice.html
            echo '</html>' >> indice.html
            sed -i -e "s/{{{{{fecha}}}}}/$fecha/g" indice.html
            sed -i -e "s/{{{{{conteo}}}}}/$conteo/g" indice.html
            sed -i -e 's/.html"><b>/\.html" target="principalCelular"><b>/g' indice.html
#¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
            rm -f zzzzz.txt
    fi
read -p " ESPAÑOL : " espanol
    if [[ $espanol == "00000" ]]
        then
            bash 00000.sh
    fi
echo "<p><b>$ingles</b> → $espanol</p>" >> aaaaa.txt
echo "<p><b>$espanol</b> ← $ingles</p>" >> aaaaa.txt
sort aaaaa.txt > sorted.txt
uniq sorted.txt > aaaaa.txt
rm -f sorted.txt
sed -i -e '/^$/d' aaaaa.txt
bash 00000.sh
