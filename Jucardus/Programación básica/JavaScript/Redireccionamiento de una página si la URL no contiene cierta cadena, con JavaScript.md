## Redireccionamiento de una página si la URL no contiene cierta cadena, con JavaScript

```
<script type="text/javascript">
  window.onload = function () {
    if (location.hostname.indexOf('traducciones.one') === -1) {
      location.replace("https://traducciones.one");
    }
  }
</script>
```
