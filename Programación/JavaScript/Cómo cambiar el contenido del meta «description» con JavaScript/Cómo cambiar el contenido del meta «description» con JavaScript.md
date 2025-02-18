## Cómo cambiar el contenido del meta «description» con JavaScript

Con estas dos líneas se puede cambiar el contenido del meta _contents_.

```
let metas = document.getElementsByTagName("meta");
metas.description.content = "Nuevo contenido del meta";
```
