export default function platzom(str){


  const miMay = (str) => str.split('').map( (value,key)=> key % 2==0 ? value.toUpperCase() : value.toLowerCase() ).join("");

  const reverse = (str) =>  str.split('').reverse().join('');
  if (str == reverse(str)) {
    return miMay(str);
  }

  let translation  = str;
  //Si termina en AR se le resta esos caracteres
  if (str.toLowerCase().endsWith('ar')) {
    translation = str.slice(0, -2);
  }
  //Si la palabra termina en Z se le agrega pe al final
  if (str.toLowerCase().startsWith('z')) {
    translation += 'pe';
  }
  //Si tiene mas de 10 letras unir con un gion a la mitad de la palabra
  const length = translation.length;

  if (length >= 10) {
    const fisrtHalf = translation.slice(0, Math.round(length / 2));
    const secondHalf = translation.slice(Math.round(length / 2));
    translation = `${fisrtHalf} - ${secondHalf}`;
  }

  return translation;
}
