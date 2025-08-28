import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let [weath, setWeath] = useState("");
  let [direction, setDirection] = useState("");
  let [srch, setSrch] = useState("");
  let [city, setCity] = useState("Karachi");
  let [sunRiseTime, setSunRiseTime] = useState("");
  let [sunSetTime, setSunSetTime] = useState("");
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa9978b91d5b6560db0ffa88c6696e01&units=metric`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.cod !== 200) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "City not found!",
          });
          setLoading(false);
          return;
        }

        // Sunrise
        let n = new Date(data.sys.sunrise * 1000);
        setSunRiseTime(
          n.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
        );

        // Sunset
        let m = new Date(data.sys.sunset * 1000);
        setSunSetTime(
          m.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
        );

        // Wind direction
        switch (true) {
          case (data.wind.deg >= 0 && data.wind.deg < 22.5) ||
            (data.wind.deg > 337.5 && data.wind.deg <= 360):
            setDirection("North");
            break;
          case data.wind.deg > 22.5 && data.wind.deg < 67.5:
            setDirection("Northeast");
            break;
          case data.wind.deg > 67.5 && data.wind.deg < 112.5:
            setDirection("East");
            break;
          case data.wind.deg > 112.5 && data.wind.deg < 157.5:
            setDirection("Southeast");
            break;
          case data.wind.deg > 157.5 && data.wind.deg < 202.5:
            setDirection("South");
            break;
          case data.wind.deg > 202.5 && data.wind.deg < 247.5:
            setDirection("Southwest");
            break;
          case data.wind.deg > 247.5 && data.wind.deg < 292.5:
            setDirection("West");
            break;
          default:
            setDirection("Northwest");
        }

        setWeath(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong!",
        });
        setLoading(false);
      });
  }, [city]);

  if (loading) {
    return (
      // <div className="d-flex justify-content-center align-items-center vh-100">
      //   <img src="/loader.gif" alt="Loading..." width="120" />
      // </div>
      <div>
        <div className="spinner-grow text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-secondary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-danger" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-warning" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-info" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-dark" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
      </div>
    );
  }

  if (weath === "") {
    return "...Loading";
  }

  return (
    <div className="container py-5">
      <h1>Open Weather</h1>
      {/* Search Bar */}
      <div className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          value={srch}
          placeholder="Search by city"
          onChange={(e) => {
            setSrch(e.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          disabled={srch === ""}
          onClick={() => setCity(srch)}
        >
          Search
        </button>
      </div>

      {/* Weather Card */}
      <div className="card shadow-lg border-0">
        <div className="card-body text-center">
          <h2 className="card-title mb-3">{weath.name} Weather</h2>
          <h4 className="mb-3">
            {weath.weather[0].main} ({weath.weather[0].description})
          </h4>
          <h1 className="display-4 fw-bold mb-3">
            {weath.main.temp}°C
          </h1>
          <p className="mb-1">
            Feels like: {weath.main.feels_like}°C | Max:{" "}
            {weath.main.temp_max}°C | Min: {weath.main.temp_min}°C
          </p>
          <p className="mb-1">Humidity: {weath.main.humidity}%</p>
          <p className="mb-1">Pressure: {weath.main.pressure} hPa</p>
          <p className="mb-1">Visibility: {weath.visibility / 1000} km</p>
          <p className="mb-1">
            Wind: {weath.wind.speed} m/s {direction}{" "}
            {weath.wind.gust ? `(gusts: ${weath.wind.gust} m/s)` : ""}
          </p>
          <p className="mb-1">
            🌅 Sunrise: {sunRiseTime} | 🌇 Sunset: {sunSetTime}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
