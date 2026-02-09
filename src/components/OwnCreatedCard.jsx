import React from 'react'

const OwnCreatedCard = (event) => {
  return (
    <div style={{color:"white", padding:"8px", margin:"5px", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <div>
            <h2>{event.title}</h2>
        <p>{event.description}</p>
        </div>
        <div style={{display:"flex", padding:"8px", gap:"5px"}}>
            <button>View</button>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default OwnCreatedCard