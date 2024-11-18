import { message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Tag } from "antd";
import {
  PhoneOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const AllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true); 

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/user/getallbookings`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error fetching bookings");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const renderStatusTag = (status) => {
    if (status === "approved") {
      return (
        <Tag color="green">
          Approved <CheckCircleOutlined />
        </Tag>
      );
    } else if (status === "pending") {
      return <Tag color="orange">Pending</Tag>;
    } else if (status === "rejected") {
      return (
        <Tag color="red">
          Rejected <CloseCircleOutlined />
        </Tag>
      );
    }
    return <Tag color="default">{status}</Tag>;
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h2 style={{textAlign:"center"}}>
        Booking History
      </h2>
      <Row gutter={16}>
        {allProperties.map((booking) => (
          <Col span={8} key={booking._id}>
            <Card hoverable style={{ width: "100%", marginBottom: "16px" }}>
              <Card.Meta
                title={`Booking ID: ${booking._id}`}
                description={`Property ID: ${booking.propertyId}`}
              />
              <div style={{ marginTop: 12 }}>
                <div>
                  <b>Tenant Name: </b> {booking.userName} <UserOutlined />
                </div>
                <div>
                  <b>Phone: </b>{" "}
                  <a href={`tel:${booking.phone}`}>
                    <PhoneOutlined /> {booking.phone}
                  </a>
                </div>
                <div style={{ marginTop: 8 }}>
                  <b>Status: </b> {renderStatusTag(booking.bookingStatus)}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllProperty;
