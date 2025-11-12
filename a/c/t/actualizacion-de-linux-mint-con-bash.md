# Actualización de Linux Mint con Bash
[ [inicio](https://github.com/jucardus/jucardus.github.io/blob/main/index.md) · [índice](https://github.com/jucardus/jucardus.github.io/blob/main/indice.md) · [etiquetas](https://github.com/jucardus/jucardus.github.io/blob/main/etiquetas.md) · [actividad](https://github.com/jucardus/jucardus.github.io/blob/main/actividad.md) · [busca](https://jucardus.github.io/busca.html) · [compartir](https://x.com/intent/tweet?text=Actualizaci%C3%B3n+de+Linux+Mint+con+Bash+%E2%80%94+Bash%2C+Programaci%C3%B3n%2C+Linux+Mint%0A%0A%E2%86%92+https%3A%2F%2Fgithub.com%2Fjucardus%2Fjucardus.github.io%2Fblob%2Fmain%2Fa%2Fc%2Ft%2Factualizacion-de-linux-mint-con-bash.md%0A%0A%23bash_jucardus%0A%23linux_mint_jucardus%0A%23programacion_jucardus) ]

### Opción 1

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo apt-get install unattended-upgrades
```

### Opción 2

```bash
sudo apt update && sudo apt full-upgrade -y && sudo apt install unattended-upgrades -y
```

### Opción 3, con _autoclean_

```bash
sudo apt update && sudo apt full-upgrade -y && sudo apt autoremove -y && sudo apt autoclean && sudo apt install unattended-upgrades -y
```

### Opción 4

```bash
sudo apt-get update && sudo apt-get dist-upgrade -y && sudo apt-get autoremove -y && sudo apt-get install unattended-upgrades -y
```

[#bash](https://github.com/jucardus/jucardus.github.io/blob/main/b/a/bash.md)  
[#linux-mint](https://github.com/jucardus/jucardus.github.io/blob/main/l/i/linux-mint.md)  
[#programacion](https://github.com/jucardus/jucardus.github.io/blob/main/p/r/programacion.md)

<sup>25-10-27 11:53:16</sup>
