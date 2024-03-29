import { useState, useEffect } from 'react';
import styles from './App.module.css';

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
      <div className={styles.input}>
      <input type="text" className={styles.field} 
      value={searchinput}
      placeholder='Search for countries...'
      onChange={handleInput} />
      </div>
    <div className={styles.container}>
        {filteredData.map((country)=>{
        return(
        <div key={country.cca3} className={styles.countryCard}>
          <img className={styles.image} src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <h1 className={styles.name}>{country.name.common}</h1>
        </div>
        )
      })}
    </div>
    </div>
  );
}

export default App;
