import React, { useEffect } from "react";
import { useEventContext } from "../context/context";
import RequestCard from "./RequestCard";
import api from "./api";

const Dashboard = () => {
  const { requests, setRequests, user } = useEventContext();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/admin/organizer-requests", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);

        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if(user.role ==='Admin'){
      fetchRequests();
    }
  }, [setRequests, user]);

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      {user.role === 'Admin' && (
        <>
        <h2 style={{color:"yellowgreen"}}>Organizer Requests</h2>
      <div>{requests.map((req) => (
        <RequestCard key={req._id} request={req} />
      ))}</div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
