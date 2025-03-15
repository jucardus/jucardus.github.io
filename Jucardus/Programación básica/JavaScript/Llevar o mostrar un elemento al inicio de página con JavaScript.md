## Llevar o mostrar un elemento al inicio de página con JavaScript

```
const element = document.getElementById('estrella');
element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
```
