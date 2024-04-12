const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>languagues:</h4>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country Flag" />
    </div>
  );
};

export default CountryDetails;
