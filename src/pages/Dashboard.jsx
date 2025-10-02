import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { FaFileAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdNotifications } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaHourglassHalf } from 'react-icons/fa';
import './Dashboard.css'
import Button from '../Components/Button';
import Box from '../Components/Box';
import { addData, getAllData } from '../Helper/firebaseHelper';
export default function Dashboard(props) {


    const [totalCollegs, setTotalColleges] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    const [totalApplications, setTotalApplications] = useState(0)
    const [PendingApprovals, setPendingApprovals] = useState(0)



    const getTotalClg = async () => {
        const clgData = await getAllData("colleges")

        setTotalColleges(clgData.length)
        
    }

    const getTotalCourses = async () => {
        const userData = await getAllData("Courses")
        setTotalCourses(userData.length)
    }
    const getTotalApplications = async () => {
        const userData = await getAllData("Applications")
        setTotalApplications(userData.length)
    }
    const getPendingApprovals = async () => {
        const userData = await getAllData("Pending Approvals")
        setPendingApprovals(userData.length)

        // createdAt:new date()
    }
    useEffect(() => {

        getTotalClg()
        getTotalCourses()
        getTotalApplications()
        getPendingApprovals()


    }, []);
    const data = [
        { title: "Total Colleges", growth: "10%", number: '4', icon: < FaUniversity size={25} /> },
        { title: "Total courses", number: '9', icon: <GiOpenBook size={25} /> },
        { title: "Total Applications", growth: "20%", number: '100', icon: <  FaFileAlt size={25} /> },
        { title: "Pending Approval", growth: "12%", number: '8', icon: < FaHourglassHalf size={25} /> }

    ];
    return (
        <div>
            <Link to="/Dashboard"></Link>
            <a href="Dashboard"></a>
            <div style={{ width: 1090, height: 596, backgroundColor: '#D9D9D9', marginLeft: 228, marginTop: -616, padding: "10px", }}>
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
                <h2 style={{ marginLeft: 35, color: "#003366" }}>Dashboard </h2>
                <div style={{ display: 'flex', padding: 3, gap: "25px" }}>
                

                    <Box
                        Heading="Total courses"
                        totalnmbr={totalCourses}

                        // totalgrowth=""
                        icon={<  GiOpenBook size={25} color="#003366" />}
                    // arrow=""

                    />
                    <Box
                        Heading="Total colleges"
                        totalnmbr={totalCollegs}

                        // totalgrowth=""
                        icon={<  GiOpenBook size={25} color="#003366" />}
                    // arrow=""

                    />
                    <Box
                        Heading="Total Applications"
                        totalnmbr={totalApplications}
                        color="green"
                        // totalgrowth="5%"
                        icon={<  FaFileAlt size={25} color="#003366" />}
                    // arrow={<FaArrowUp size={10} color="#003366" />}

                    />
                    <Box
                        Heading="Pending Approval"
                        totalnmbr={PendingApprovals}
                        // totalgrowth="2%"
                        color="red"
                        icon={< FaHourglassHalf size={25} color="#003366" />}
                    // arrow={< FaArrowDown size={10} color="red" />}
                    />
                </div>
                <div style={{ height: 380, width: 1074, backgroundColor: '1px solid #ccc', display: 'flex', gap: '50px', marginBottom: -20 }} >
                    <div style={{ height: 345, width: 485, backgroundColor: 'white', marginTop: '20px', marginLeft: '13px', display: 'flex', gap: "30px" }}>
                        <div style={{ width: 700, height: 50, backgroundColor: 'white', padding: "10px" }}><h2> Recent colleges</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>College</th>
                                        <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Location</th>
                                        <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>MIT</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>Cambridge, MA</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(219, 247, 231)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Active</button></td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>Stanford</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>Stanford, CA</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(219, 247, 231)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Active</button></td>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>Berkeley College</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>Berkeley, CA</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>

                                    </tr>
                                </tbody>
                            </table>
                            <p style={{ marginTop: '15px', color: "#003366", fontWeight: 'bold', cursor: 'pointer', textAlign: "center" }}> View All Colleges
                            </p>
                        </div>
                    </div>
                    <div style={{ height: 340, width: 485, backgroundColor: 'white', marginTop: '20px', marginLeft: '25px', gap: "30px", display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: 52, width: "95.5%", backgroundColor: "white", padding: "10px" }}><h2>Recent Activity</h2></div>
                        <div style={{ height: 330, width: 460, backgroundColor: "white", marginLeft: 0, marginTop: "-40px" }}>
                            <div style={{ marginBottom: '-20px', }}>
                                <p style={{ margin: 0, fontWeight: 'bold', paddingLeft: "20px" }}>
                                    <span style={{ color: "#003366", fontSize: '40px' }}>.</span> New college registered</p>
                                <p style={{ margin: 0, marginLeft: "10px", paddingLeft: "20px" }}>Stanford University</p>
                                <p style={{ margin: 0, color: 'grey', fontSize: '13px', marginLeft: "10px", paddingLeft: "20px" }}>10 minutes ago</p>
                            </div>
                            <div style={{ marginBottom: '-20px' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', paddingLeft: "20px" }}>
                                    <span style={{ color: "#003366", fontSize: '40px' }}>.</span>Course approval request</p>
                                <p style={{ margin: 0, marginLeft: "10px", paddingLeft: "20px" }}>Advanced Machine Learning</p>
                                <p style={{ margin: 0, color: 'grey', fontSize: '13px', marginLeft: "10px", paddingLeft: "20px" }}>30 minutes ago</p>
                            </div>
                            <div style={{ marginBottom: '-20px' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', paddingLeft: "20px" }}>
                                    <span style={{ color: "#003366", fontSize: '40px' }}>.</span> Student application submitted</p>
                                <p style={{ margin: 0, marginLeft: "10px", paddingLeft: "20px" }}>Hadia to CS</p>
                                <p style={{ margin: 0, color: 'grey', fontSize: '13px', marginLeft: "10px", paddingLeft: "20px" }}>2 hours ago</p>
                            </div>
                            <div style={{ marginBottom: '-20px' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', paddingLeft: "20px" }}>
                                    <span style={{ color: "#003366", fontSize: '40px' }}>.</span>College status update</p>
                                <p style={{ margin: 0, marginLeft: "10px", paddingLeft: "20px" }}>harvard university is now active</p>
                                <p style={{ margin: 0, color: 'grey', fontSize: '13px', marginLeft: "10px", paddingLeft: "20px" }}>3 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}
