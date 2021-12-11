
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
const searchEl=document.querySelector('#movies-searchable');

/* this is what we want for output
<div class="movie">
<section class="section">
<img
src="..." <--- this will need to be changed dynamically
alt="..."<--- this will need to be changed dynamically
movie-id="557" <--- this will need to be changed dynamically
/>
<img
src="..." <--- this will need to be changed dynamically
alt="..."<--- this will need to be changed dynamically
movie-id="556"<--- this will need to be changed dynamically
/>
</section>
<div class="content">
<p id="content-close>X</p>
</div>
</div>
*/

//dynamic values
function movieSection(movies) {
    return movies.map((movie) => {
        return `
        <h2>Title: ${movie.Title}</h2>
        <br>
        <h2> Year: ${movie.Year}</h2>
        <img src=${movie.Poster} movie-id=${movie.imdbID}/>
        `;
    })
}

//new function to organize data we want
function createMovieContainer(movies){
    const movieElement=document.createElement("div");
    //Validation purposes -- console.log(movieEl);
    movieElement.setAttribute('class', 'movie');

    /*declare new variable, using backticks
    looping through every single movie with map */
    img_list = movieSection(movies);
    const movieTemplate = 
    `<section class="section">
    
    ${img_list.join("")}  //join takes the array and converts it to a string to remove commas between 
    ${movieSection(movies)}
    </section>
    <div class="content">
    <p id="content-close>X</p>
    </div>
    `;


 movieElement.innerHTML = movieTemplate;
 return movieElement;

}

/* create new function to render data */
function SearchMovies(data) {
const movies = data.Search; //get the value from "search"
const movieBlock = createMovieContainer(movies);
searchEl.appendChild(movieBlock);
//Validation purposes, can see data also from dev tools in browser
console.log("Data:", data);
}

/* when user clicks on search button */
buttonEl.onclick=function(event) {
    //prevent any default actions browser is doing, like refresh page after submit button
    event.preventDefault();
    //store user input for future use
    const value = inputEl.value;
   // Validation purposes -- console.log("Value:", value);
   //if user tries to search with empty value, error msg pop up
   if (inputEl.value == "") {
    alert("You cannot search with empty value.");
   }
    //combine url + user Input + api key, to create url to search from 
    const newUrl = url + value + API_KEY;

    //AJAX the new way – Fetch API -Built in JS feature
    fetch(newUrl) // pass where you want to get data
    .then((res) => res.json()) //convert and return JSON
    .then((data) =>{
        const movies = data.Search; //get the value from "search"
        const movieBlock = createMovieContainer(movies);
        searchEl.appendChild(movieBlock);
        console.log("Data:", data);
        
    })
    .catch((error) =>{ //in case of an error
        console.log("Error:", error);
    }); 

    inputEl.value = ""; // empty user input after user click on the buttonel
    // Validation purposes -- console.log("hello");
}