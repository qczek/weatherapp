import React from 'react';

const Result = (props) => {

    const{date, city, sunrise, sunset, temp, pressure, wind, err} = props.weather;
    let content = null;

    if(!err && city) {
        const sunriseTime = new Date(sunrise*1000).toLocaleTimeString();
        const sunsetTime = new Date(sunset*1000).toLocaleTimeString();
        const newTemp = Math.round(temp);
        
        content = (
        <div>
            <h3>Wyniki wyszukiwania dla <em>{city}</em></h3>
            <h4>Dane dla dnia i godiny: {date}</h4>
            <h4>Aktualna temperatura: {newTemp} &#176;C</h4>
            <h4>Wschód Słońca: {sunriseTime}</h4>
            <h4>Zachód Słońca: {sunsetTime}</h4>
            <h4>Ciśnienie: {pressure} hPa</h4>
            <h4>Wiatr: {wind} m/s</h4>
        
        </div>
        )
    }
    return (
      <div className="result">
          {err ? `Nie mamy w bazie ${city}` : content}
          
      </div>
    );
}
export default Result;