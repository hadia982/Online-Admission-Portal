import React from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa';
import { FaRegFileAlt } from "react-icons/fa";

function StdMg() {
    return (
        <div><Link to="/StdMg"></Link>
            <a href="StdMg"></a>
            <div style={{ height: 635, width:"100%", backgroundColor: ' #003366', marginTop: "-15px" }}>
                <h2 style={{ color: "white" }}>Student Management</h2>
                <div style={{ height: 550, width: 1100, backgroundColor: ' #003366', padding: "3px", gap:2}}>
                    <div style={{ height: 50, width: 1100, backgroundColor: '#D9D9D9', display: "flex", gap: 10 }}>
                        <h4 style={{ margin: 0 }}>Student Applications</h4>
                        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginLeft: "auto" }}>
                            <input type="text" placeholder="Search students..." style={{ padding: "5px 10px", width: 180, borderRadius: 8, border: "1px solid #ccc", height: 25 }} />
                            <button
                                style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", }}>Filter Students
                            </button>
                        </div>
                    </div>

                    <div style={{ height: 110, width: 1070, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ display: 'flex' }}><h3 style={{ color: "black", margin: 0 }}>Sarah Jhonson  <span style={{ backgroundColor: "#e6f7e6", color: "green", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" }}>Approved
                            </span></h3>
                            </div>
                            <h4 style={{ color: "grey", margin: 0 }}>sarah jhonson@email.com</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>Computer science</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>03094758398</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>Applied 2025-17-7</h4>
                        </div>
                        <div style={{ display: 'flex', padding: '5px', gap: 20 }}>
                            <span><FaRegFileAlt size={12} color="#003366" /> 4 doc</span>
                            <button style={{ padding: "5px 10px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white", display: "flex", alignItems: "center", gap: "5px" }}><FaEye color="#003366" /> View form
                            </button>

                        </div>
                    </div>
                    <div style={{ height: 110, width: 1070, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ display: 'flex' }}><h3 style={{ color: "black", margin: 0 }}>Hadia <span style={{ backgroundColor: 'orange', color: "yellow", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" }}>Pending
                            </span></h3>
                            </div>                            <h4 style={{ color: "grey", margin: 0 }}>Hadiaxyz@email.com</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>Computer science</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>03057839485</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>Applied 2025-18-9</h4>
                        </div>
                        <div style={{ display: 'flex', padding: '5px', gap: 20 }}>
                            <span style={{marginTop:"5px"}}><FaRegFileAlt size={12} color="#003366" /> 4 doc</span>
                            <button style={{ padding: "5px 10px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white", display: "flex", alignItems: "center", gap: "5px" }}><FaEye color="#003366" /> View form
                            </button>
                            {/* <button style={{backgroundColor:"green",color:"white",height:40}}> Approve</button>
                            <button style={{backgroundColor:"red",color:"white"}}> reject</button> */}

                        </div>
                    </div>
                    <div style={{ height: 110, width: 1070, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ display: 'flex' }}><h3 style={{ color: "black", margin: 0 }}>AlexDavid <span style={{ backgroundColor: "#7ecbf1ff", color: "white", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" }}>Review
                            </span></h3>
                            </div>
                            <h4 style={{ color: "grey", margin: 0 }}>AlexDavid@email.com</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>ADP</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>03027498557</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>Applied 2025-6-19</h4>
                        </div>
                        <div style={{ display: 'flex', padding: '5px', gap: 20 }}>
                            <span><FaRegFileAlt size={12} color="#003366" /> 4 doc</span>
                            <button style={{ padding: "5px 10px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white", display: "flex", alignItems: "center", gap: "5px" }}><FaEye color="#003366" /> View form
                            </button>

                        </div>
                    </div>
                    <div style={{ height: 110, width: 1070, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ display: 'flex' }}><h3 style={{ color: "black", margin: 0 }}>michaljhon  <span style={{ backgroundColor: "#e6f7e6", color: "green", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" }}>Approved
                            </span></h3>
                            </div>
                            <h4 style={{ color: "grey", margin: 0 }}>michaljhon@email.com</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>BS math</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>03948737489</h4>
                            <h4 style={{ color: "grey", margin: 0 }}>Applied 2025-18-9</h4>
                        </div>
                        <div style={{ display: 'flex', padding: '5px', gap: 20 }}>
                            <span><FaRegFileAlt size={12} color="#003366" /> 4 doc</span>
                            <button style={{ padding: "5px 10px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white", display: "flex", alignItems: "center", gap: "5px" }}><FaEye color="#003366" /> View form
                            </button>

                        </div>
                    </div>




                </div>
            </div>


        </div>
    )
}

export default StdMg