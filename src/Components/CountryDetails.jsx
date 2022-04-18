import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from "react-router";

function CountryDetails ({ countries }) {
  const params = useParams();
  const navigate = useNavigate();

  let name;
  let flagImg;
  let nativeName;
  let population;
  let region;
  let subregion;
  let capital;
  let topLevelDomain;
  let currencies = [];
  let languages = [];
  let borders = [];

  countries.forEach((country) => {
    if (country.alpha3code === params.countryCode) {
      name = country.name;
      flagImg = country.flag;
      nativeName = country.nativeName;
      population = country.population;
      region = country.region;
      subregion = country.subregion;
      capital = country.capital;
      topLevelDomain = country.topLevelDomain;

      country.currencies?.forEach((currency) => {
        currencies.push(currency.name)
      });

      country.languages?.forEach((language) => {
        languages.push(language.name)
      });

      country.borders?.forEach((border) => {
        borders.push(border.name)
      });
    }
  });

  const goBack = () => {
    navigate("/");
  };



    return (
        <div className='country-details'>
          <button className='back' onClick={goBack}>
            <ArrowBackIcon />
            <p>Atras</p>
          </button>

          <div className='country-details-body'>
              <div className='img-container'>
                <img src={flagImg} alt='' />
              </div>

            <div className='info'>
                <h2>{name}</h2>
                <div className='info-container'>
                  <div className='left-info'>
                  <p>Native Name:{""}
                  <span className='values'>{nativeName}</span>
                  </p>
                  <p>Population:{""}
                  <span className='values'>{population}</span>
                  </p>
                  <p>Region:{""}
                  <span className='values'>{region}</span>
                  </p>
                  <p>Sub region:{""}
                  <span className='values'>{subregion}</span>
                  </p>

                </div>
                  <div className='right-info'>
                  <p>Capital:{""}
                  <span className='values'>{capital}</span>
                  </p>
                  <p>top level domain:{""}
                  <span className='values'>{topLevelDomain}</span>
                  </p>
                  <p>Currencies:{""}
                  {currencies.map(currency => {
                    if (currencies.IndexOf(currency) !== currencies.length - 1) {
                      return (
                        <span className="values">
                          {""}
                          {currency},
                        </span>
                      );
                    } else {
                      return (
                      <span className="values">
                      {""}
                      {currency},
                    </span>);
                    }
                  })}
                  </p>
                  <p>Language:{""}
                  <span className='values'>Test</span>
                  </p>
                  </div>
              </div>
              Border Contries:
              <div className='border-country'>
                <p>Test</p>
              </div>
              <div className='border-country'>
                <p>Test</p>
              </div>
              <div className='border-country'>
                <p>Test</p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default CountryDetails;
