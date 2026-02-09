import React from 'react'

const Card = (event) => {
  return (
    <div>
        <img src="" alt="" />
        <p>{event.title}</p>
        <p>{event.location}</p>
        <p>{event.status}</p>
    </div>
  )
}

export default Card