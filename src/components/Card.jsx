const Card = (event) => {
  console.log(event);
  return (
    <div style={{margin:"5px", padding:"5px", width:"200px", height:"200px", borderRadius:"8px"}}>
        <img src="" alt="" />
        <p style={{color:"yellowgreen"}}>{event.title}</p>
        <p>{event.description}</p>
        <p>{event.location}</p>
        <p>{event.status}</p>
    </div>
  )
}

export default Card