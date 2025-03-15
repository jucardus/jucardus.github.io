## Ordenar una matriz aleatoriamente con JavaScript

```
function ordenar_array_aleatoriamente() {
  let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  var mostrar = list.sort(() => Math.random() - 0.5)
  Logger.log(mostrar.toString());
}
```
