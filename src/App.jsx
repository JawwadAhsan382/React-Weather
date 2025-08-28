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

        // 🌅 Sunrise
        let n = new Date();
        n.setTime((data.sys.sunrise + data.timezone - 18000) * 1000);

        switch (true) {
          case n.getHours() == 0:
            setSunRiseTime(
              `12:${n.getMinutes() < 10 ? "0" + n.getMinutes() : n.getMinutes()} AM`
            );
            break;

          case n.getHours() > 0 && n.getHours() <= 11:
            setSunRiseTime(
              `${n.getHours()}:${n.getMinutes() < 10 ? "0" + n.getMinutes() : n.getMinutes()} AM`
            );
            break;

          case n.getHours() >= 12 && n.getHours() <= 23:
            setSunRiseTime(
              n.getHours() == 12
                ? `12:${n.getMinutes() < 10 ? "0" + n.getMinutes() : n.getMinutes()} PM`
                : `${n.getHours() - 12}:${n.getMinutes() < 10 ? "0" + n.getMinutes() : n.getMinutes()} PM`
            );
            break;
        }

        // 🌇 Sunset
        let m = new Date();
        m.setTime((data.sys.sunset + data.timezone - 18000) * 1000);

        switch (true) {
          case m.getHours() == 0:
            setSunSetTime(
              `12:${m.getMinutes() < 10 ? "0" + m.getMinutes() : m.getMinutes()} AM`
            );
            break;

          case m.getHours() > 0 && m.getHours() <= 11:
            setSunSetTime(
              `${m.getHours()}:${m.getMinutes() < 10 ? "0" + m.getMinutes() : m.getMinutes()} AM`
            );
            break;

          case m.getHours() >= 12 && m.getHours() <= 23:
            setSunSetTime(
              m.getHours() == 12
                ? `12:${m.getMinutes() < 10 ? "0" + m.getMinutes() : m.getMinutes()} PM`
                : `${m.getHours() - 12}:${m.getMinutes() < 10 ? "0" + m.getMinutes() : m.getMinutes()} PM`
            );
            break;
        }

        // 🌬️ Wind Direction
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

  // ⏳ Loader
  if (loading || weath === "") {
    return (
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 py-5">
        {[
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
        ].map((color) => (
          <div key={color} className={`spinner-grow text-${color}`} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ))}
      </div>
    );
  }

  // 🌤️ Main UI
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Open Weather</h1>

      {/* 🔍 Search Bar */}
      <div className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          value={srch}
          placeholder="Search by city"
          onChange={(e) => setSrch(e.target.value)}
        />
        <button
          className="btn btn-primary"
          disabled={srch === ""}
          onClick={() => setCity(srch)}
        >
          Search
        </button>
      </div>

      {/* 🌍 Weather Card */}
      <div className="card shadow-lg border-0">
        <div className="card-body text-center">
          <h2 className="card-title mb-3">{weath.name} Weather</h2>
          <h4 className="mb-3">
            {weath.weather[0].main} ({weath.weather[0].description})
          </h4>
          <h1 className="display-4 fw-bold mb-3">{weath.main.temp}°C</h1>
          <p className="mb-1">
            Feels like: {weath.main.feels_like}°C | Max: {weath.main.temp_max}°C
            | Min: {weath.main.temp_min}°C
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
