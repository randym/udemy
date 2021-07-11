import './SeasonDisplay.css'
import React from 'react'

const getSeason = (lat) => {
  const month = new Date().getMonth()
  
  if(month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter'
  } 

  return lat > 0 ? 'winter': 'summer'
}

const seasons = {
  summer: { message: 'Let\'s hit the beach!', iconName: 'sun' },
  winter: { message: 'Burr, it\'s chilly', iconName: 'snowflake' }
}

const SeasonDisplay = (props) => {
  const season = getSeason(props.lat)
  const { message, iconName } = seasons[season]
  
  return (
    <div className={`season-display ${season}`}>
      <i className={`icon-left icon massive ${iconName}`}/>
      <h1>{message}</h1>
      <i className={`icon-right icon massive ${iconName}`}/>
    </div>
  )
}

export default SeasonDisplay