const canciones = [

{
titulo:"Luces de Colores",
artista:"Omar Courtz",
audio:"cancion1.mp3",
portada:"portada1.jpg"
},

{
titulo:"Baila Baila Baila Remix",
artista:"Ozuna",
audio:"cancion2.mp3",
portada:"portada2.jpg"
},

{
titulo:"Imitadora",
artista:"Romeo Santos",
audio:"cancion3.mp3",
portada:"portada3.jpg"
},

{
titulo:"El Farsante",
artista:"Ozuna",
audio:"cancion4.mp3",
portada:"portada4.jpg"
},

{
titulo:"Pero No Te Enamores",
artista:"Fuerza Regida",
audio:"cancion5.mp3",
portada:"portada5.jpg"
}

];

let indice = 0;

const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const portada = document.getElementById("portada");
const progreso = document.getElementById("progreso");
const tiempo = document.getElementById("tiempo");
const volumen = document.getElementById("volumen");

function actualizarPlaylist(){

    let items = document.querySelectorAll("#listaCanciones li");

    const nombres = [
        "Luces de Colores - Omar Courtz",
        "Baila Baila Baila Remix - Ozuna",
        "Imitadora - Romeo Santos",
        "El Farsante - Ozuna",
        "Pero No Te Enamores - Fuerza Regida"
    ];

    items.forEach((item, posicion) => {

        item.classList.remove("activa");
        item.innerHTML = nombres[posicion];

    });

    items[indice].classList.add("activa");

    items[indice].innerHTML =
        "▶ " +
        canciones[indice].titulo +
        " - " +
        canciones[indice].artista;

}

function cargarCancion(){

    audio.src = canciones[indice].audio;

    titulo.innerText = canciones[indice].titulo;
    artista.innerText = canciones[indice].artista;
    portada.src = canciones[indice].portada;

    progreso.value = 0;
    tiempo.innerText = "0:00 / 0:00";

    actualizarPlaylist();

}

function reproducirActual(){

    cargarCancion();

    audio.load();

    audio.onloadeddata = () => {

        audio.play();

        portada.classList.add("girando");

    };

}

function playPause(){

    if(audio.paused){

        audio.play();

        portada.classList.add("girando");

    }else{

        audio.pause();

        portada.classList.remove("girando");

    }

}

function siguiente(){

    indice++;

    if(indice >= canciones.length){
        indice = 0;
    }

    reproducirActual();

}

function anterior(){

    indice--;

    if(indice < 0){
        indice = canciones.length - 1;
    }

    reproducirActual();

}

function seleccionarCancion(posicion){

    indice = posicion;

    reproducirActual();

}

function aleatorio(){

    indice = Math.floor(
        Math.random() * canciones.length
    );

    reproducirActual();

}

audio.addEventListener("loadedmetadata", () => {

    let total =
        Math.floor(audio.duration / 60) + ":" +
        String(Math.floor(audio.duration % 60)).padStart(2,'0');

    tiempo.innerText = "0:00 / " + total;

});

audio.addEventListener("timeupdate", () => {

    if(audio.duration){

        progreso.value =
        (audio.currentTime / audio.duration) * 100;

        let actual =
            Math.floor(audio.currentTime / 60) + ":" +
            String(Math.floor(audio.currentTime % 60)).padStart(2,'0');

        let total =
            Math.floor(audio.duration / 60) + ":" +
            String(Math.floor(audio.duration % 60)).padStart(2,'0');

        tiempo.innerText =
            actual + " / " + total;

    }

});

progreso.addEventListener("input", () => {

    if(audio.duration){

        audio.currentTime =
        (progreso.value / 100) * audio.duration;

    }

});

volumen.addEventListener("input", () => {

    audio.volume = volumen.value;

});

audio.addEventListener("ended", () => {

    siguiente();

});

cargarCancion();