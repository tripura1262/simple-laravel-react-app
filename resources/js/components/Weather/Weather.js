import React, { useState } from "react";
import { BASE_URL } from "../../services";

function Weather() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const search = (evt) => {
        if (evt.key === "Enter") {
            axios
            .get(`${BASE_URL}/api/weather?q=${query}&units=metric`)
            .then((response) => {
                setWeather(response.data);
                setQuery("");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };

    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div>
            <h1> Weather </h1>
            <div
                className={
                    typeof weather.main != "undefined"
                        ? weather.main.temp > 16
                            ? "weather-app warm"
                            : "weather-app"
                        : "weather-app"
                }
            >
                <main>
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                            onKeyPress={search}
                        />
                    </div>
                    {typeof weather.main != "undefined" ? (
                        <div>
                            <div className="location-box">
                                <div className="location">
                                    {weather.name}, {weather.sys.country}
                                </div>
                                <div className="date">
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}°c
                                </div>
                                <div className="weather">
                                    {weather.weather[0].main}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </main>
            </div>
        </div>
    );
}

export default Weather;
