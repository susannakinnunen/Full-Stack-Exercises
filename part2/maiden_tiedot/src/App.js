import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilter}) => {
  console.log('päivittyykö')
  return(
  <div>
    <p>search countries</p><input type="text" value={filter} onChange={handleFilter}/>
  </div>
  )
}

const Button = ({countryInformation}) => {
  console.log("nappi", countryInformation)
  const countryInfo = [countryInformation]
  return(
    <div>
    <p>{countryInformation.name.common} <button onClick={() => Country({countryInfo})}>
    show
  </button></p>
  </div>
  )}

const Country = ({countryInfo}) => {
  const country = countryInfo
  console.log("country",country)
  const languages = country.map(country => Object.values(country.languages))
  const flagURL = country.map(country => country.flags.png)
  console.log("kielet", languages)
  console.log("lippuUrl", flagURL)
  return(
    <div>
  {country.map(country => 
    <h2 key={country.name.common}>
    {country.name.common}</h2>
  )}
  {country.map(country => 
    <p key={country.capital}>
    capital {country.capital}</p>
   )}
  {country.map(country => 
    <p key={country.area}>
    area {country.area}</p>
   )}
  <h3>languages</h3>
  <ul>
    {languages.map(language=>
    <li key={language.toString()}>
      {language}</li>
    )}
  </ul>
  <img src={flagURL[0]}/>
  </div>
)}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [isFilter, setisFilter] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
      setCountries(response.data)
      })
  }, [])
  
  const handleFilter = (event) => {
    if (event.target.value === ''){
      console.log("buu")
      setFilter(event.target.value)
      setisFilter(false)
    }
    else{
      console.log(event.target.value)
      setFilter(event.target.value)
      setisFilter(true)
  }
  }


  const countriesToShow = isFilter
  ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  : countries

  if (filter === ''){
    return(
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      </div>
    )
  }
  if (countriesToShow.length > 10){
    return(
      <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <p>Too many matches, please specify another filter</p>
      </div>
    )
  }

  if (countriesToShow.length === 1){
    console.log("countriesToShow", countriesToShow)
    return(
      <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <Country countryInfo={countriesToShow}/>  
      </div>
    )
  }

  return(
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      {countriesToShow.map(country =>
      <Button countryInformation={country}/>)}

    </div>
  )
  }



export default App;
