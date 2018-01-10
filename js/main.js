let app = {
    URL: 'http://api.themoviedb.org/3/',
    INPUT: null,
    init: function () {
        //fetch the config info
        app.INPUT = document.getElementById('search-input');
        app.INPUT.focus();
        //add click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runsearch);
        //listen for return or enter press
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            if (char == 10 || char == 13) {
                //they hit <enter> or <return>
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });

    },
    runsearch: function (ev) {
        ev.preventDefault();
        if (app.INPUT.value) {
            let url = app.URL + "search/movie?api_key=" + KEY;
            url += "&query=" + app.INPUT.value;
            //`${app.URL}search/movie?api_key=${KEY}&query=${app.INPUT.value}`;



            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showMovies(data.results);
                })
                .catch(err => {
                    console.log(err);
                });

        }
    },
    showMovies: function (movies) {
        let section = document.querySelector('#search-results .content');
        console.log(section);
        let df = document.createDocumentFragment();
        section.innerHTML = ""; //clear and get rid of the previous content
        movies.forEach(function (movie) {
            let div = document.createElement('div');
            div.setAttribute('data-movie', movie.id);
            div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            div.textContent = movie.title;
            df.appendChild(div);



            let img = document.createElement('img');
            img.classList.add('poster');
            img.src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
            img.alt = "movie poster";
            div.appendChild(img);
            df.appendChild(div);

            let h4 = document.createElement('h4');
            h4.classList.add('date');
            h4.textContent = movie.release_date;
            div.appendChild(h4);

            let p = document.createElement('p');
            p.classList.add('movie-desc');
            p.textContent = movie.overview;
            div.appendChild(p);

        })
        section.appendChild(df);
    },


    getRecommended: function (ev) {
        let movie_id = ev.target.getAttribute('data-movie');
        console.log(movie_id);
        let url = app.URL + "movie/" + movie_id + "/recommendations?api_key=" + KEY;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                app.showMovies(data.results);
            })
            .catch(err => {
                console.log(err);
            })
    },




};


document.addEventListener('DOMContentLoaded', app.init);

//wait for DOMContentLoaded
//fetch the configuration information for image location and sizes
//focus on the text field
//listen for click on the search button
//listen for keypress <enter> OR <return>

//after the click/<enter> press run a fetch
////results come back from the fetch
//show movie results page
//loop through the results and build <div>s.

//make something in the div clicable
//get the id from the clicable element
//fetch the recommandations based on the movie id
