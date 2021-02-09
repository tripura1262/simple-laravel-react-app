import React, { useState } from "react";
import HTTP from './../../Http'

export default function Weather() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const search = (evt) => {
        let isMounted = true;
        if (evt.key === "Enter") {
            HTTP
                .get(`api/weather?q=${query}&units=metric`)
                .then((response) => {
                    if (isMounted) {
                        setWeather(response.data);
                        setQuery("");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        return () => { isMounted = false };
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
        <>
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

        </>
    );
}