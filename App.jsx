import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cloud from './assets/cloud.png'
import './App.css'

function App() {

  const [town, setTown] = useState('Dnipro')
  const [data, setData] = useState({})

  const key = 'fe16c07311036c2d9c8c3c89c8fd71b3'
 
  const cities = {
	Dnipro: {lat: 48.46938326906493,   lon: 35.01243165012324},
	Kyiv:   {lat: 50.450001,           lon: 30.523333},
	Lviv:   {lat: 49.839683,   		   lon: 24.029717},
  }

  const citySelector = () => {

	let lat = cities[town].lat, 
		lon = cities[town].lon

	 const urlTemplate  =
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&appid=${key}`; 

	fetch(urlTemplate)
	.then(res => res.json())
	.then(data => setData(data))
	console.log(data)
  }

  useEffect(citySelector, [town]);

  return (
    <div className="App">
		
		<div className="city-selector">
			<span className='city-selector__text' >Ваше місто:</span>
			
			<select className='city-selector__select'
				onChange={e => setTown(e.target.value)}>
				<option value="Dnipro" selected defaultValue={"Dnipro"}>Дніпро</option>
				<option value="Kyiv">Київ</option>
				<option value="Lviv">Львів</option>
			</select>
		</div>

		{data.main ? (

			<div className="weather-widget">
				
				<div className="weather-widget__row1">
						<p>{data.name }</p>
				</div>
				
				<div className="weather-widget__row2">
						<div>
							<p>{data.main.temp + " °C"}</p>
								Відуівається як: {data.main.feels_like}

						</div>
						<img src={cloud} alt="cloud image"/>
						<p className='clouds'>{data.weather[0].description }</p>
				</div>

				<div className="weather-widget__row3">
					<span>
						Вітер: {data.wind.speed} m/s
					</span>
					<span>
					Вологість: {data.main.humidity} %
					</span>					
				</div>
			</div>
			) 
			: null}
	</div> // app 
	
  )
}

export default App
