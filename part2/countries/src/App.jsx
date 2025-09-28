import { useState, useEffect } from "react"
import Countries from "./components/Countries"
import countriesService from "./services/countries"

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
        setShowCountries(allCountries)
      })
  }, [])

  const submitCountry = (event) => {
    event.preventDefault()
  }

  const handleNewCountryChange = (event) => {
    const name = event.target.value
    setNewCountry(name)
    setSelectedCountry(null)
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
      <form onSubmit={submitCountry}>
        find countries <input value={newCountry} onChange={handleNewCountryChange}/>
      </form>
      <Countries 
        countries={showCountries}
        onShowCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
      />
    </div>
  )
}

export default App