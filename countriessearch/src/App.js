import { useState, useEffect } from 'react';
// import styles from './App.module.css';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchinput, setSearchInput] = useState("");

  const filteredData = countries.filter((country)=>
  {return country.name.common.toLowerCase().includes(searchinput.toLowerCase());
   })

  const handleInput = (e)=>{
    setSearchInput(e.target.value);
  }

  const getCountriesData = async()=>{
    try{
      let res = await fetch(`https://restcountries.com/v3.1/all`);
      let data = await res.json();
      setCountries(data);
      console.log(data);
    }
    catch(err){
      console.log("Error fetching data: ", err);
    }
  }

  useEffect(()=>{
    getCountriesData()
  },[]);


  return (
    <div>
      <div className="input">
      <input type="text" className="field" 
      value={searchinput}
      placeholder='Search for countries...'
      onChange={handleInput} />
      </div>
    <div className="container">
        {filteredData.map((country)=>{
        return(
        <div key={country.cca3} className="countryCard">
          <img className="image" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <h1 className="name">{country.name.common}</h1>
        </div>
        )
      })}
    </div>
    </div>
  );
}

export default App;
