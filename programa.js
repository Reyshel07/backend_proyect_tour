let nombre = 'Juan';
// console.log(nombre);

//
let a = 10;
let b = 25;
// console.log(a*b);




// console.log(user.nombre);

let edad = 12;
// if (edad >= 18) {
//     console.log("Eres mayor de edad");
// } else {
//     console.log("Eres menor de edad");
// }

// for (let i = 1; i <= 10; i++){
//     console.log(i);
// }

function suma(a, b){
    return a +b;
}

console.log(suma(4, 5));

let numeros = [1,2, 3,4,5];
numeros.push(6);
let pares = numeros.filter(
    function(n){
        return n % 2 === 0;
    }
    // n => n % 2 === 0
);

console.log(numeros);
console.log(pares);

//JSON
let user = {
    nombre: "Pepe",
    edad: 22,
    apellido: "Rodirguez",
}


let userJSON = JSON.stringify(user);

let userJSON2 = JSON.parse(userJSON);

console.log(user);
console.log(userJSON);
// console.log(userJSON2);


const read = require('readline')

const view = read.createInterface({
    input: process.stdin,
    output: process.stdout
});

view.question('Que edad tienes?', (edad) => {
    console.log(`Tienes ${edad}`);
});