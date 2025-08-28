import { useEffect, useState } from 'react'
import './App.css'

function App() {
  let [weath, setWeath] = useState('')
  let [direction, setDirection]=useState('')
  let [srch,setSrch]=useState('')
  let [city,setCity]=useState('Karachi')
  let [sunRiseTime,setSunRiseTime]=useState('')
  let [sunSetTime,setSunSetTime]=useState('')
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa9978b91d5b6560db0ffa88c6696e01&units=metric`).then((data)=>data.json()).then((data)=>{
    let n=new Date()
    n.setTime(data.sys.sunrise*1000)
    switch(true){
      case (n.getHours()==0):
        setSunRiseTime(`12:${n.getMinutes()<10?('0'+n.getMinutes()):n.getMinutes()} AM`)
        break
        case (n.getHours()>0 && n.getHours()<=11):
          setSunRiseTime(`${n.getHours()}:${n.getMinutes()<10?('0'+n.getMinutes()):n.getMinutes()} AM`)
          break
          case (n.getHours()>=12 && n.getHours()<=23):
            setSunRiseTime(n.getHours()==12?(`12:${n.getMinutes()<10?('0'+n.getMinutes()):n.getMinutes()} PM`):(`${n.getHours()-12}:${n.getMinutes()<10?('0'+n.getMinutes()):n.getMinutes()} PM`))
            break
    }
    let m=new Date()
    m.setTime(data.sys.sunset*1000)
    switch(true){
      case (m.getHours()==0):
        setSunSetTime(`12:${m.getMinutes()<10?('0'+m.getMinutes()):m.getMinutes()} AM`)
        break
        case (m.getHours()>0 && m.getHours()<=11):
          setSunSetTime(`${m.getHours()}:${m.getMinutes()<10?('0'+m.getMinutes()):m.getMinutes()} AM`)
          break
          case (m.getHours()>=12 && m.getHours()<=23):
            setSunSetTime(m.getHours()==12?(`12:${m.getMinutes()<10?('0'+m.getMinutes()):m.getMinutes()} PM`):(`${m.getHours()-12}:${m.getMinutes()<10?('0'+m.getMinutes()):m.getMinutes()} PM`))
            break
    }
    switch(true){
      case (data.wind.deg>=0 && data.wind.deg<22.5 || data.wind.deg>337.5 && data.wind.deg<=360):
        setDirection('North')
        break
        case (data.wind.deg>22.5 && data.wind.deg<67.5):
          setDirection('Northeast')
          break
          case (data.wind.deg>67.5 && data.wind.deg<112.5):
            setDirection('East')
            break
            case (data.wind.deg>112.5 && data.wind.deg<157.5):
              setDirection('Southeast')
              break
              case (data.wind.deg>157.5 && data.wind.deg<202.5):
                setDirection('South')
                break
                case (data.wind.deg>202.5 && data.wind.deg<247.5):
                  setDirection('Southwest')
                  break
                  case (data.wind.deg>247.5 && data.wind.deg<292.5):
                    setDirection('West')
                    break
                    default:
                      setDirection('Northwest')
    }
    setWeath(data)
  }).catch(()=>{
    alert('Not Found')
  })
  },[city])
  if(weath==''){
    return '...Loading'
  }
  return (
    <div>
      <input type="text" value={srch} placeholder='Search by name' onChange={(e)=>{
        setSrch(e.target.value)
      }} />
      <button disabled={srch==''} onClick={()=>setCity(srch)}>Search</button>
      <p>Your looking {weath.name} weather. Temperature is {weath.main.temp} C. Feels like temperature is {weath.main.feels_like} C. Maximum temperature is {weath.main.temp_max} C. Minimum temperature is {weath.main.temp_min} C. Pressure is {weath.main.pressure} hPa. Humidity is {weath.main.humidity} %. Visisbility is {weath.visibility/1000} km. Weather : {weath.weather[0].main}. Wind speed is {weath.wind.speed} m/s. Wind gust is {weath.wind.gust} m/s. Wind direction is {direction}. Sunrise at {sunRiseTime} & sunset at {sunSetTime}.</p>
    </div>
  )
}

export default App
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
    // data.wind.speed
    // data.wind.gust
    // data.wind.deg
    // 0 is N
    // 45 is NE
    // 90 is E
    // 135 is SE
    // 180 is S
    // 225 is SW
    // 270 is W
    // 315 is NW