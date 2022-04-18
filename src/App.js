import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import Country from './Components/Country';
import { Routes, Route } from "react-router-dom";
import CountryDetails from './Components/CountryDetails';

function App () {
  const [countries, setCountries] = useState([]);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const navigate = useNavigate();
  
  const noCountries = countries.status || countries.message;

  useEffect(() =>{
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v2/all")
    const data = await response.json();

    if (data.status === 404) {
      setCountries([]);
      return;
    } 

    setCountries(data);
  };

const searchCountries = () => {
  const searchValue = countriesInputRef.current.value;

  if (searchValue.trim()) {
    const fetchsearch = async () => {
      const response = await fetch(`https://restcountries.com/v2/name/${searchValue}`)
      const data = await response.json();

      setCountries(data);
    }

    try {
      fetchsearch()
    } catch (error) {
      console.log(error)
    }
  } else {
    fetchData();
  }
};

const selectRegion = () => {
  const selectValue = regionRef.current.value;

  if (selectValue.trim()) {
    const fetchSelect = async () => {
      const response = await fetch(`https://restcountries.com/v2/region/${selectValue}`);
      const data = await response.json();

      if (selectValue === "All") {
        try {
          fetchData()
        } catch (error) {
          console.log(error)
        }
        return;
      }

      setCountries(data);
    };

    try {
      fetchSelect();
    } catch (error) {
      console.log(error);
    }
  }
};

const showDetails = (code) => {
  navigate(`/${code}`);
}


      return (
        <div className="App">
          <Header/>
          <Routes>
            <Route path="/" element={<div className='container-body'>
              <div className='inputs'>
                <div className='search-input'>
                  <SearchIcon className='icon'/>
                  <input type="texto" placeholder='Buscar por ciudad...' ref={countriesInputRef} onChange={searchCountries}/>
                </div>
                <div className='select-filter'>
                  <select ref={regionRef} onChange={selectRegion}>
                    <option>All</option>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europa</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>
              <div className='countries'>
                {!noCountries ? (countries.map((country) =>(
                  <Country 
                  key={country.alpha3code} 
                  code={country.alpha3code}
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  region={country.region}
                  flag={country.flag}
                  area={country.area}
                  showDetails={showDetails}
                  />
                ))) : (
                  <p>No Se Encontraron Coincidencias..</p>
                ) }
              </div>
            </div>}></Route>
           <Route path="/:countryCode" element={<CountryDetails countries={countries}/>}/>
           
        </Routes> 
          
  </div>
      );
}
export default App;