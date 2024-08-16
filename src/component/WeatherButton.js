import React from 'react'

// link to bootstrap 
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
        <Button variant="success">Sydney</Button>
        <Button variant="success">Seoul</Button>
        <Button variant="success">Tokyo</Button>
        <Button variant="success">Shanghai</Button>
    </div>
  )
}

export default WeatherButton