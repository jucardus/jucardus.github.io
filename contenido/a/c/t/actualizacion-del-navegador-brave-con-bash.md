# Actualización del navegador Brave con Bash
<sup>[Inicio](../../../../index.md) · [Índice](../../../../indices/bash.md) · [A-Z](../../../../indices/alfabetico.md) · [Actividad](../../../../indices/actividad.md) · [Compartir](https://x.com/intent/tweet?text=Actualizaci%C3%B3n%20del%20navegador%20Brave%20con%20Bash.%0A%E2%86%92%20https%3A%2F%2Fjucardus.github.io%2Fcontenido%2Fa%2Fc%2Ft%2Factualizacion-del-navegador-brave-con-bash.html%0A%0A%23bash_jucardus%20%23brave_jucardus%0A%40jucardus)</sup>

```
sudo apt install curl

sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main"|sudo tee /etc/apt/sources.list.d/brave-browser-release.list

sudo apt update

sudo apt install brave-browser
```
