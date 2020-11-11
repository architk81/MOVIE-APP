const API_key = '0e37ced621b24718001d3e9368560472';
const IMG_url = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=0e37ced621b24718001d3e9368560472'


// selecting the elements for the DOM
const ButtonElement = document.querySelector('#search');
const InputElement = document.querySelector('#inputValue');
const MovieSearchable = document.querySelector('.movieSearchable');
const Movies_container = document.querySelector('.movie_container');



function generateurl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=0e37ced621b24718001d3e9368560472`
    return url;
}



function movie_section(movies) {
    return movies.map((movies) => {
        if (movies.poster_path) {
            return `<img src=${IMG_url + movies.poster_path} data-movie-id = ${movies.id}/> `;
        }
    })
}


// displaying the movies images
function movie_creator(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    const title = 'Your Search';
    const movieTemplate = 
    `<h2>${title}</h2>
    <section class = "section">
        ${movie_section(movies)}
      </section>
      <div class = "content">
        <p id="content-close">X</p>
      </div>`;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}



function movie_creator_2(movies ,title) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    const movieTemplate = 
    `<h2>${title}</h2>
    <section class = "section">
        ${movie_section(movies)}
      </section>
      <div class = "content">
        <p id="content-close">X</p>
      </div>`;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}



// displaying the movie videos
function createiframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 300;
    iframe.height = 300;
    iframe.allowFullscreen = true;
    return iframe;
}


// function for getting the upcoming movie

function getUpcoming_movie(){
    const path = `/movie/upcoming`;
    const url = generateurl(path);
    const text = 'Up Coming Movies'
    fetch(url).then((api_data) => {
        return api_data.json();
    })        
    .then((actual_data) => {
        const movies = actual_data.results;
        const movieBlock = movie_creator_2(movies , text);
        Movies_container.appendChild(movieBlock);
        console.log(actual_data);
    })
    .catch((error) => {
        console.log(`Error is :- ${error}`);
    })
}

// function for getting the top rated movie

function top_rated_movies(){
    const path = `/movie/top_rated`;
    const url = generateurl(path);
    const text = 'Top Rated Movies';
    fetch(url).then((api_data) => {
        return api_data.json();
    })        
    .then((actual_data) => {
        const movies = actual_data.results;
        const movieBlock = movie_creator_2(movies , text);
        Movies_container.appendChild(movieBlock);
        console.log(actual_data);
    })
    .catch((error) => {
        console.log(`Error is :- ${error}`);
    })
}

// function for geting the popular movies

function popular_movies(){
    const path = `/movie/popular`;
    const url = generateurl(path);
    const text = 'Most Popular Movies';

    fetch(url).then((api_data) => {
        return api_data.json();
    })        
    .then((actual_data) => {
        const movies = actual_data.results;
        const movieBlock = movie_creator_2(movies , text);
        Movies_container.appendChild(movieBlock);
        console.log(actual_data);
    })
    .catch((error) => {
        console.log(`Error is :- ${error}`);
    })
}



// adding event on clicking the submit button


ButtonElement.onclick = function (event) {

    event.preventDefault();
    const value = InputElement.value;

    // for making the specific search
    const path = '/search/movie';
    const newurl = generateurl(path) + '&query=' + value;

    fetch(newurl).then((api_data) => {
        return api_data.json();
    })        
    .then((actual_data) => {
        MovieSearchable.innerHTML = '';
        const movies = actual_data.results;
        const movieBlock = movie_creator(movies);
        MovieSearchable.appendChild(movieBlock);
        console.log(actual_data);
    })
    .catch((error) => {
        console.log(`Error is :- ${error}`);
    })

    InputElement.value = ' ';
    // console.log('Value : ', value);
}




// Event delegation


document.onclick = function(event) {

    const target = event.target;
    // console.log(target);

    if(target.tagName.toLowerCase() === 'img'){

        const movieid = target.dataset.movieId;
        // console.log(movieid);
        const section = event.target.parentElement; // section
        const content = section.nextElementSibling; // event
        content.classList.add('content-display');



        // fetching the movie video 


        const path = `/movie/${movieid}videos`;
        const url = generateurl(path);

        fetch(url).then((api_data)=>{
            return api_data.json();
        })
        .then((actual_data)=>{
            // console.log(url);
            content.innerHTML = '<p id="content-close">X</p>';
            const videos = actual_data.results;
            const len = videos.length > 4 ? 4 : videos.length;
            const iframecontainer = document.createElement('div');

            for(let i=0; i<len ; i++){
                const video = videos[i];
                const iframe = createiframe(video);
                iframecontainer.appendChild(iframe);
                content.appendChild(iframecontainer);
            }
        })
        .catch((error)=>{
            console.log(`Error is :- ${error}`);
        })



    }
    else if(target.id === 'content-close'){


        const content = target.parentElement;
        content.classList.remove('content-display');


    }
}

// getting the upcoming movies
getUpcoming_movie();
// top rated movies
top_rated_movies();
// popular movie
popular_movies();