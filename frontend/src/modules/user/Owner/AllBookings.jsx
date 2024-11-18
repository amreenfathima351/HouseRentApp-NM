import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import {
  BsPersonFill,
  BsPhone,
  BsBuilding,
  BsClipboardCheck,
} from "react-icons/bs";
import "./AllProperty.css"; 

const AllProperty = () => {
  const [allBookings, setAllBookings] = useState([]);

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/owner/getallbookings",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleStatus = async (bookingId, propertyId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/owner/handlebookingstatus",
        { bookingId, propertyId, status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAllProperty();
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="all-property-container">
      {allBookings.map((booking) => (
        <div className="booking-item" key={booking._id}>
          <div className="booking-header">
            <h3>
              <BsClipboardCheck /> Booking Details
            </h3>
          </div>
          <div className="booking-details">
            <div className="detail-section">
              <span className="icon">
                <BsBuilding />
              </span>
              <p>
                <strong>Property ID:</strong> {booking.propertyId}
              </p>
            </div>
            <div className="detail-section">
              <span className="icon">
                <BsPersonFill />
              </span>
              <p>
                <strong>Tenant Name:</strong> {booking.userName}
              </p>
            </div>
            <div className="detail-section">
              <span className="icon">
                <BsPhone />
              </span>
              <p>
                <strong>Tenant Phone:</strong> {booking.phone}
              </p>
            </div>
            <div className="detail-section status-section">
              <strong>Status:</strong>
              <p
                className={`status ${
                  booking.bookingStatus === "pending"
                    ? "status-pending"
                    : "status-booked"
                }`}
              >
                {booking.bookingStatus}
              </p>
            </div>
          </div>
          <div className="actions-section">
            {booking.bookingStatus === "pending" ? (
              <Button
                onClick={() =>
                  handleStatus(booking._id, booking.propertyId, "booked")
                }
                className="action-button approve"
              >
                Approve
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleStatus(booking._id, booking.propertyId, "pending")
                }
                className="action-button revert"
              >
                Revert
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProperty;
