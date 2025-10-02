import React from 'react';
import { Link } from 'react-router-dom'
import { MdNotifications } from "react-icons/md";
import { FaCheck, FaFilter, FaTimes } from 'react-icons/fa';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
export default function Applications(props) {
    return (
        <div>
            <Link to="/Applications"></Link>
            <a href="Applications"></a>
            <div style={{ width: 1090, height: 616, backgroundColor: '#D9D9D9', marginLeft: 228, marginTop: -616 }}>

                <div style={{ backgroundColor: '#D9D9D9', width: 1020, height: 30 }}>
                <input type="text" placeholder="search" style={{ padding: '10', width: 900, boarderadius: 10, height: 25,marginTop:10,marginLeft:30 }} />
                    <div style={{ height: 31, width: 80, backgroundColor: 'white', float: 'right', marginLeft: 9, marginRight: -20,marginTop:10 }}>
                        <div style={{ display: "flex", height: 30, width: 30, backgroundColor: "#003366", float: 'right', borderRadius: '50%', textAlign: 'center', fontWeight: 'bold', color: 'white', alignContent: 'center', justifyContent: "space-around", alignItems: 'center', marginRight: 6 }}>AD
                        </div>
                        <div style={{ display: "flex", height: 30, width: 30, float: 'left', marginLeft: 6, justifyContent: 'center', alignItems: 'center' }}>
                            <MdNotifications size={25} color="black" />
                        </div>
                    </div>
                </div>
                <h2 style={{marginLeft:35,color:"#003366"}}>Student Application</h2>
                <div style={{ height: 400, width: 950, backgroundColor: "#003366", padding: "30px", marginLeft: 40 }}>
                    <input type="text" placeholder="search" style={{ padding: '10', width: 852, boarderadius: 5, height: 25, }} />
                    <button style={{ height: 30, width: 90, backgroundColor: 'white', float: 'right', marginLeft: 0, marginRight: -6, display: 'flex', alignItems: 'center', color: "black", cursor: 'pointer', justifyContent: 'center' }}><FaFilter />Status
                    </button>
                    <div style={{ height: 345, width: 950, backgroundColor: "white", marginTop: "15px" }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Student Name</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>College</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Computer Science</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Applied Date</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>status</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>John Smith</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>MIT</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Computer Science</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Jan 15,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" />
                                    </td>

                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Sarah Johnson</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Standard Univeristy</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Electrical Engineering</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>May 10,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(219, 247, 231)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Active</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Michael Brown</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>MIT</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Quantum Computing</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>May 8,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Emily Davis</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Harward University</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Business Administrator</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>May 1,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(219, 247, 231)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Active</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Robert Wilson</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Berkelely College</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Machine Learning</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>apr 28,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(248, 181, 104)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Blocked</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}