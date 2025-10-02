import React from 'react'
import { Link } from 'react-router-dom'
import Box from '../Components/Box';
import { MdCheckCircle } from "react-icons/md";
import { MdHourglassEmpty } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import {FaEye } from 'react-icons/fa';
import {FaFilter } from 'react-icons/fa';
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
function Status() {
    return (
        <div>
            <Link to="/SuccessS"> </Link>
            <a href="SuccessS"></a>
            <div style={{ height: 630, width: 1120, backgroundColor: '#D9D9D9', marginTop: "20px" }}>
                <div style={{ height: 55, width: 1120, backgroundColor: '#D9D9D9', marginTop: '-20px', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 >Application Status Display</h2>
                </div>
                <div style={{ display: 'flex', padding: "7px", gap: "25px", backgroundColor:'#D9D9D9', height: 95, width: 1060, alignItems: "center",marginLeft: "18px" }}>
                    <Box
                        Heading="Active Applications"
                        totalnmbr="3"
                        color="#064784ff"
                        icon={<MdCheckCircle size={25} color="green" />}
                    />
                    <Box
                        Heading="Pending Review"
                        totalnmbr="2"
                        color="#064784ff"
                        icon={<MdHourglassEmpty size={28} color="orange" />}


                    />
                    <Box
                        Heading="Rejected"
                        totalnmbr="1"
                        color="#064784ff"
                        icon={<MdBlock size={28} color="red" />}


                    />
                    <Box
                        Heading="Total Applications"
                        totalnmbr="6"
                        color="red"
                        icon={<MdAssignment size={28} color="blue" />}


                    />
                </div>


                <div style={{ height: 400, width: 950, backgroundColor: "#003366", padding: "30px", marginLeft: 40 }}>
                    <input type="text" placeholder="search by student name or program" style={{ padding: '10', width: 852, boarderadius: 5, height: 25, }} />
                    <button style={{ height: 30, width: 90, backgroundColor: 'white', float: 'right', marginLeft: 0, marginRight: -6, display: 'flex', alignItems: 'center', color: "black", cursor: 'pointer', justifyContent: 'center' }}><FaFilter />Status
                    </button>
                    <div style={{ height: 350, width: 950, backgroundColor: "white", marginTop: "15px" }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Student Name</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Review data</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Program</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Applied Date</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>status</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>John Smith</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>7/22/2024</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Computer Science</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Jan 15,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" /> <MdCheck size={20} color="green" /><MdClose size={20} color="red" />
                                    </td>

                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Sarah Johnson</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>10/02/2024</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Electrical Engineering</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>May 10,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" /><MdCheck size={20} color="green" /><MdClose size={20} color="red" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Michael Brown</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>22/10/2024</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Quantum Computing</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>May 8,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" /><MdCheck size={20} color="green" /><MdClose size={20} color="red" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Emily Davis</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>1/12/2024</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Business Administrator</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>May 1,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" /><MdCheck size={20} color="green" /><MdClose size={20} color="red" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Robert Wilson</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>05/03/2024</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>Machine Learning</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>apr 28,2023</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "20px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" /><MdCheck size={20} color="green" /><MdClose size={20} color="red" />
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

export default Status