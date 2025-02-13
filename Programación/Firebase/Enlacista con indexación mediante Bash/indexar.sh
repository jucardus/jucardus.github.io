#!/bin/bash

mv -f public/d.html ./
mv -f public/ea.html ./
mv -f public/eb.html ./
mv -f public/ee.html ./
mv -f public/j.html ./
mv -f public/jch.html ./
mv -f public/jes.html ./
mv -f public/jfr.html ./
mv -f public/jin.html ./
mv -f public/laberinto.html ./
mv -f public/qr.html ./
mv -f public/rt.html ./
mv -f public/tch.html ./
mv -f public/tc.html ./
mv -f public/tes.html ./
mv -f public/tfr.html ./
mv -f public/t.html ./
mv -f public/tic.html ./
mv -f public/tin.html ./
mv -f public/tracking.html ./
mv -f public/yt.html ./

rm -f public/index.html
grep "" public/*.html > aaaaa.txt
sed -i -e '/html:<html>/d' aaaaa.txt
sed -i -e '/html:<head>/d' aaaaa.txt
sed -i -e '/<\!DOCTYPE html>/d' aaaaa.txt
sed -i -e '/html:<\/head>/d' aaaaa.txt
sed -i -e '/html:<body>/d' aaaaa.txt
sed -i -e '/html:<\/body>/d' aaaaa.txt
sed -i -e '/html:<\/html>/d' aaaaa.txt
sed -i -e '/<meta http-equiv=\"refresh\" content=/d' aaaaa.txt
sed -i -e 's/public\//• <b>/g' aaaaa.txt
sed -i -e 's/-->/<p>/g' aaaaa.txt
sed -i -e 's/\.html\:<\!--/<\/b> → /g' aaaaa.txt
sed -i -e '/^$/d' aaaaa.txt
cat cabeza.txt > index.html
echo "" >> index.html
cat aaaaa.txt >> index.html
cat pie.txt >> index.html
mv -f index.html public/
rm -f aaaaa.txt

mv -f d.html public/
mv -f ea.html public/
mv -f eb.html public/
mv -f ee.html public/
mv -f j.html public/
mv -f jch.html public/
mv -f jes.html public/
mv -f jfr.html public/
mv -f jin.html public/
mv -f laberinto.html public/
mv -f qr.html public/
mv -f rt.html public/
mv -f tch.html public/
mv -f tc.html public/
mv -f tes.html public/
mv -f tfr.html public/
mv -f t.html public/
mv -f tic.html public/
mv -f tin.html public/
mv -f tracking.html public/
mv -f yt.html public/
