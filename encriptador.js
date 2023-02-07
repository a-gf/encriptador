const botonEncriptar = document.getElementById("button-encriptar")
const botonDesencriptar = document.getElementById("button-desencriptar")
const botonCopiar = document.getElementById("button-copiar")
const textareaMensaje = document.getElementById("textarea-mensaje")
const seccionResultado1 = document.getElementById("section-resultado-1")
const seccionResultado2 = document.getElementById("section-resultado-2")
const spanResultado = document.getElementById("span-resultado")

const llaveVerificadora = /[^a-z\sñ]/g

const copyContent = async () => {
    let text = spanResultado.innerText
    try {
        await navigator.clipboard.writeText(text);
        alert('Texto copiado al portapapeles', 3000)
        // console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

// let caracteresPermitidos = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"," "]
let llaveEncriptacion = {e:"enter",i:"imes",a:"ai",o:"ober",u:"ufat"}

let texto = ""
let textoSalida = "";
let verificador = false;
// let contadorVerificador = 0;

//capturar texto
botonEncriptar.addEventListener('click', (e)=> {
    capturarTexto()
    verificar = verificarCaracteres()
    if (verificarCaracteres(texto)) {
        encriptar("e",texto)
    }
})

botonDesencriptar.addEventListener('click', (e)=>{
    capturarTexto()
    verificar = verificarCaracteres()
    if (verificarCaracteres(texto)) {
        encriptar("d",texto)
    }
})
function capturarTexto () {
    texto = textareaMensaje.value
}

//Verificador de condiciones con for
// function verificarCaracteres() {
//     contadorVerificador = 0
//     for (let i = 0; i < texto.length; i++) {
//         for (let j = 0; j < caracteresPermitidos.length; j++) {
//             if (texto.charAt(i) == caracteresPermitidos[j]) {
//                 contadorVerificador ++
//                 break;
//             }
//         }
//     }
//     // console.log(contadorVerificador)
//     if (contadorVerificador === texto.length) {
//         verificador = true
//     } else {
//         verificador = false
//         alert("Solo se permiten letras minúsculas sin ningún tipo de acento. Carácteres como: ,.?#$%&/() no están permitidos.")
//     }
//     return verificador
// }

//Verificador de carácteres usando una expresión regular
function verificarCaracteres() {
    if (llaveVerificadora.test(texto)) {
        alert("Solo se permiten letras minúsculas y sin acentos. Carácteres como: ,.?#$%&/() tampoco están permitidos.", 5000)
        texto = ""
        return false
    } else {
        return true
    }
    console.log(verificador)
}

function encriptar (opcion, mensaje) {    
    textoSalida = mensaje
    if (textoSalida.length>0) {
        for (let i in llaveEncriptacion) {
            if (opcion == "e") {
                textoSalida = textoSalida.replaceAll(i,llaveEncriptacion[i])
            } else if (opcion == "d") {
                textoSalida = textoSalida.replaceAll(llaveEncriptacion[i],i)
            }
        }
    }
    spanResultado.innerHTML = textoSalida    
    mostrarResultado()
}

function mostrarResultado() {
    if (textoSalida == "") {
        seccionResultado1.style.display = 'flex';
        seccionResultado2.style.display = 'none';
    } else {
        seccionResultado1.style.display = 'none';
        seccionResultado2.style.display = 'flex';
    }
}
function cargar() {
    seccionResultado1.style.display = 'flex'
    seccionResultado2.style.display = 'none'
}

window.alert = function(message, timeout=null) {
    const alert = document.createElement('div')
    const alertButton = document.createElement('button')
    alertButton.innerText = 'OK'
    alert.classList.add('alert')
    alert.setAttribute('style',`
        position: fixed;
        top: 100px;
        left: 50%;
        padding: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 5px 0 #00000044;
        display: flex;
        flex-direction: column;
        border: 1px solid #333;
        transform: translateX(-50%);
    `)
    alertButton.setAttribute('style', `
        border: 1px solid #333;
        background: white;
        border-radius: 5px;
        padding: 5px;
    `)
    alert.innerHTML = `<span style="padding:10px">${message}</span>`
    alert.appendChild(alertButton)
    alertButton.addEventListener('click', (e)=>{
        alert.remove()
    })
    if(timeout != null){
        setTimeout(()=>{
            alert.remove()
        }, Number(timeout))
    }
    document.body.appendChild(alert)
}

botonCopiar.addEventListener("click", copyContent)
window.addEventListener('load', cargar)
