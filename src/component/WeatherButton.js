import React from 'react'

// link to bootstrap 
import { Button } from 'react-bootstrap';
   

  const WeatherButton = ({cities, handleClick, selectedCity}) => {
  
  return (
    <div>
 
        {/* 자바스크립트를 쓰려면 대괄호를 사용한다 */}
        {cities.map((item, index)=>(
          <Button className={`button ${selectedCity === item ? 'selected' : ''}`} variant="success" key = {index}  onClick={() => handleClick(item)}>{item}</Button>
        ))}
    </div>
  )
}

export default WeatherButton