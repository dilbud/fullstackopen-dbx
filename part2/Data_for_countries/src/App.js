import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountryList, setFilteredCountryList] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        console.log(res);
        setCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
        setCountries([]);
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (!!!filter || filter?.length === 0) {
    } else {
      const filterList = countries
        .filter((c) => {
          if (!!!filter || filter?.length === 0) {
            return true;
          }
          return !!c?.name?.common?.toUpperCase().match(filter?.toUpperCase());
        })
        .sort((ca, cb) => ca?.name?.common.localeCompare(cb?.name?.common));
      setFilteredCountryList(filterList);
    }
    return () => {};
  }, [filter, countries]);

  const inputFilter = useCallback(
    (event) => {
      setFilter(event.target.value);
    },
    [setFilter]
  );
  const weatherFun = useCallback((country) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo?.latlng[0]}&lon=${country.capitalInfo?.latlng[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
      })
      .catch((err) => {
        setWeather(null);
      });
  }, []);
  useEffect(() => {
    if (filteredCountryList.length === 1) {
      weatherFun(filteredCountryList[0]);
    }
    return () => {};
  }, [filteredCountryList, weatherFun]);

  const renderCountryList = useCallback((filteredCountryList, weather) => {
    const none = () => <div></div>;
    const filterList = filteredCountryList;
    if (filterList.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filterList.length === 1) {
      console.log(filterList);
      const country = filterList[0];
      const name = country?.name?.common;
      const capital = country?.capital?.join(",");
      const area = country?.area;
      const Languages = ({ country }) => {
        const lang = Object.values(country?.languages).map((l, i) => {
          return <li key={i}>{l}</li>;
        });
        return <ul>{lang}</ul>;
      };
      const flag = country?.flags?.png;
      console.log(weather);
      return (
        <div>
          <h2>{name}</h2>
          <div>capital {capital}</div>
          <div>area {area}</div>
          <h1>Languages:</h1>
          <Languages country={country}></Languages>
          <img src={flag} alt={name} width={"200px"}></img>
          <h2>Weather in {name}</h2>
          {!!weather && (
            <>
              <div>temperature {weather?.main?.temp} Celsius</div>
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                alt={"weather"}
                width={"100px"}
              ></img>
              <div>wind {weather?.wind?.speed} m/s</div>
            </>
          )}
        </div>
      );
    } else if (filterList.length === 0) {
      return none();
    } else {
      console.log(filterList);
      return filterList.map((c) => {
        return (
          <div key={c.ccn3}>
            <span>{c?.name?.common}</span>
            <button
              onClick={(event) => {
                event.preventDefault();
                setFilteredCountryList([c]);
                setFilter("");
              }}
            >
              show
            </button>
          </div>
        );
      });
    }
  }, []);

  return (
    <div>
      find countries <input value={filter} onChange={inputFilter} />
      {renderCountryList(filteredCountryList, weather)}
    </div>
  );
};

export default App;
