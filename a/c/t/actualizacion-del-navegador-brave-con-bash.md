# Actualización del navegador Brave con Bash
[ [inicio](https://github.com/jucardus/jucardus.github.io/blob/main/index.md) · [índice](https://github.com/jucardus/jucardus.github.io/blob/main/indice.md) · [etiquetas](https://github.com/jucardus/jucardus.github.io/blob/main/etiquetas.md) · [actividad](https://github.com/jucardus/jucardus.github.io/blob/main/actividad.md) · [busca](https://jucardus.github.io/busca.html) · [compartir](https://x.com/intent/tweet?text=Actualizaci%C3%B3n+del+navegador+Brave+con+Bash+%E2%80%94+Bash%2C+Programaci%C3%B3n%2C+Brave%0A%0A%E2%86%92+https%3A%2F%2Fgithub.com%2Fjucardus%2Fjucardus.github.io%2Fblob%2Fmain%2Fa%2Fc%2Ft%2Factualizacion-del-navegador-brave-con-bash.md%0A%0A%23bash_jucardus%0A%23brave_jucardus%0A%23programacion_jucardus) ]

```
sudo apt install curl
sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main"|sudo tee /etc/apt/sources.list.d/brave-browser-release.list
sudo apt update
sudo apt install brave-browser
```

[#bash](https://github.com/jucardus/jucardus.github.io/blob/main/b/a/bash.md)  
[#brave](https://github.com/jucardus/jucardus.github.io/blob/main/b/r/brave.md)  
[#programacion](https://github.com/jucardus/jucardus.github.io/blob/main/p/r/programacion.md)

<sup>25-10-27 11:55:52</sup>
