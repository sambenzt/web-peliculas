const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const url = `https://api.themoviedb.org/3/movie/${id}?api_key=819b7c86c8607512f0fdebc52441505d`

fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(response){

        if(response.id){ //guarda solo si existe la pelicula
            
            //agregar la info en el html
    
            const agregarFavoritos = document.querySelector('#agregarFavoritos');
    
            agregarFavoritos.addEventListener('click', function(e){
                e.preventDefault();
                guardarPeliculas(response);
            });
        }
        
    })
    .catch(function(error){
        alert('No se encontró la pelicula')
    })

function obtenerPeliculas(){

    let peliculas = localStorage.getItem('peliculas');

    if(peliculas != null) {
        return JSON.parse(peliculas);
    }
    else {
        return [];
    }
}


function guardarPeliculas(pelicula){

    let peliculas = obtenerPeliculas();

    //verificar que la pelicula no se haya guardado anteriormente
    let existe = false;
    
    for(let i = 0; i < peliculas.length; i++){
        if(pelicula.id == peliculas[i].id) {
            existe = true;
        }
    }

    if(!existe) {
        peliculas.push(pelicula);
        let peliculasString = JSON.stringify(peliculas);
        localStorage.setItem('peliculas', peliculasString);
    }
}
