const Country = ({ country }) => {
  return (
    <li>{country.name.common}</li>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <li>Capital {country.capital}</li>
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
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
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
        {countries.map(c => <Country key={c.name.common} country={c}/>)}
      </>
    )
  }
}

export default Countries