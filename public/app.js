const myKey = "f9008ad213e64ee640c0cfdfb9b3c884";
const searchBar = document.getElementById("searchBar");
const submitButton = document.getElementById("submit");
const convertButton = document.getElementById("convert");
const clearButton = document.getElementById("clear");

submitButton.addEventListener("click", () =>{
    let input = searchBar.value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}&units=imperial`)
        .then(response => {
            return response.json();
        })
        .then(displayResults)
        
    let content = document.getElementById("content")    

    content.style.display = "block";
});

function displayResults(response){ 
    //console.log(response);
    let data = response;
    let city = document.querySelector(".card-city");
    let temp = document.querySelector(".card-temp");
    let high = document.querySelector(".card-high");
    let low = document.querySelector(".card-low");
    let desc = document.querySelector(".card-desc");

    city.innerHTML = `<h2 class="card-title">${data.name}, ${data.sys.country}</h2>`
    temp.innerHTML = `<div>Current Tempurature: ${Math.round(data.main.temp)}</div>`
    high.innerHTML = `<div>High of ${Math.round(data.main.temp_max)}</div>`
    low.innerHTML = `<div>Low of ${Math.round(data.main.temp_min)}</div>`
    desc.innerHTML = `<div>${data.weather[0].description}</div>`

    convertButton.addEventListener("click", (e) => {
        let celsiusTemp = (data.main.temp -32) * (5 / 9);
        let celsiusHigh = (data.main.temp_max -32) * (5 / 9);
        let celsiusLow = (data.main.temp_min -32) * (5 / 9);
        let tempSpan = document.getElementById("tempSpan")

        if(tempSpan.textContent !== "Celsius"){
            tempSpan.textContent = "Celsius";
            temp.innerHTML = `<div>Current Tempurature: ${Math.round(data.main.temp)}</div>`
            high.innerHTML = `<div>High of ${Math.round(data.main.temp_max)}</div>`
            low.innerHTML = `<div>Low of ${Math.round(data.main.temp_min)}</div>`
        }
        else{
            tempSpan.textContent = "Fahrenheit";
            temp.innerHTML = `<div>Current Tempurature: ${Math.round(celsiusTemp)}</div>`
            high.innerHTML = `<div>High of ${Math.round(celsiusHigh)}</div>`
            low.innerHTML = `<div>Low of ${Math.round(celsiusLow)}</div>`
        }
    })    

    clearButton.addEventListener("click", (e) => {
        e.preventDefault();
  //    content.style.display = "none";
        searchBar.value = "";
        location.reload();
    });
}

