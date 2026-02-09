import React from "react";
import "./RequestCard.css";
import toast from "react-hot-toast";
import api from "./api";
import { useEventContext } from "../context/context";

const RequestCard = ({ request }) => {

  const { setRequests } = useEventContext();
  const user = request.userId;

  const handleRemoveRequest = (id) => {
  setRequests((prev) => prev.filter((req) => req._id !== id));
};


  const handleRequestResponse = async (response) => {
    console.log(request.userId._id);
    console.log(response);
    try {
      const res = await api.put(
        `/admin/users/${request.userId._id}/approve-organizer/${response}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message);

      handleRemoveRequest(request._id);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="request-card">
      <div className="request-user">
        <img
          src={user?.avatar?.url || "https://via.placeholder.com/50"}
          alt={user?.name}
          className="request-avatar"
        />

        <div>
          <p className="request-name">{user?.name}</p>
          <p className="request-email">{user?.email}</p>
        </div>
      </div>

      <div className="request-actions">
        <button
          className="accept-btn"
          onClick={() => handleRequestResponse("accept")}
        >
          Accept
        </button>

        <button
          className="reject-btn"
          onClick={() => handleRequestResponse("reject")}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
