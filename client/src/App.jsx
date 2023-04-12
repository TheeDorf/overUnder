import { useState, useEffect } from "react";

function SportsOdds() {
  const [sports, setSports] = useState([]);
  const [searchSport, setSearchSport] = useState("");
  const [gameType, setGameType] = useState("");

  useEffect(() => {
    const apiUrl = "https://odds.p.rapidapi.com/v4/sports?all=true";

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "120dbbf960msh3b1dc96d2563f33p17472djsnc2a87881d164",
        "X-RapidAPI-Host": "odds.p.rapidapi.com",
      },
    };

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => setSports(data))
      .catch((error) => console.error(error));
  }, []);

  function filterSports() {
   
    return sports.filter((sport) =>
      sport.title.toLowerCase().includes(searchSport.toLowerCase())
    );
  }

  function filterGames() {
    if (!gameType) {
      return [];
    }
    return sports.flatMap((sport) =>
      sport.events.filter((event) => event.type === gameType)
    );
  }

  function handleSearchSportChange(event) {
    setSearchSport(event.target.value);
  }

  function handleGameTypeChange(event) {
    setGameType(event.target.value);
  }

  const filteredSports = filterSports();
  const filteredGames = filterGames();
 

  function displaySportsOdds() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search by sport"
          value={searchSport}
          onChange={handleSearchSportChange}
        />
        <br />
        <select value={gameType} onChange={handleGameTypeChange}>
          <option value="All">All Games</option>
          <option value="game">Game</option>
          <option value="set">Set</option>
        </select>
        <br />
        <ul>
          {filteredGames.map((game) => (
            <li key={game.key}>
              <h3>
                {game.home_team} vs {game.away_team}
              </h3>
              {game.markets.map((market) => (
                <div key={market.key}>
                  <h4>{market.outcomes[0].name}</h4>
                  <p>Odds: {market.outcomes[0].price}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <div>{displaySportsOdds()}</div>;
}

export default SportsOdds;
