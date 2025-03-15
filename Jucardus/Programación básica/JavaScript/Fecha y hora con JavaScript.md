## Fecha y hora con JavaScript

```
function fecha() {
  var date = new Date();
  var year = date.getYear();
  var month = date.getMonth() + 1; if(month.toString().length==1){var month = '0'+month;}
  var day = date.getDate(); if(day.toString().length==1){var day = '0'+day;}
  var hour = date.getHours(); if(hour.toString().length==1){var hour = '0'+hour;}
  var minu = date.getMinutes(); if(minu.toString().length==1){var minu = '0'+minu;}
  var seco = date.getSeconds(); if(seco.toString().length==1){var seco = '0'+seco;}
  //var fecha = year+'·'+month+'·'+day+'·'+hour+'·'+minu+'·'+seco;
  var fecha = year+'·'+month+'·'+day;
  var fecha = fecha.slice(1);
  Logger.log(fecha);
}
```
