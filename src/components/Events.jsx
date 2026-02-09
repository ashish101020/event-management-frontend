import { useEventContext } from '../context/context';
import Card from './Card';

const Events = () => {
  const { events } = useEventContext();

  return (
    <div style={{ padding: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
      {/* {events && events.length > 0 ? (
        events.map((event) => (
          <Card event={event} key={event._id} />
        ))
      ) : (
        <div style={{display:"flex", justifyContent:"center", alignContent:"center", fontSize:"72px", fontWeight:"bold", color:"white"}}>No events found</div>
      )} */}

       <div>
        <h3>updated test event 123</h3>
        <p>Ranchi</p>
        <p>Upcoming</p>
      </div>
    </div>
  );
};

export default Events;
