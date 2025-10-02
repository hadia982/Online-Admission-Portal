import React from 'react'
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
function CourseMg() {
    return (
        <div>
            <Link to="/StdMg"></Link>
            <a href="StdMg"></a>
            <div style={{ height: 635, width: 1120, backgroundColor: '#D9D9D9', }}>

                <div style={{ height: 70, width: 1120, backgroundColor: '#D9D9D9', display: "flex", gap: 10 }}>
                    <h2 style={{ color: "#003366", margin: 0 }}>Course Management</h2>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", marginLeft: "auto" }}>
                        <button
                            style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", }}>+ Add new courses
                        </button>
                    </div>
                </div>
                <div style={{ height: 560, width: 1115, backgroundColor: "orange" }}>
                    <div style={{ height: 280, width: 1115, backgroundColor: "#003366", display: 'flex', gap: '30px' }}>
                        <div style={{ height: 250, width: 500, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9 }}>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ backgroundColor: 'white', height: 40, width: 200, display: "flex", alignItems: "center", paddingLeft: 17 }}>
                                    <h3 style={{ margin: -20, fontSize: 19, color: "black", font: 'bold' }}>Computer Science</h3>
                                </div>
                                <div style={{ backgroundColor: "white", height: 35, width: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px" }}>
                                    <div style={{ height: 30, width: 45, backgroundColor: '#D9D9D9', gap: 5, justifyContent: 'center', alignItems: "center", display: 'flex', border: "1px solid grey", borderRadius: 10 }}><FaEdit size={20} color="black" /></div>
                                    <div style={{ height: 30, width: 45, backgroundColor: '#D9D9D9', gap: 5, justifyContent: 'center', alignItems: "center", display: 'flex', border: "1px solid grey", borderRadius: 10 }}><FaTrash size={20} color="black" /></div>
                                </div>
                            </div>
                            <div style={{ height: 30, width: 90, backgroundColor: "white" }}>
                                <div style={{ height: 20, width: 60, backgroundColor: "#003366", border: "1px solid grey", borderRadius: 10, color: "white", alignItems: 'center', justifyContent: "center", display: 'flex' }}>Active</div>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", marginTop: -15 }}>
                                <p style={{ fontSize: 13 }}>description: "Comprehensive program covering programming, algorithms, and software development",</p>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ backgroundColor: '#D9D9D9', height: 26, width: 370, display: "flex", alignItems: "center", paddingLeft: 20, marginBottom: 20, gap: "100px" }}>
                                    <h3 style={{ margin: 0, fontSize: 16, color: "black", display: "flex", alignItems: "center", gap: "5px" }}><FaClock size={14} color="black" />4 years</h3>
                                    <h4>RS 83,000</h4>
                                </div>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "'#D9D9D9'", marginTop: -15 }}>
                                <h3 style={{ fontSize: 14, display: "flex", alignItems: "center", gap: "6px", margin: 6 }}> <FaUsers size={18} color="#003366" />245/300 enrolled   <FaBarsProgress size={40} color="#003366" style={{ marginLeft: "90px" }} /></h3>
                            </div>
                            <div style={{ height: 50, width: 490, backgroundColor: '#D9D9D9', marginTop: "10px", justifyContent: "space-between", alignItems: "center", padding: "5px", display: 'flex' }}>
                                <button
                                    style={{ backgroundColor: "white", color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 240 }}>View Applications
                                </button>
                                <button
                                    style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 240 }}>Update Status
                                </button>
                            </div>
                        </div>
                        <div style={{ height: 250, width: 500, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9 }}>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ backgroundColor: 'white', height: 40, width: 200, display: "flex", alignItems: "center", paddingLeft: 17 }}>
                                    <h3 style={{ margin: 0, fontSize: 19, color: "black", font: 'bold', margin: -20 }}>Engineering</h3>
                                </div>
                                <div style={{ backgroundColor: "white", height: 35, width: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px" }}>
                                    <div style={{ height: 30, width: 45, backgroundColor: '#D9D9D9', gap: 5, justifyContent: 'center', alignItems: "center", display: 'flex', border: "1px solid grey", borderRadius: 10 }}><FaEdit size={20} color="black" /></div>
                                    <div style={{ height: 30, width: 45, backgroundColor: '#D9D9D9', gap: 5, justifyContent: 'center', alignItems: "center", display: 'flex', border: "1px solid grey", borderRadius: 10 }}><FaTrash size={20} color="black" /></div>
                                </div>
                            </div>
                            <div style={{ height: 30, width: 90, backgroundColor: "white" }}>
                                <div style={{ height: 20, width: 60, backgroundColor: "#003366", border: "1px solid grey", borderRadius: 10, color: "white", alignItems: 'center', justifyContent: "center", display: 'flex' }}>Active</div>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", marginTop: -15 }}>
                                <p style={{ fontSize: 13 }}>description: "Multi-disciplinary engineering program with specializations in various fields",</p>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ backgroundColor: '#D9D9D9', height: 26, width: 370, display: "flex", alignItems: "center", paddingLeft: 20, marginBottom: 20, gap: "100px" }}>
                                    <h3 style={{ margin: 0, fontSize: 16, color: "black", display: "flex", alignItems: "center", gap: "5px" }}><FaClock size={14} color="black" />4 years</h3>
                                    <h4>RS 95,000</h4>
                                </div>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "'#D9D9D9'", marginTop: -15 }}>
                                <h3 style={{ fontSize: 14, display: "flex", alignItems: "center", gap: "6px", margin: 6 }}> <FaUsers size={18} color="#003366" />276/400 enrolled   <FaBarsProgress size={40} color="#003366" style={{ marginLeft: "90px" }} /></h3>
                            </div>
                            <div style={{ height: 50, width: 490, backgroundColor: '#D9D9D9', marginTop: "10px", justifyContent: "space-between", alignItems: "center", padding: "5px", display: 'flex' }}>
                                <button
                                    style={{ backgroundColor: "white", color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 240 }}>View Applications
                                </button>
                                <button
                                    style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 240 }}>Update Status
                                </button>
                            </div>
                        </div>
                    </div>


    <div style={{ height: 280, width: 1115, backgroundColor: "#003366", display: 'flex', gap: '30px' }}>
                        <div style={{ height: 250, width: 500, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9 }}>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ backgroundColor: 'white', height: 40, width: 200, display: "flex", alignItems: "center", paddingLeft: 17 }}>
                                    <h3 style={{ margin: -20, fontSize: 19, color: "black", font: 'bold' }}>Business Administration</h3>
                                </div>
                                <div style={{ backgroundColor: "white", height: 35, width: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px" }}>
                                    <div style={{ height: 30, width: 45, backgroundColor: '#D9D9D9', gap: 5, justifyContent: 'center', alignItems: "center", display: 'flex', border: "1px solid grey", borderRadius: 10 }}><FaEdit size={20} color="black" /></div>
                                    <div style={{ height: 30, width: 45, backgroundColor: '#D9D9D9', gap: 5, justifyContent: 'center', alignItems: "center", display: 'flex', border: "1px solid grey", borderRadius: 10 }}><FaTrash size={20} color="black" /></div>
                                </div>
                            </div>
                            <div style={{ height: 30, width: 90, backgroundColor: "white" }}>
                                <div style={{ height: 20, width: 60, backgroundColor: "#003366", border: "1px solid grey", borderRadius: 10, color: "white", alignItems: 'center', justifyContent: "center", display: 'flex' }}>Active</div>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", marginTop: -15 }}>
                                <p style={{ fontSize: 13 }}>description: "Comprehensive business program covering management, finance, and marketing",</p>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ backgroundColor: '#D9D9D9', height: 26, width: 370, display: "flex", alignItems: "center", paddingLeft: 20, marginBottom: 20, gap: "100px" }}>
                                    <h3 style={{ margin: 0, fontSize: 16, color: "black", display: "flex", alignItems: "center", gap: "5px" }}><FaClock size={14} color="black" />4 years</h3>
                                    <h4>RS 83,000</h4>
                                </div>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "'#D9D9D9'", marginTop: -15 }}>
                                <h3 style={{ fontSize: 14, display: "flex", alignItems: "center", gap: "6px", margin: 6 }}> <FaUsers size={18} color="#003366" />245/300 enrolled   <FaBarsProgress size={40} color="#003366" style={{ marginLeft: "90px" }} /></h3>
                            </div>
                            <div style={{ height: 50, width: 490, backgroundColor: '#D9D9D9', marginTop: "10px", justifyContent: "space-between", alignItems: "center", padding: "5px", display: 'flex' }}>
                                <button
                                    style={{ backgroundColor: "white", color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 240 }}>View Applications
                                </button>
                                <button
                                    style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 240 }}>Update Status
                                </button>
                            </div>
                        </div>
                        <div style={{ height: 250, width: 500, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9 }}>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ backgroundColor: 'white', height: 40, width: 200, display: "flex", alignItems: "center", paddingLeft: 17 }}>
                                    <h3 style={{ margin: 0, fontSize: 19, color: "black", font: 'bold', margin: -20 }}>Medicine</h3>
                                </div>
                                <div style={{ backgroundColor: "white", height: 35, width: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px" }}>
                                    <div style={{ height: 30, width: 45, backgroundColor: '#D9D9D9', gap: 5, justifyContent: 'center', alignItems: "center", display: 'flex', border: "1px solid grey", borderRadius: 10 }}><FaEdit size={20} color="black" /></div>
                                    <div style={{ height: 30, width: 45, backgroundColor: '#D9D9D9', gap: 5, justifyContent: 'center', alignItems: "center", display: 'flex', border: "1px solid grey", borderRadius: 10 }}><FaTrash size={20} color="black" /></div>
                                </div>
                            </div>
                            <div style={{ height: 30, width: 90, backgroundColor: "white" }}>
                                <div style={{ height: 20, width: 60, backgroundColor: "#003366", border: "1px solid grey", borderRadius: 10, color: "white", alignItems: 'center', justifyContent: "center", display: 'flex' }}>Active</div>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", marginTop: -15 }}>
                                <p style={{ fontSize: 13 }}>description: "Pre-medical program preparing students for medical school",</p>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ backgroundColor: '#D9D9D9', height: 26, width: 370, display: "flex", alignItems: "center", paddingLeft: 20, marginBottom: 20, gap: "100px" }}>
                                    <h3 style={{ margin: 0, fontSize: 16, color: "black", display: "flex", alignItems: "center", gap: "5px" }}><FaClock size={14} color="black" />4 years</h3>
                                    <h4>RS 83,000</h4>
                                </div>
                            </div>
                            <div style={{ height: 40, width: 500, backgroundColor: "'#D9D9D9'", marginTop: -15 }}>
                                <h3 style={{ fontSize: 14, display: "flex", alignItems: "center", gap: "6px", margin: 6 }}> <FaUsers size={18} color="#003366" />245/300 enrolled   <FaBarsProgress size={40} color="#003366" style={{ marginLeft: "90px" }} /></h3>
                            </div>
                            <div style={{ height: 50, width: 490, backgroundColor: '#D9D9D9', marginTop: "10px", justifyContent: "space-between", alignItems: "center", padding: "5px", display: 'flex' }}>
                                <button
                                    style={{ backgroundColor: "white", color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 240 }}>View Applications
                                </button>
                                <button
                                    style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 240 }}>Update Status
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CourseMg