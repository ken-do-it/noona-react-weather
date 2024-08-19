import React from 'react'

// Destructuring object의 내용 key 값을 가져오는 방식
const WeatherBox = ({ weather, error, loading }) => {
  // loading 상태거나 weather가 null인 경우, 아무것도 렌더링하지 않음
  if (loading || !weather) {
    return null;
  }

  // const iconUrl = weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : '';
    //console.log("weather", weather)
  return (


    <div className='weather-box'>
      {error ? (
        <div className="error-message">{error}</div> // 에러 메시지 표시
      ) : (
        <>
          <div>{weather?.name}</div>
          <h1>{weather?.main.temp.toFixed(1)}℃ / {(weather?.main.temp * 9/5 + 32).toFixed(1)}℉</h1>
          <h3>
            {weather?.weather[0].description}
            {weather?.weather[0].icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            )}
          </h3>
        </>
      )}
    </div>

    // <div className='weather-box'>
    //     {/* 삼항식으로 ? 를 써서 {weather && weather.name} 처럼 쓸수 있다 */}
    //     <div>{weather?.name}</div>

    //     {/*  처음  weather 는 null 값이라 ? 안썼는데 왜 작동하지??  근데 새로고참 하니깐 error난다...*/}
    //     {/* <div>{weather?.name}</div> */}

    //     {/* 온도가져오기  toFixed(1)는 소수점 첫째 자리까지 반올림 */}
    //     <h1>{weather?.main.temp.toFixed(1)}℃ / {(weather?.main.temp*9/5+32).toFixed(1)}℉</h1>

    // {/* weather가 Array 타입이여서 index 번호 입력해준다 */}
    //     <h3>{weather?.weather[0].description}
    //     {iconUrl && <img src={iconUrl} alt="Weather Icon" />}
    //     </h3>

        
    // </div>
  )
}

export default WeatherBox