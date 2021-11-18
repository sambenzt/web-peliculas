function obtenerPeliculas(){

    let peliculas = localStorage.getItem('peliculas');

    if(peliculas != null) {
        return JSON.parse(peliculas);
    }
    else {
        return [];
    }
}

const cajaFavoritos = document.querySelector('.cajaPadreFavoritos');

const peliculas = obtenerPeliculas();

let articulos = '';

for(let i = 0; i < peliculas.length; i++) {

    let pelicula = peliculas[i];

    articulos += `
        <article class="listadoPeliculas">
            <a href="../Tp-integrador-/detail-series.html"><img src="https://image.tmdb.org/t/p/w342/${pelicula.backdrop_path}"
                    alt="Portada de Gossip Girl"></a>
            <h3><a href="../Tp-integrador-/detail-series.html"> ${pelicula.original_title}</a></h3>
            <a onclick="eliminar(${pelicula.id})">
                <h4 style="cursor:pointer" class="eliminarPelicula">Quitar de mis favoritos <i class="fas fa-trash-alt"></i></h4>
            </a>
        </article>
    `
}

cajaFavoritos.innerHTML = articulos;

function eliminar(id){ //103
    const peliculas = obtenerPeliculas();

    let indice;

    for(let i = 0; i < peliculas.length; i++) {

        if(id == peliculas[i].id) {
            indice = i;
        }

    }

    if(indice >= 0) {
        peliculas.splice(indice, 1);
        let peliculasString = JSON.stringify(peliculas);
        localStorage.setItem('peliculas', peliculasString);
        location.reload()
    }
}

