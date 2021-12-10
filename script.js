
//Initial values
//ApiKEY for OMDB API "e3f0b9ab"
const API_KEY = "&apikey=e3f0b9ab";
const url="https://omdbapi.com/?s=";
//Title parameter s : https://omdbapi.com/?s= + "SEARCHTERM" + &apikey=e3f0b9ab
//IMDb ID parameter i : http://www.omdbapi.com/?i=tt + ID " + &apikey=e3f0b9ab
//Avengers example : https://omdbapi.com/?s=avengers&apikey=e3f0b9ab

//Selecting elements from DOM
const buttonEl=document.querySelector('#search');
const inputEl=document.querySelector('#userInput');

/* this is what we want for output
<div class="movie">
<section class="section">
<img
src="..." <--- this will need to be changed dynamically
alt="..."<--- this will need to be changed dynamically
data-movie-id="557" <--- this will need to be changed dynamically
/>
<img
src="..." <--- this will need to be changed dynamically
alt="..."<--- this will need to be changed dynamically
data-movie-id="556"<--- this will need to be changed dynamically
/>
</section>
<div class="content">
<p id="content-close>X</p>
</div>
</div>
*/

//new function to organize data we want
function displayMovies(movies){
    const movieEl=document.createElement("div");
    movieEl=setAttribute("class", "movie");

    /*declare new variable, using backticks
    looping through every single movie with map*/
    const movieTemplate = ` 
<section class="section">
 $ {movies.map((movie) =>
    return `
    <img src=${movie.poster} data-movie-id/>
    `;
    )}
</section>
<div class="content">
<p id="content-close>X</p>
</div>

    
    `

}

//when user clicks on search button
buttonEl.onclick=function(event) {
    //prevent any default actions browser is doing
    event.preventDefault();
    //store user input for future use
    const value = inputEl.value;
    //combine url + user Input + api key, to create url to search from 
    const newUrl = url + value + API_KEY

    //AJAX the new way – Fetch API -Built in JS feature
    fetch(newUrl) // pass where you want to get data
    .then((res) => res.json()) //convert and return JSON
    .then((data) =>{
        console.log("Data:", data);
    })
    .catch((error) =>{ //in case of an error
        console.log("Error:", error);
    }); 

    // Validation purposes -- console.log("Value:", value);
    // Validation purposes -- console.log("hello");
}