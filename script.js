let weather = {
    apiKey: "bbca95e7a4ebab533c473d70cc5af4e0",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, temp_min, temp_max, pressure, feels_like } = data.main;
        const { speed } = data.wind;
        const { visibility } = data;

        document.querySelector(".temp_max").innerText = "Maximum Temperature: " + temp_max + "°C";
        document.querySelector(".temp_min").innerText = "Minimum Temperature: " + temp_min + "°C";
        document.querySelector(".feels_like").innerText = "Body temperature: " + feels_like + "°C";
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + "hpa";
        document.querySelector(".visibility").innerText = "Visibility: " + visibility + "m(max: 10km)";


    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Denver");