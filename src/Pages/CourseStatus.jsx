import React from 'react'
import { Link } from 'react-router-dom'
import { MdManageAccounts } from "react-icons/md";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

function CourseStatus() {
    return (
        <div>
            <Link to="/ClgDashboard"></Link>
            <a href="ClgDashboard"></a>
            <div style={{ height: 635, marginTop: "15px", width: 1120, backgroundColor: '#003366' }}>

                <div style={{ height: 80, width: 1120, backgroundColor: '#D9D9D9', marginTop: '-20px', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ marginLeft: "10px" }}><MdManageAccounts size={28} color="black" /> Course update status</h2>
                </div>

                <div style={{ height: 560, width: 1120, backgroundColor: '#003366', display: "flex", justifyContent: "center", alignItems: "center", }}>

                    <div style={{ height: 500, width: 600, backgroundColor: "white", borderRadius: "15px", padding: "20px" }}>

                        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#003366" }}>
                            Update Course Status
                        </h2>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontWeight: "bold" }}>Course Status</label>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                                <span>Active</span>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <FaRegSquare size={22} color="grey" />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontWeight: "bold" }}>Enrolled Seats Capacity</label>
                            <input
                                type="text"
                                placeholder="300"
                                style={{
                                    marginTop: "8px",
                                    padding: "8px",
                                    width: "100%",
                                    borderRadius: "8px",
                                    border: "1px solid grey"
                                }}
                            />
                        </div>

                      
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontWeight: "bold" }}>Course Fee (Rs)</label>
                            <input
                                type="text"
                                placeholder="83000"
                                style={{
                                    marginTop: "8px",
                                    padding: "8px",
                                    width: "100%",
                                    borderRadius: "8px",
                                    border: "1px solid grey"
                                }}
                            />
                        </div>

                      
                        <div style={{ marginBottom: "30px" }}>
                            <label style={{ fontWeight: "bold" }}>Admissions</label>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                                <span>Open</span>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <FaRegSquare size={22} color="grey" />
                                </div>
                            </div>
                        </div>

                       
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <button style={{ backgroundColor: "green", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                                Save Changes
                            </button>
                            <button style={{ backgroundColor: "red", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                                Cancel
                            </button>
                        </div>

                    </div>


                </div>
            </div>

        </div>
    )
}

export default CourseStatus