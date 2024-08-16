//import { useState } from 'react';
import { useEffect, useState, useCallback } from 'react';
import './App.css';

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


  const [weather, setWeather] = useState(null)
  
  
  // const getCurrentLocation=()=> {

  //   // 구글 에서 가지고온 코드
  //   navigator.geolocation.getCurrentPosition((position)=>{
  //     let lat = position.coords.latitude
  //     let lon = position.coords.longitude

  //     //lat,lon 정보를 getWeatherByCurrentLocation 함수에 넘겨준다 
  //     getWeatherByCurrentLocation(lat,lon)
  //   });
    
  // }



  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)});
  }, []); 


  // (ApI 주소) 함수실행으로 lat, lon 정보를 받는다
  const getWeatherByCurrentLocation = async (lat,lon)=>{
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=43743bc28705abae9c0e0c8b34416497&units=metric`

    // url 호출해서 response 에 넣어주기
    let response = await fetch(url)
    
    // json파일 추출하기 (API는 대부분 json이다) 
    let data = await response.json()

    // data를 weather에 넣어준다 
    setWeather(data)
  }

// 앱이 실행될때 getCurrentLocation함수안에 내가 하고 싶은 만드다  실행, []어레이가 비어있으면 랜더후 바로 실행한다  
  useEffect(()=>{ getCurrentLocation()},[getCurrentLocation])
  
  


  return (
    <div>
      <div className="container">
        <WeatherBox weather = {weather}/>
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;
