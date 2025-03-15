## Extracción del dominio de una URL con JavaScript

```
var dominio = c.slice(c.indexOf('://') + 3);
if (dominio.indexOf('/') >= 0) {
  var dominio = dominio.slice(0,dominio.indexOf('/'));
} else {var dominio = dominio;}
```
