import { useState, useEffect } from "react"
import Countries from "./components/Countries"
import countriesService from "./services/countries"

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
        setShowCountries(allCountries)
      })
  }, [])

  const handleNewCountryChange = (event) => {
    const name = event.target.value
    setNewCountry(name)
    if (name === '') {
      setShowCountries(countries)
    }
    else {
      setShowCountries(countries.filter(c => 
        c.name.common.toLowerCase().includes(name.toLowerCase())
      ))
    }
  }

  return (
    <div>
      <form>
        find countries <input value={newCountry} onChange={handleNewCountryChange}/>
      </form>
      <Countries countries={showCountries}/>
    </div>
  )
}

export default App