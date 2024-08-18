//import { useState } from 'react';
import { useEffect, useState, useCallback } from 'react';
import './App.css';
import ClipLoader from "react-spinners/ClipLoader";
import SearchBar from './component/SearchBar'; // SearchBar 컴포넌트 임포트


// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';




// 1. 앱이 실행되면 현재 위치기반의 날씨 정보 
// 2. 날씨정보에는 도시, 섭씨,화씨 날씨상태
// 3. 5개의 버튼 (1. 현재도시 2~3 가고싶은곳 도시 )
// 4.  도시버튼 클릭할때마다 도시별 날씨가 나온다 
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반으로 날씨가 나온다 
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다 
function App() {

  const cities =  ['current location','sydney', 'seoul', 'tokyo', 'shanghai' ]

  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] =useState(false)

  const [error, setError] = useState(false); // 오류 메시지 상태 추가

  const [selectedCity, setSelectedCity] = useState('');

  // 버튼선택하면 변화주기
  const handleClick = (city) => { setCity(city); setSelectedCity(city); };
  

  const getCurrentLocation = useCallback(() => {

     // 구글 에서 가지고온 코드
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude


      //lat,lon 정보를 getWeatherByCurrentLocation 함수에 넘겨준다 
      getWeatherByCurrentLocation(lat, lon)});
  }, []); 


  // (ApI 주소) 함수실행으로 lat, lon 정보를 받는다

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);  // 이전 오류 초기화
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=43743bc28705abae9c0e0c8b34416497&units=metric`;

      // url 호출해서 response 에 넣어주기
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // json파일 추출하기 (API는 대부분 json이다) 
      const data = await response.json();

      // data를 weather에 넣어준다
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data by location:", error);
      setError("Failed to load weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


const getWeatherByCity = useCallback(async () => {
  if (!city) return; // city가 설정되지 않은 경우 아무 것도 하지 않음
  try {
    setLoading(true);
    setError(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=43743bc28705abae9c0e0c8b34416497&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    setWeather(data);
  } catch (error) {
    console.error("Failed to fetch weather data by city:", error);
    setError("Failed to load weather data. Please try again later.");
  } finally {
    setLoading(false);
  }
}, [city]);


const handleSearch = (searchTerm) => {
  setCity(searchTerm);
  setSelectedCity(searchTerm);
};


useEffect(() => {
  if (city === 'current location' || city === '') {
    getCurrentLocation();
  } else {
    getWeatherByCity();
  }
}, [city, getCurrentLocation, getWeatherByCity]);




  return (
    <div>

      {loading? (
      <div className="container">
        
        <ClipLoader color="#f8826b" loading={loading}  size={150} aria-label="Loading Spinner"
        data-testid="loader" />
      </div>) 
      
      :
      

      (<div className="container">
        <SearchBar onSearch={handleSearch} /> {/* SearchBar 컴포넌트 추가 */}
        <WeatherBox weather = {weather} error={error}/>
        <WeatherButton cities ={cities} setCity={setCity} handleClick={handleClick} selectedCity={selectedCity}/>
      </div>)}

      




      
    </div>
  );
}

export default App;
