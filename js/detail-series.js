//PRIMERO NECESITO OBTENER EL ID DE LA SERIE QUE VIENE POR QUERY STRING
const urlParams = new URLSearchParams(window.location.search);
const id_serie = urlParams.get('id');
const url_imagen = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';

//BUSCAR LA SERIE EN LA API USANDO EL ID DE LA SERIE Y API KEY
let url = `https://api.themoviedb.org/3/tv/${ id_serie }?api_key=819b7c86c8607512f0fdebc52441505d&language=en-US&page=1`;

fetch(url)
    .then(function(respuesta) {
       return respuesta.json();
    })
    .then(function(respuesta){

        //VOY PONIENDO LOS VALORES EN CADA EIIQUETA HTML

        document.getElementById('fotoSerie').src = url_imagen + respuesta.backdrop_path;
        
        document.getElementById('tituloSerie').innerText = respuesta.name;

        document.getElementById('sinopsisSerie').innerText = respuesta.overview;
        
        let generos = respuesta.genres;
        let links = '';

        for(let i = 0; i < generos.length; i++) {

            let genero = generos[i];
            links = links + `<a class="redireccionGenero" href="detail-genres.html"> ${ genero.name } </a>`

        }

        document.getElementById('generosSerie').innerHTML = 'Pertenece al genero de ' + links

        document.getElementById('duracionSerie').innerText = `Duracion: ${ respuesta.episode_run_time[0] }  m`;

        document.getElementById('estrenoSerie').innerText = 'Fecha de estreno: ' + respuesta.first_air_date
        
        document.getElementById('calificacionSerie').innerText = `Calificacion: ${respuesta.vote_average}/10`;
    })
    .catch(function(e){
        document.getElementsByClassName('cajaSeries')[0].style.display = 'none';
        document.getElementById('noHaySerie').style.display = 'block';
    });