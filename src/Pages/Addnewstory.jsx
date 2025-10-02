import React from 'react'
import { Link } from 'react-router-dom'

function Addnewstory() {
  return (
    <div>
        <Link to="/SuccessS"> </Link>
            <a href="SuccessS"></a>
         <div style={{ height: 635, marginTop: "2px", width: 1120, backgroundColor: '#D9D9D9', display: "flex", justifyContent: "center", alignItems: "center", }}>


                <div style={{ width: "900px" }}>

                    {/* Heading and Button */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                        <h2 style={{ color: '#003366' }}>Add new story</h2>
                        {/* <button style={{
                            backgroundColor: "#002147",
                            color: "white",
                            // padding: "10px 15px",
                            borderRadius: "5px",
                            // border: "none",
                            cursor: "pointer"
                        }}>
                            + Add new courses
                        </button> */}
                    </div>

                    {/* Form Card */}
                    <div style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "20px",
                        // boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
                    }}>
                        <h3 style={{ color: "#002147", marginBottom: "20px" }}>Add New story</h3>

                        {/* Course Name */}
                        <div style={{ marginBottom: "15px", backgroundColor: "purple" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Student Name:</label>
                            <input
                                type="text"
                                placeholder="Enter student name"
                                style={{
                                    width: "90%",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: "15px", backgroundColor: "purple" }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Success story:</label>
                            <textarea
                                placeholder="Enter story"
                                style={{
                                    width: "90%",
                                    padding: "50px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc", height: 15
                                    // resize: "none"
                                }}
                            />
                        </div>

                        {/* Duration & Fee */}
                        <div style={{ display: "flex", gap: "15px", marginBottom: "15px", backgroundColor: "purple" }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>session (Years):</label>
                                <input
                                    type="text"
                                    placeholder="2021-2024"
                                    style={{
                                        width: "80%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc"
                                    }}
                                />
                            </div>
                            {/* <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>program:</label>
                                <input
                                    type="text"
                                    placeholder=" Computer science"
                                    style={{
                                        width: "80%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc"
                                    }}
                                />
                            </div> */}
                        </div>

                        {/* Seats & Status */}
                        <div style={{ display: "flex", gap: "15px", marginBottom: "25px", backgroundColor: "purple" }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>program:</label>
                                <input
                                    type="text"
                                    placeholder=" computer science"
                                    style={{
                                        width: "80%",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc"
                                    }}
                                />
                            </div>
                            {/* <div style={{ flex: 1 }}>
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
                            </div> */}
                        </div>

                        {/* Buttons */}
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <button style={{
                                backgroundColor: "#888",
                                color: "white",
                                // padding: "10px 20px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer"
                            }}>
                                Cancel
                            </button>
                            <button style={{
                                backgroundColor: "#002147",
                                color: "white",
                                // padding: "10px 20px",
                                borderRadius: "5px",
                                // border: "none",
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

export default Addnewstory