import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Country = ({ country, onShowCountry }) => {
  return (
    <li>
      {country.name.common} <button onClick={() => onShowCountry(country)}>Show</button>
    </li>
  )
}

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (country.capital && country.capital.length > 0) {
      weatherService
        .getWeather(country.capital[0])
        .then(data => setWeather(data))
        .catch(error => console.log("Weather fetch failed: ", error))
    }
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <li>Capital {country.capital[0]}</li>
      <li>Area {country.area}</li>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map(key => {
          return (
            <li key={country.languages[key]} >
              {country.languages[key]}
            </li>
          )
        })}
      </ul>
      <img src={country.flags.png}/>

      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <li>Temperature {weather.main.temp} Celsius</li>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt='weather icon'
          />
          <li>Wind {weather.wind.speed} m/s</li>
        </div>
      )}
    </div>
  )
}

const Countries = ({ countries, onShowCountry, selectedCountry }) => {
  if (selectedCountry) {
    return (
      <CountryInfo country={selectedCountry}/>
    )
  }
  else if (countries.length > 10) {
    return (
      <li>Too many matches, specify another filter</li>
    )
  }
  else if (countries.length === 1) {
    return (
      <CountryInfo country={countries[0]}/>
    )
  }
  else if (countries.length === 0) {
    return (
      <li>No matches, specify another filter</li>
    )
  }
  else {
    return (
      <>
        {countries.map(c => 
          <Country 
            key={c.name.common} 
            country={c} 
            onShowCountry={onShowCountry}
          />
        )}
      </>
    )
  }
}

export default Countries