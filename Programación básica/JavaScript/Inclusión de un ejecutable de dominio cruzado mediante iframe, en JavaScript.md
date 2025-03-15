## Inclusión de un ejecutable de dominio cruzado o mixto mediante iframe, en JavaScript

```
<div id="mostrar"></div>

<iframe style="display: none;" src="https://script.google.com/macros/s/AKfycbyBTLnBKjjw.../exec?q=abacus"></iframe>

<script>
  document.getElementById("mostrar").innerHTML = "<div id='previo'>b u s c a n d o . . .</div>";
  window.addEventListener( "message", function (e) {
    if (e.origin == "https://script.google.com/macros/s/AKfycbyBTLnBKjjw.../exec?q=abacus"){ return; }
      var data = e.data;
      document.getElementById("mostrar").innerHTML = data;
  }, false);
</script>
```
