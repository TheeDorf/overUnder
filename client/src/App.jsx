import { useState, useEffect } from 'react';



function SportsOdds() {
  const [sports, setSports] = useState([]);
  const [searchSport, setSearchSport] = useState("");

  useEffect (()=>{
  const apiUrl ="https://odds.p.rapidapi.com/v4/sports?all=true"
  
 const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '120dbbf960msh3b1dc96d2563f33p17472djsnc2a87881d164',
		'X-RapidAPI-Host': 'odds.p.rapidapi.com'
  }};

  fetch(apiUrl, options)
  .then(response => response.json())
  .then(data => setSports(data.data))
  .catch(error => console.error(error));
}, []);

function filterSports(){
  return sports.filter(sport => sport.key.toLowerCase().includes(searchSport.toLowerCase()));
}

function displaySportsOdds(){
  const filteredSports = filterSports();
  return(
    <div id="sports-odds-container">
      <input type="text"
          placeholder='search by sport'
          value={searchSport}
          onChange= {e => setSearchSport(e.target.value)} />

    </div>
  )
}








  return (
    <div>
  {displaySportsOdds()}
    </div>
  );}

export default SportsOdds
