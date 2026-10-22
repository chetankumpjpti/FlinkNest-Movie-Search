
const box = document.querySelector(".img_container");
const img = document.querySelectorAll(".img_container img");

const slideTitle = document.querySelector("#slideTitle");



// slider

const titles = [
    "Spider-Man: Brand New Day",
    "Digger",
    "Obsession",
    "The Pitt",
    "Discloser Day",
    "Backrooms",
    "Project Hail Mary"
];

let count = 0;

function next() {
    count++;

    if (count >= img.length) {
        count = 0;
    }

    box.style.transform = `translateX(-${count * 100}%)`;
    slideTitle.textContent = titles[count];

}

function prev() {
    count--;

    if (count < 0) {
        count = img.length - 1;
    }

    box.style.transform = `translateX(-${count * 100}%)`;
    slideTitle.textContent = titles[count];
}

// Movie Cards

const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH ="https://image.tmdb.org/t/p/w1280";

const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieContainer = document.querySelector(".trending");
const button = document.querySelector(".input_section i");
const input = document.querySelector(".input_section input");

function skeleton() {
    movieContainer.innerHTML = "";
    for (let i = 1; i <= 9; i++) {
        movieContainer.innerHTML += ` <div class="skeleton">
        <div class="skeleton-img"></div>
        <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        </div>
        </div>`
    }
}


function showMovies(movies){
    movieContainer.innerHTML=""
    if(movies.length == 0){
        return movieContainer.innerHTML = `<h3>No Movies Found </h3>`
    }
    movies.forEach((movie , index) => {
        const { title, poster_path, release_date, vote_average } = movie;
        const card = document.createElement("div")
        card.classList.add("movie_card")
        card.innerHTML = `<img src="${IMGPATH + poster_path}" alt="${title || "Movie poster"}">

    <div class="img_content">
        <a>${title}</a>
        <div class="movie_info">
            <p>${release_date || "Release date unavailable"}</p>
            <span>
                <i class="fa-solid fa-star"></i>
                ${vote_average?.toFixed(1) ?? "N/A"}
            </span>
        </div>
    </div>`
          movieContainer.append(card)
    });

}

function showError(){
    movieContainer.innerHTML = ""
    movieContainer.innerHTML = `<p>Something went wrong</p>`
}

async function loadTranding(){
    try{
        skeleton() 
        const response = await fetch(APIURL)
        if(!response.ok){
        throw new Error("something went wrong");
    }
    const data = await response.json()
    showMovies(data.results)
}
    catch (error){
    console.log(error)
    showError()
}

}
    loadTranding()

    button.addEventListener("click" , async ()=>{
        const query = input.value.trim()
        if(query ==""){
            return loadTranding()
        }
        try{
            skeleton()
            const response = await fetch(SEARCHAPI + query)
            if(!response.ok){
                throw new Error("something went wrong");
            }
            const data = await response.json()
            showMovies(data.results)
        }
        catch (error){
            console.log(error)
            showError()
        }
    })

    input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        button.click();
    }
});

// FAQs
const Show_icon = document.querySelectorAll(".question")

for(let title of Show_icon){
    title.addEventListener("click", ()=>{
    const FAQnext = title.querySelector("p")

    for(let item of Show_icon){
        const p = item.querySelector("p")

        if(p !== FAQnext){
            p.style.height = "0px";
            p.classList.remove("open");
        }
    }
    if (FAQnext.classList.contains("open")) {
            FAQnext.style.height = "0px";
            FAQnext.classList.remove("open");
        } else {
            FAQnext.style.height = FAQnext.scrollHeight + "px";
            FAQnext.classList.add("open");
        }
})
}

