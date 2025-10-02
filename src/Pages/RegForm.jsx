import React, { useState } from "react";
import { db } from "./firebase"; // firebase config import
import { collection, addDoc } from "firebase/firestore";

const CollegeRegister = () => {
  const [collegeName, setCollegeName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "collegeRequests"), {
        collegeName,
        email,
        address,
        contact,
        status: "pending", // waiting for admin approval
        createdAt: new Date()
      });

      alert("Your request has been sent to Admin for approval.");
      setCollegeName("");
      setEmail("");
      setAddress("");
      setContact("");
    } catch (error) {
      console.error("Error sending request: ", error);
      alert("Failed to send request. Try again!");
    }
  };

  return (
    
    <div style={styles.container}>
      <h2 style={styles.heading}>College Registration</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="College Name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.btn}>Send Request</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" },
  heading: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" },
  input: { margin: "10px 0", padding: "10px", borderRadius: "5px", border: "1px solid #aaa" },
  btn: { padding: "12px", background: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }
};

export default CollegeRegister;