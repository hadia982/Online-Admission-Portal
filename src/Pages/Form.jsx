import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegFileAlt } from "react-icons/fa";


function form() {
    return (
        <div>
            <Link to="/ClgDashboard"></Link>
            <a href="ClgDashboard"></a>


            <div style={{ height: 630, width: 1120, backgroundColor: ' #003366', marginTop: "-15px" }}>
                <h2 style={{ color: "white", padding: "10px", marginLeft: "5px" }}>Student application form</h2>

                <div style={{ height: 500, width: 1050, backgroundColor: "white", borderRadius: "10px", padding: "20px", marginLeft: '10px' }}>

                 
                    <div style={{ marginBottom: "20px", borderBottom: "1px solid grey", paddingBottom: "20px", backgroundColor: "pink" }}>
                        <h3 style={{ margin: 0, color: "#003366" }}>Personal information</h3>
                        <div style={{ display: "flex", gap: "40px", marginTop: "10px", backgroundColor: "green" }}>
                            <div>
                                <h4 style={{ margin: 0 }}>Full Name:</h4>
                                <p style={{ margin: 0, color: "grey" }}>Sarah Johnson</p>
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Father's Name:</h4>
                                <p style={{ margin: 0, color: "grey" }}>David Johnson</p>
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Gender:</h4>
                                <p style={{ margin: 0, color: "grey" }}>Female</p>
                            </div>
                        </div>
                    </div>


                    <div style={{ marginBottom: "20px", borderBottom: "1px solid grey", paddingBottom: "10px", backgroundColor: "pink" }}>
                        <h3 style={{ margin: 0, color: "#003366" }}>Contact Information</h3>
                        <div style={{ display: "flex", gap: "40px", marginTop: "10px", backgroundColor: "green" }}>
                            <div>
                                <h4 style={{ margin: 0 }}>Email:</h4>
                                <p style={{ margin: 0, color: "grey" }}>sarah.j@email.com</p>
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Phone:</h4>
                                <p style={{ margin: 0, color: "grey" }}>0309-4758398</p>
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Address:</h4>
                                <p style={{ margin: 0, color: "grey" }}>Lahore, Pakistan</p>
                            </div>
                        </div>
                    </div>


                    <div style={{ marginBottom: "20px", borderBottom: "1px solid grey", paddingBottom: "10px", backgroundColor: "pink" }}>
                        <h3 style={{ margin: 0, color: "#003366" }}>Academic Information</h3>
                        <div style={{ background: "green", display: "flex", gap: "40px", marginTop: "10px" }}>
                            <div>
                                <h4 style={{ margin: 0 }}>Program Applied:</h4>
                                <p style={{ margin: 0, color: "grey" }}>BS Computer Science</p>
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Previous Qualification:</h4>
                                <p style={{ margin: 0, color: "grey" }}>Intermediate (Pre-Engineering)</p>
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Applied Date:</h4>
                                <p style={{ margin: 0, color: "grey" }}>2025-07-17</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ marginBottom: "20px" ,backgroundColor:"pink"}}>
                        <h3 style={{ margin: 0, color: "#003366" }}>Uploaded Documents</h3>
                        <div style={{ display: "flex", gap: "20px", marginTop: "10px",backgroundColor:"green" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <FaRegFileAlt color="#003366" /> CNIC.pdf
                            </span>
                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <FaRegFileAlt color="#003366" /> Matric Certificate.pdf
                            </span>
                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <FaRegFileAlt color="#003366" /> Intermediate Result.pdf
                            </span>
                            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <FaRegFileAlt color="#003366" /> Picture.jpg
                            </span>
                        </div>
                    </div>

                    
                    <div style={{ display: "flex", gap: "20px", marginTop: "30px" ,backgroundColor:"pink"}}>
                        <button style={{ backgroundColor: "green", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Approve</button>
                        <button style={{ backgroundColor: "red", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Reject</button>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default form