import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';
const APIKey = '301bb5de7ac61d493d9e0ed3ca83131f';//klucz do API
class App extends Component{
  //wartość po otwarciu apki
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false,
  }
    //reczna zmiana value
  handleInputChange = (e) =>{

    this.setState({
      value: e.target.value
    })
  }

  handleCitySubmit = (e)=>{
    e.preventDefault() //<- powsrzymuje domyślne działanie odświezania
    console.log("potwierdzony formularz");
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric `;
    //metoda rządania
    fetch(API)//fetch tworzy obietnice i zwraca response
    .then(response => {
      if(response.ok){
        return response
      }
      throw Error("nie udało się")
    })//jeśli spełniony
    .then(response => response.json())
    .then(data => {
      const time = new Date().toLocaleString()
      this.setState(state =>({
        err: false,
        date: time,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        city: this.state.value,
      }))
    })
    .catch(err =>{
      this.setState(state=>({
        err: true,
        city: this.state.value
      }))
    })//jeśli nie spełniony
  }
  render() {
    return (
      <div className="App">
        <Form 
          value={this.state.value} 
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
