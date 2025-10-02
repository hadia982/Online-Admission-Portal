import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { MdNotifications } from "react-icons/md";
import { FaFilter } from 'react-icons/fa';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function Colleges(props) {

    const [colleges, setcolleges] = useState([
        { id: 1, name: "iqra University", location: "49 tail", contact: "+92 21 1234567", status: "pending", joinDate: "20-12-2023" },
        { id: 2, name: "UCP", location: "Sargodha, PK", contact: "+92 42 9876543", status: "pending", joinDate: "Feb 20, 2023" },
        { id: 3, name: "Superior University", location: "Sargodha, PK", contact: "+92 42 2223334", status: "pending", joinDate: "Mar 10, 2023" },
        { id: 4, name: "ITM", location: "Sargodha, PK", contact: "+92 51 7654321", status: "pending", joinDate: "Apr 25, 2023" }


    ]);




    return (
        <div>
            <Link to="/Colleges"></Link>
            <a href="Colleges"></a>
            <div style={{ width: 1090, height: 616, backgroundColor: '#D9D9D9', marginLeft: 228, marginTop: -616 }}>

                <div style={{ backgroundColor: '#D9D9D9', width: 1020, height: 30 }}>
                    <input type="text" placeholder="search" style={{ padding: '10', width: 900, boarderadius: 10, height: 25, marginTop: 10, marginLeft: 30 }} />
                    <div style={{ height: 31, width: 80, backgroundColor: 'white', float: 'right', marginLeft: 9, marginRight: -20, marginTop: 10 }}>
                        <div style={{ display: "flex", height: 30, width: 30, backgroundColor: "#003366", float: 'right', borderRadius: '50%', textAlign: 'center', fontWeight: 'bold', color: 'white', alignContent: 'center', justifyContent: "space-around", alignItems: 'center', marginRight: 6 }}>AD
                        </div>
                        <div style={{ display: "flex", height: 30, width: 30, float: 'left', marginLeft: 6, justifyContent: 'center', alignItems: 'center' }}>
                            <MdNotifications size={25} color="black" />
                        </div>
                    </div>
                </div>
                <h2 style={{ marginLeft: 35, color: "#003366" }}>College Management</h2>
                <div style={{ height: 400, width: 950, backgroundColor: "#003366", padding: "30px", marginLeft: 40 }}>
                    <div style={{ height: 30, width: 950, backgroundColor: "#003366" }}>
                        <input type="text" placeholder="search" style={{ padding: '10', width: 852, boarderadius: 5, height: 25, }} />
                        <button style={{ height: 30, width: 90, backgroundColor: 'white', float: 'right', marginLeft: 0, marginRight: -6, display: 'flex', alignItems: 'center', color: "black", cursor: 'pointer', justifyContent: 'center' }}><FaFilter />Status</button>
                    </div>
                    <div style={{ height: 345, width: 950, backgroundColor: "white", marginTop: "15px" }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>College Name</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Location</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Contact</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>status</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Join Date</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {colleges.map((clg) => (

                                    <tr key={clg.id}>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{clg.name}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{clg.location}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{clg.contact}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                                            <button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>{clg.status}</button></td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{clg.joinDate}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaCheck color="green" /><FaTimes color="red" />
                                        </td>

                                    </tr>
                                    // <tr>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Stanford university</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Stanford,CA</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>+(648) 673-1470</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Feb 23,2024</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaCheck color="green" /><FaTimes color="red" />
                                    //     </td>
                                    // </tr>
                                    // <tr>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Berkelely University</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Berkelely University,CA</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>+(448) 563-2340</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Mar 13,2000</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaCheck color="green" /><FaTimes color="red" />
                                    //     </td>
                                    // </tr>
                                    // <tr>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Harvard University</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Cambridge, MA</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>+(138) 333-3340</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Dec 5,2023</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaCheck color="green" /><FaTimes color="red" />
                                    //     </td>
                                    // </tr>
                                    // <tr>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>Yale University</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>New Heaven,CT</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>+(208) 754-4771</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px' }}>apr 22,2023</td>
                                    //     <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaCheck color="green" /><FaTimes color="red" />
                                    //     </td>
                                    // </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}