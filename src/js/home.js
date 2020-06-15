console.log('hola mundo!');
// con const vamos a declarar variables que no vana  cambiar en el tiempo o tambien denominadas constantes
const nocambia= 'christopher';
// let nos va a servir para declarar variables que vayan a cambiar con el tiempo
let cambia = '@chriispg';
// se declara una funcion con la palabra reservada function, luego el cambiarnombre sera el nombre
// que le estamos asignando a la funcion y por ultimo nuevo nombre sera el nombre del parametro o 
// nombre del argumento que le estamos asignando
function cambiarnombre(nuevonombre){
  cambia=nuevonombre
}

const getuser= new Promise(function(todobien, todomal){
  // llamar a un api esto demora un tiempo y no lo sabemos
  // oo tambien podemos forzar el proceso con un delay de tiempo y se llamar timers dentro de jv
// setinterval es una funcion de js que se va a a ejecutar cada cierto tiempo
// setInterval
// setimeoput es una funcionn que se va a ejecutar una sola vez en determinado tiempo
// este va a recibir 2 parametros y el primero sera una funcion y el segundo parametro que va luego de la coma
// va a ser un tiempo en milisegundos  que va a tomarse el settimeout en ejecutar la primera funcion
  setTimeout(function(){
// luego de 3 segundos se ejecutara esto
// como todomal es una funcion el parametro "se acabo el tiempo" lo estamos enviando al .catch que genera una funcion
// que el parametro message va a tomar el parametro de todomal y que con el console.log estamos mandando a imprimir
// dicho message='seacabo el tiempo'
    todobien('se acabo el tiempo 3');
  }, 3000)
})
const getuserall= new Promise(function(todobien, todomal){
  setTimeout(function(){
    todobien('se acabo el tiempo 5');
  }, 5000)
})
// getuser
// el then se utiliza cuando la promesa se resuelve de la manera correcta
//     .then(function(){
//       console.log('todo esta bien en la vida')
//     })
// // el catch se utiliza cuando mi promesa falla y no se resuelve de la manera correcta
//     .catch(function(message){
//       console.log(message);
//     })
// con all puedo enviar muchas peticiones muchas promesas y all es una funcion que va a recibir un array[] que es una
// lista 
    // Promise.all([
// con promise.race se mostrara la promesa que se resuelva primero en este caso sera la promera que tiene
// 3000 por que es menos que 5000 osea getuserall
    Promise.race([
      getuser,
      getuserall,
    ])
    .then(function(message){
      console.log(message);
    })
    .catch(function(message){
      console.log(message)
    })
// para traerun jquery se hace con $.ajax('url', { monton de parametros})
    $.ajax('https://randomuser.me/api/', {
// el metodo de por donde estoy trayendo cosas, si estoy trayendo algo de un servidor podemos usar method: 'GET'
// si estoy creando una clase, comentario, video cualquier cosa seria en este caso POST
      method: 'GET',
      // este function se va a llamar cuando todo este bien o cuando no haya devuelto datos del ajax
      success: function(data){
        console.log(data)
      },
      error: function(error){
        console.log(error)
      }
    })
    // todo esto de arriba se llama XMLHttpRequest que sirve para traer datos desde un servicio externo

// el comando que usaremos en js ya no en jquery sera una que se llamara fetch
// se hace igual el fetch lleva 2 parametros que son la url y luego la configuracion, si no ponemos configuracion
// va a hacer la por defecto que en este caso es utilizar GET
// tambien el FETCH lo que va es a devolverme una promesa por eso aprender bien el then y catch
// con solo esto estamos trayendo un usuario random con mucho menos codigo que el que teniamos en el jquery
// y con la ventaja de que esto podemos probarlo en la consola de google en cambio el jquery no podemos probarlo ahi
fetch('https://randomuser.me/api/')
.then(function(response){
  console.log(response)
  return response.json()//con este return estamos volviendo al fetch('https://randomuser.me/api/')
})

.then(function(user){
  console.log('user', user.results[0].name.first)//estoy mandando a traer el objeto 0 del array y demas, con esto estamos mandando a imprimir el primer nombre
})//este then va a reaccionar cuando se acabe de resolver la promesa del response.json()
.catch(function(){
  console.log('algo fallo')
});
// con el async puedo hacer una funcion para que tenga una manera de leerse mas sincrona
(async function load(){
// con el await que e suna palabra reservada para async que await va a estar simplemente para esperar las peticiones
// de mi API
  // await 
  // estoy copianda la api desde su pagina y agregando el ?genre=action estoy mandando a buscar el parametro de accion
  // con el await estoy mandando al await que se inicie una vez que el fetch termine de buscar lo que esta en la api
  // y una vez que acabe, se va a ejecutar lo que venga en las siguientes lineas
  // accion
  // terror
  // animation
  async function getdata(url){
    const response = await fetch(url);
    const data= await response.json();
    if (data.data.movie_count > 0){
      // aqui se termina mi funcion
      return data;//aca estamos retornando un objeto la respuesta del fetch que serian los datos de las peliculas
    }
    // si no hay pelis aqui continua
    // con new creo el mensaje no se encontro ningun resultado y con throw lo mando a imprimir en el navegador
    throw new Error('no se encontro ningun resultado');
    return data
  }
  const $form = document.getElementById('form');
  const $home = document.getElementById('home');
  const $featuringcontainer = document.getElementById('featuring');


  function setAttributes($element, attributes){
    for (const unatributo in attributes){
      $element.setAttribute(unatributo, attributes[unatributo])
    }
  }
  const BASE_API = 'https://yts.mx/api/v2/';

  function featuringTemplate(peli){
    return(
      `
      <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
      `
    )
  }
  $form.addEventListener('submit', async(event)=>{
    // con esto evitamos que se recargue la pagina cada vez que mandemos a buscar algo
    event.preventDefault();
    // con esto estamos agregando la clase search-active en el form del html
    $home.classList.add('search-active')
    const $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width:50,
    })
    $featuringcontainer.append($loader);

    const data = new FormData($form);
    try {
      const {
        data: {//con esta nueva llave estamos entrando dentro de data donde conseguiremos movies
          movies: pelis //aqui ya estamos asignandole a la ruta movies el nombre de pelis
        }
      } = await getdata(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
  
      const HTMLString = featuringTemplate(pelis[0]);
      $featuringcontainer.innerHTML = HTMLString;
    } catch(error) {
      alert(error.message);
      $loader.remove();
      $home.classList.remove('search-active')
    }
    //con este const estamos entrando en la ruta peli.data.movies yle estamo asignando el nombre pelis

  })
  function videoitemtemplate(movie, category){
    return(
      //ESTE ES un grupo de lineas del html que me traje de alla, para envonverlo todo, hay que hacerlo con `` 
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    )
  }
  function createTemplate(HTMLString){
    const html = document.implementation.createHTMLDocument();
    // con el inner html todo lo que ponga dentro de las comillas se va a crear dentro de la ruta que le di
    // que es dentro del body por ejemeplo '<p><span>hola</span></p>'
    // pero en este caso estoy agregrando el HTMLString que es el template que se esta creando con cada pelicula
    html.body.innerHTML=HTMLString;
    return html.body.children[0];
  }
  function addEventclick($element){
    // addEventListener('click') lo que hace es escuchar y en este caso escucha el evento click, podemos agregar mas
// con el arrow function'=>' no tenemos por que escribir el function, sirve para los function anonimos
    $element.addEventListener('click', () => {
      // con el alert es el mensaje que soltara el navegador al darle click a una pelicula
      // alert('click')
      showModal($element)
    })
  }
  // con esta funcion estamos reemplazando el actionlist.data.movies
  function renderMovieList (list, $container, category){
    // actionlist.data.movies
    $container.children[0].remove();
    list.forEach((movie)=>{
      const HTMLString = videoitemtemplate(movie, category);
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement);
      const image = movieElement.querySelector('img');
      image.addEventListener('load', (event) =>{
        event.srcElement.classList.add('fadeIn');//sreElement es lo mismo que poner image
      })
      addEventclick(movieElement);
    })
  }

  async function cacheExist(category){
    const listName = `${category}List`
    const cacheList = window.localStorage.getItem('actionName');
    if (cacheExist){
      return JSON.parse(cacheList)
    }
    const {data: {movies : data } } = await getdata(`${BASE_API}list_movies.json?genre=${category}`)
    window.localStorage.setItem(listName, JSON.stringify(data));
    return data;
  }

  // const {data: {movies : actionlist } } = await getdata(`${BASE_API}list_movies.json?genre=action`);
  const actionList = await cacheExist('action');
  
  //let terrorlist;//recordar que al quitar el await me devolvera una promesa por loq ue hay que poner then()
  //  getdata('https://yts.mx/api/v2/list_movies.json?genre=terror')
  //  .then(function(data){
    //    console.log('terrorlist',data);
    //    terrorlist=data;
    //  }) ESTO ES CUANDO SE HARIA CON PROMESAS Y NO CON AWAITS
    // este console.log no se va a ejecutar hasta que los 2 awaits acaben
    // console.log(actionlist, dramalist, animationlist);
    // recordemos como hacer un selector dentro de css .home{color : 'red'}
    //  podemos hacer lo mismo con js y jquery y aqui viene el ejemplo de jq recordar siempre empezar JQ con $
    // con esto estamos llamando a el id home del html y la clase list y esta seria la opcion con jquery
    // const $home = $('.home .list #item')
    // aqui estamos usando vanilla html y llamamos con el getElementById llamamos solo a id's
    //getElementByclass sirve para llamar a la clase
    //getElementBytagname('div') sirve para llamar por ejemplo a todos los divs de mi html
    //.queryselector('.modal') me mostrara la primera clase que encuentre con el .modal
    //queryselectorall('.myPlaylist-item') me traera todas las clases .myPlaylist-item
    const $actioncontainer = document.querySelector('drama');
    // window.localStorage.setItem('actionList', JSON.stringify(actionlist));
    renderMovieList(actionlist, $actioncontainer, 'action');
    
    const dramalist = await cacheExist('action');
    // window.localStorage.setItem('dramalist', JSON.stringify(dramalist));
    const $dramacontainer = document.getElementById('drama');
    renderMovieList(dramalist, $dramacontainer, 'drama');
    
  const animationlist = await cacheExist('animation');
  // window.localStorage.setItem('animationlist', JSON.stringify(animationlist));
  const $animationcontainer = document.getElementById('animation');
  renderMovieList(animationlist, $animationcontainer, 'animation');



  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');
// con esto estamos buscando dentro del id modal el img que tengo dentro
const $modalTittle = $modal.querySelector('h1');
const $modalImage = $modal.querySelector('img');
const $modalDescription = $modal.querySelector('p');
function findById(list, id){
  // si solo voy a retornar/return un objeto en una funcion puedo quitar las llaves y el return que sigue de =>
  // y cuando tengo un arrow function con un solo parametro osea (movie), puedo quitarle los ()
  return list.find(movie => movie.id === parseInt(id, 10))
  
}

function findMovie(id, category){
  switch (category){
    case 'action' : {
      return findById(actionlist, id)
    }
    case 'drama' : {
      return findById(dramalist, id)
    }
    default: {
      return findById(animationlist, id)
    }
  }
}

function showModal($element){
  $overlay.classList.add('active')
  $modal.style.animation = 'modalIn .8s forwards';
  const id = $element.dataset.id;
  const category = $element.dataset.category;
  const data = findMovie(id, category);
  
  $modalTittle.textContent = data.title;
  $modalImage.setAttribute('src', data.medium_cover_image);
  $modalDescription.textContent = data.description_full;
}

  $hideModal.addEventListener('click', hideModal);
  function hideModal(){
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }
})()