## Mostrar la parte inicial de una página con JavaScript

### Opción 1

```
const element = document.getElementById('inicio');
element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
```

### Opción 2

```
document.body.scrollTop = 0; // Safari
document.documentElement.scrollTop = 0; // Chrome, Firefox, IE y Opera
```

### Opción 3

```
window.scrollTo(0, 0);
```
