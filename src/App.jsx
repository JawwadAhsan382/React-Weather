import { useEffect, useState } from 'react'
import './App.css'

function App() {
  let [weather, setWeather] = useState(0)
  useEffect(()=>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=aa9978b91d5b6560db0ffa88c6696e01&units=metric').then((data)=>data.json()).then((data)=>{
    console.log(data)
    // data.main.temp
    // data.main.temp_max
    // data.main.temp_min
    // data.main.feels_like
    // data.main.pressure
    // data.main.temp
    // data.main.humidity
    // data.name
    // data.sys.sunrise
    // data.sys.sunset
    // data.timezone
    // data.visibility
    // data.weather[0].main
    //  data.weather[0].description
    // data.wind.speed
    // data.wind.gust
    // data.wind.deg
    setWeather(data)
  }).catch((err)=>{
    console.log(err);
  })
  },[])
  return (
    <div>
      
    </div>
  )
}

export default App
