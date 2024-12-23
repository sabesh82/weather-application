
import { useState } from 'react'
import './App.css'
/*images*/
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/clouds.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import mistIcon from "./assets/mist.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";

const WeatherDetails = ({icon,temp,city,country,lat,lon,humidity,wind}) =>
{
  return(<>
    <div className="image">
      <img src={icon} alt="image" />
    </div>

    <div className="temp">{temp}°C</div>
    <div className="city">{city}</div>
    <div className="country">{country}</div>

    <div className="cooordination">
      <div>
        <span className="lat">Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="lon">Longitude</span>
        <span>{lon}</span>
      </div>
    </div>

    <div className="data-container">
      <div className="element">
        <img src={humidityIcon} alt="humidity" className="icon" />
        <div className="data">
          <div className="humidity-persent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windIcon} alt="wind" className="icon" />
        <div className="data">
          <div className="wind-persent">{wind}km/h</div>
          <div className="text">wind speed</div>
        </div>
      </div>
    </div>

  </>);
};

function App() {

  let api_key = "0731822c283883bcad86c6537f9779d3";
  const [text,setText] = useState("colombo");

  const [icon,setIcon] = useState(snowIcon);
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("colombo");
  const [country,setCountry] =useState("sl");
  const [lat,setLat] = useState(0);
  const [lon,setLon] = useState(0);
  const [humidity,setHumidity] = useState(0);
  const [wind,setWind] = useState(0);

  const [cityNotFound,setCityNotFound] = useState(false);
  const [loading,setLoading] = useState(false);

  const search = async() =>{
    setLoading(true);
    setCityNotFound(false);
    let uri = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res = await fetch(uri);
      if (!res.ok) {
        throw new Error("City not found");
      }
      let data = await res.json();
      //console.log(data);

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);

    const weatherConditionToIcon = (condition) => {
        console.log("Condition:", condition); // This should be inside the function, before the switch
        switch (condition.toLowerCase()) {
          case "clouds":
            return cloudIcon;
          case "drizzle":
            return drizzleIcon;
          case "mist":
            return mistIcon;
          case "snow":
            return snowIcon;
          case "clear":
            return clearIcon;
          case "rain":
            return rainIcon; // Use drizzleIcon for Rain or create a separate icon
          default:
            return clearIcon;
        }
      };
      
      setIcon(weatherConditionToIcon(data.weather[0].main));
      

    }catch(error){
      console.error("An error occurred",error.message);
      setCityNotFound(true);
    }finally{
      setLoading(false);
    }
  }

  const handleCity = (e) =>{
    setText(e.target.value);
  }

  const handleKeyDown = (e) =>{
    if (e.key === "Enter"){
    search();
    }
  };
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityInput" placeholder="search city" onChange={handleCity} value={text}/>
          <div className="search-icon" onClick={()=>search()}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind}/>
      </div>
    </>
  )
}

export default App
