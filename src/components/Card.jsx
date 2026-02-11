const Card = (event) => {
  
  return (
    <div style={{margin:"5px", padding:"16px", width:"400px", height:"200px", borderRadius:"8px", backgroundColor:"black"}}>
        <img src="" alt="" />
        <h1 style={{color:"yellowgreen"}}>{event.event.title}</h1>
        <p>{event.event.description}</p>
        <p>{event.event.location}</p>
        <p>{event.event.status}</p>
    </div>
  )
}

export default Card