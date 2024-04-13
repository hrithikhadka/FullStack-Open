import { useState, useEffect } from "react";
import CountryDetails from "./components/CountryDetails";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // console.log("effect run, countries is now ", countries);
    if (query) {
      // console.log("fetching countries....");
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          // console.log(response.data[0].name.common);
          const data = response.data;
          setCountries(data);
          // console.log(data);
          // const countryNames = data.map((country) => country.name.common);
          // console.log(countryNames);
        })
        .catch((err) => {
          console.log("error fetching data");
        });
    }
  }, [query]);

  const handlechange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    setShow(!show);
  };

  return (
    <>
      <p>
        find countries <input value={query} onChange={handlechange} />
      </p>
      {query && (
        <>
          {filterCountries.length === 1 ? (
            <CountryDetails country={filterCountries[0]} />
          ) : filterCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            <div>
              {filterCountries.map((country, index) => (
                <div key={index}>
                  {country.name.common}{" "}
                  <button onClick={() => handleShowCountry(country)}>
                    {selectedCountry === country && show ? "hide" : "show"}
                  </button>
                  {selectedCountry === country && show && (
                    <CountryDetails country={country} />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
