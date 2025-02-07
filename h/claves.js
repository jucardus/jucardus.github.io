function generar() {
  let array = ['&#94;','&#94;','&#33;','&#33;','&#35;','&#35;','&#37;','&#37;','&#38;','&#38;','&#40;','&#40;','&#41;','&#41;','&#42;','&#42;','&#64;','&#64;','&#36;','&#36;','0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var desde = 10;
  var hasta = 60;
  var resultado1 = desordenar(array).slice(desde,hasta).join('');
  var resultado2 = desordenar(array).slice(desde,hasta).join('');
  var resultado3 = desordenar(array).slice(desde,hasta).join('');
  var resultado4 = desordenar(array).slice(desde,hasta).join('');
  var resultado5 = desordenar(array).slice(desde,hasta).join('');
  var resultado6 = desordenar(array).slice(desde,hasta).join('');
  var resultado7 = desordenar(array).slice(desde,hasta).join('');
  var resultado8 = desordenar(array).slice(desde,hasta).join('');
  var resultado9 = desordenar(array).slice(desde,hasta).join('');
  var resultado0 = desordenar(array).slice(desde,hasta).join('');
  document.getElementById('mostrar').innerHTML = resultado1 + resultado2 + resultado3 + resultado4 + resultado5 + resultado6 + resultado7 + resultado8 + resultado9 + resultado0;
}
function desordenar(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
