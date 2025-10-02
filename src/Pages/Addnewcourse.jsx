import React from 'react'
import { Link } from 'react-router-dom'

function Addnewcourse() {
    return (
        <div>
            <Link to="/SuccessS"> </Link>
            <a href="SuccessS"></a>
            <div style={{ height: 635, marginTop: "2px", width: 1120, backgroundColor: '#D9D9D9', display: "flex", justifyContent: "center", alignItems: "center", }}>
 <div style={{ width: "900px" }}>
 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                        <h2 style={{ color: '#003366' }}>Add new course</h2>
                       </div>
 <div style={{  backgroundColor: "white", borderRadius: "8px",padding: "20px"}}>
                        <h3 style={{ color: "#002147", marginBottom: "20px" }}>Add New Course</h3>
<div style={{ marginBottom: "15px", backgroundColor: "purple" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Course Name:</label>
                            <input type="text"placeholder="Enter course name"
                                style={{width: "90%",padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px", backgroundColor: "purple" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Description:</label>
                            <textarea
                                placeholder="Enter description"
                                style={{
                                    width: "90%",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc", height: 15
                                }}
                            />
                        </div>

                        <div style={{ display: "flex", gap: "15px", marginBottom: "15px", backgroundColor: "purple" }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Duration (Years):</label>
                                <input
                                    type="text"
                                    placeholder="4 years"
                                    style={{
                                        width: "80%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc"
                                    }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Fee:</label>
                                <input
                                    type="text"
                                    placeholder=" Rs 80,000"
                                    style={{
                                        width: "80%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "15px", marginBottom: "25px", backgroundColor: "purple" }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Total Seats:</label>
                                <input
                                    type="text"
                                    placeholder=" 300"
                                    style={{
                                        width: "80%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc"
                                    }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Status:</label>
                                <select
                                    style={{
                                        width: "85%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc"
                                    }}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>

                        
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <button style={{
                                backgroundColor: "#888",
                                color: "white",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer"
                            }}>
                                Cancel
                            </button>
                            <button style={{
                                backgroundColor: "#002147",
                                color: "white",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                               Add
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Addnewcourse