import React from 'react'

const OwnCreatedCard = (event) => {
  console.log(event.event);
  return (
    <div style={{color:"white", width:"300px", borderRadius:"20px", padding:"20px", margin:"5px", display:"flex", flexDirection:"column", alignItems:"center", gap:"10px", backgroundColor:"gray"}}>
        <div style={{ padding:"5px"}}>
            <h2>{event.event.title}</h2>
        <p>{event.event.description}</p>
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