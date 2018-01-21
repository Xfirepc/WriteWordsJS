'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = platzom;
function platzom(str) {

  var miMay = function miMay(str) {
    return str.split('').map(function (value, key) {
      return key % 2 == 0 ? value.toUpperCase() : value.toLowerCase();
    }).join("");
  };

  var reverse = function reverse(str) {
    return str.split('').reverse().join('');
  };
  if (str == reverse(str)) {
    return miMay(str);
  }

  var translation = str;
  //Si termina en AR se le resta esos caracteres
  if (str.toLowerCase().endsWith('ar')) {
    translation = str.slice(0, -2);
  }
  //Si la palabra termina en Z se le agrega pe al final
  if (str.toLowerCase().startsWith('z')) {
    translation += 'pe';
  }
  //Si tiene mas de 10 letras unir con un gion a la mitad de la palabra
  var length = translation.length;

  if (length >= 10) {
    var fisrtHalf = translation.slice(0, Math.round(length / 2));
    var secondHalf = translation.slice(Math.round(length / 2));
    translation = fisrtHalf + ' - ' + secondHalf;
  }

  return translation;
}