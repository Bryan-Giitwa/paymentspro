import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "US",
    pincode: "",
    amount: "",
    currency: "USD",
    cardType: "",
    cardName: "",
    cardNumber: "",
    cardCVV: "",
    cardExpYear: "",
    cardExpMonth: "",
    orderID: "",
    clientIP: "0.0.0.0",
    redirectURL: "https://domain.com/callback.php",
    webhookURL: "https://domain.com/callback.php",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment",
        formData
      );
      alert("Payment Status: " + response.data.message);
    } catch (error) {
      alert(
        "Error: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
