import { useEffect, useState } from "react";
import countriesService from "./services/countries";

function App() {
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [countriesToShow, setCountriesToShow] = useState(null);
  const [countries, setCountries] = useState(null);
  // console.log(countriesService.getSome(searchQuery));

  useEffect(() => {
    countriesService
      .getAll()
      .then((countries) => {
        setCountries(countries);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredCountries.length > 10) {
        setCountriesToShow(null);
        alert("Too many matches, specify another filter");
      } else {
        setCountriesToShow(filteredCountries);
      }
    }
  }, [searchQuery]);

  const onSearch = (event) => {
    event.preventDefault();
    setSearchQuery(value);
    setValue("");
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <label>find countries</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      <ul>
        {countriesToShow ? (
          countriesToShow.length === 1 ? (
            <div>
              <h1>{countriesToShow[0].name.common}</h1>
              <p>Capital {countriesToShow[0].capital}</p>
              <p>area {countriesToShow[0].area}</p>
              <p>languages:</p>
            </div>
          ) : (
            countriesToShow.map((country) => (
              <li key={country.cca2}>{country.name.common}</li>
            ))
          )
        ) : (
          ""
        )}
        {/* {countriesToShow
          ? countriesToShow.map((country) => (
              <li key={country.cca2}>{country.name.common}</li>
            ))
          : ""} */}
      </ul>
    </div>
  );
}

export default App;
