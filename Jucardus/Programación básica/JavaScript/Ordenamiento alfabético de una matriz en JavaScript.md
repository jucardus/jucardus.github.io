## Ordenamiento alfabético de una matriz en JavaScript

### Opción simple

```
resultado = resultado.sort();
```

### Opción Unicode

```
array = array.sort((a, b) => a.localeCompare(b)); // ordenar alfabéticamente
array = [...new Set(array)]; // eliminar elementos repetidos
array = array.filter(Boolean); // eliminar elementos vacíos
```
