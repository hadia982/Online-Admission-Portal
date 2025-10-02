import React from 'react'
import { Link } from 'react-router-dom'
import { FaUniversity } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { FaFileAlt } from "react-icons/fa";
import { FaHourglassHalf } from 'react-icons/fa';
import { FaRegFileAlt } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { FaEye } from 'react-icons/fa';
import { FaUserPlus } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";



import Box from '../Components/Box';


function ClgDashboard() {
    return (
        <div ><Link to="/ClgDashboard"></Link>
            <a href="ClgDashboard"></a>
            <div style={{ height: 640, width: "100%", backgroundColor: '#D9D9D9', position: "relative", top: "-20px" }}>
                <h2 style={{ marginLeft: 35 }}>Dashboard </h2>
                <div style={{ display: 'flex', padding: "7px", gap: "25px", backgroundColor: '#D9D9D9', height: 95, width: 1060, alignItems: "center" }}>
                    <Box
                        Heading="Total Applications"
                        totalnmbr="1242"
                        color="#064784ff"
                        totalgrowth="+12% Recieved"
                        icon={<FaRegFileAlt size={20} color="#064784ff" />}
                    />
                    <Box
                        Heading="Approved Application"
                        totalnmbr="256"
                        color="#064784ff"
                        totalgrowth="+8% Approved"
                        icon={<  GiOpenBook size={25} color="#064784ff" />}
                        arrow=""

                    />
                    <Box
                        Heading="Pending Applications"
                        totalnmbr="201"
                        color="#064784ff"
                        totalgrowth="-5% Pending"
                        // icon={<  FaFileAlt size={25} color="green" />}
                        // arrow={<FaArrowUp size={10} color="green" />}
                        icon={<MdPendingActions size={20} color="#064784ff" />}


                    />
                    <Box
                        Heading="Reject Applications"
                        totalnmbr="8"
                        totalgrowth="-2% Rejected"
                        color="red"
                        // icon={< FaHourglassHalf size={25} color="green" />}
                        // arrow={< FaArrowDown size={10} color="red" />}
                        icon={<MdCancel size={20} color="red" />}
                    />
                </div>
                <div style={{ height: 435, width: "100%", backgroundColor: "red", marginTop: "15px", display: "flex" }}>
                    <div style={{ height: 435, width: "60%", backgroundColor: '#003366', border: "1.5px solid grey", }}>
                        <h3 style={{color:"white"}}> Recent Applications </h3>

                        {/* <table style={{ width: '99%', borderCollapse: 'collapse' ,padding:10}}> */}

                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid grey", display: "flex", justifyContent: "center", alignItems: "center", }}>
                            <div style={{ flex: "1", margin: " 20px" }}>
                                <h4 style={{ margin: 0, padding: 0 ,color:"black"}}>Sarah jhonson</h4>
                                <h5 style={{ margin: 0, padding: 0,color:"black" }}>Computer science = 3.34 GPA</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>Applied 2025-6-12</h6>
                            </div>
                            <div style={{ display: "flex", gap: "10px", margin: " 20px" }}>
                                {/* <div style={{ display: "flex", gap: "50px" ,marginLeft:'10'}}> */}
                                <button style={{ padding: "5px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white",cursor: "pointer",display: "flex", alignItems: "center", gap: "5px"  }}><FaEye color="#003366"/>View detail</button>
                                <button style={{ padding: "5px ", border: "1.5px solid red", cursor: 'pointer', borderRadius: "20px", background: "white",cursor: "pointer" }}>pending</button>
                                {/* </div> */}
                            </div>
                        </div>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid #003366", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <div style={{ flex: "1", margin: " 20px" }}>
                                <h4 style={{ margin: 0, padding: 0,color:"black" }}>Hadia</h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>Computer science = 3.61 GPA</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>Applied 2025-6-22</h6>
                            </div>
                            <div style={{ display: "flex", gap: "10px", margin: " 20px" }}>
                                {/* <div style={{ display: "flex", gap: "50px" ,marginLeft:'10'}}> */}
                                <button style={{ padding: "5px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white", gap: '10px' ,cursor: "pointer",display: "flex", alignItems: "center", gap: "5px" }}><FaEye color="#003366" />view detail</button>
                                <button style={{ padding: "5px ", border: "1.5px solid red", cursor: 'pointer', borderRadius: "20px", background: "white",cursor: "pointer" }}>pending</button>
                                {/* </div> */}
                            </div>
                        </div>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid #003366", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <div style={{ flex: "1", margin: " 20px" }}>
                                <h4 style={{ margin: 0, padding: 0 ,color:"black"}}>Aqsa</h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>ADP = 3.34 GPA</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>Applied 2025-6-11</h6>
                            </div>
                            <div style={{ display: "flex", gap: "10px", margin: " 20px" }}>
                                {/* <div style={{ display: "flex", gap: "50px" ,marginLeft:'10'}}> */}
                                <button style={{ padding: "5px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white",cursor: "pointer",display: "flex", alignItems: "center", gap: "5px"  }}><FaEye color="#003366" />view detail</button>
                                <button style={{ padding: "5px ", border: "1.5px solid red", cursor: 'pointer', borderRadius: "20px", background: "white" ,cursor: "pointer"}}>pending</button>
                                {/* </div> */}
                            </div>
                        </div>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid #003366", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <div style={{ flex: "1", margin: " 20px" }}>
                                <h4 style={{ margin: 0, padding: 0,color:"black" }}>David</h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>BS math = 3.04GPA</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>Applied 2025-6-25</h6>
                            </div>
                            <div style={{ display: "flex", gap: "10px", margin: " 20px" }}>
                                {/* <div style={{ display: "flex", gap: "50px" ,marginLeft:'10'}}> */}
                                <button style={{ padding: "5px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white",display: "flex", alignItems: "center", gap: "5px"  }}><FaEye color="#003366" />view detail</button>
                                <button style={{ padding: "5px ", border: "1.5px solid red",borderRadius: "20px", background: "white" ,cursor: "pointer"}}>pending</button>
                                {/* </div> */}
                            </div>
                        </div>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid grey", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <div style={{ flex: "1", margin: " 20px" }}>
                                <h4 style={{ margin: 0, padding: 0 ,color:"black"}}>Rimsha</h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>BS urdu = 3.77 GPA</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>Applied 2025-6-12</h6>
                            </div>
                            <div style={{ display: "flex", gap: "10px", margin: " 20px" }}>
                                {/* <div style={{ display: "flex", gap: "50px" ,marginLeft:'10'}}> */}
                                <button style={{ padding: "5px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white" ,display: "flex", alignItems: "center", gap: "5px" }}><FaEye color="#003366" />view detail</button>
                                <button style={{ padding: "5px ", border: "1.5px solid red", cursor: 'pointer', borderRadius: "20px", background: "white" }}>pending</button>
                                {/* </div> */}
                            </div>
                        </div>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "2px solid grey", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <div style={{ flex: "1", margin: " 20px" }}>
                                <h4 style={{ margin: 0, padding: 0,color:"black" }}>Alex</h4>
                                <h5 style={{ margin: 0, padding: 0,color:"black" }}>BS IT = 3.34 GPA</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>Applied 2025-6-12</h6>
                            </div>
                            <div style={{ display: "flex", gap: "10px", margin: " 20px" }}>
                                {/* <div style={{ display: "flex", gap: "50px" ,marginLeft:'10'}}> */}
                                <button style={{ padding: "5px", border: "1.5px solid #003366", cursor: 'pointer', borderRadius: "5px", background: "white", justifyContent: 'center' ,display: "flex", alignItems: "center", gap: "5px" }}><FaEye color="#003366" />view detail</button>
                                <button style={{ padding: "5px ", border: "1.5px solid red", cursor: 'pointer', borderRadius: "20px", background: "white" }}>pending</button>
                                {/* </div> */}
                            </div>
                        </div>
                        {/* </table> */}
                    </div>

                    <div style={{ height: 435, width: "40%", backgroundColor: '#003366', border: "1.5px solid grey" }}>
                        <h3 style={{color:"white"}}>Notifications</h3>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid grey", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ flex: "1", margin: " 30px" }}>
                                <h4 style={{ margin: 0, padding: 0,color:"black", display: "flex", alignItems: "center", gap: "6px", }}><FaUserPlus size={18} color="#003366" />New Applications Recieved <span style={{ backgroundColor: "#003366", color: "white", fontSize: "11px", padding: "2px 8px", borderRadius: "12px",  }}>new</span></h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>David applied for computer secience program</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>5 minutes ago</h6>
                            </div>
                        </div>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid grey", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ flex: "1", margin: " 30px" }}>
                                <h4 style={{ margin: 0, padding: 0,color:"black",display: "flex", alignItems: "center", gap: "6px", }}> <FaRegCommentDots size={18} color="#003366" />New chat recieved<span style={{ backgroundColor: "#003366", color: "white", fontSize: "11px", padding: "2px 8px", borderRadius: "12px",  }}>new</span></h4>
                                <h5 style={{ margin: 0, padding: 0, color:"black"}}>Sarah jhon send a message about her application</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>15 minutes ago</h6>
                            </div>
                        </div>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid grey", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ flex: "1", margin: " 30px" }}>
                                <h4 style={{ margin: 0, padding: 0 ,color:"black",display: "flex", alignItems: "center", gap: "6px",}}><FaTasks size={18} color="#003366" />Status update required <span style={{ backgroundColor: "#003366",color: "white", fontSize: "11px", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold"}}>new</span></h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>Review pending application for bussiness program</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>22 minutes ago</h6>
                            </div>
                        </div>
                        <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid grey", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ flex: "1", margin: " 30px" }}>
                                <h4 style={{ margin: 0, padding: 0 ,color:"black",display: "flex", alignItems: "center", gap: "6px",}}><FaRegCommentDots size={18} color="#003366" />New chat recieved<span style={{ backgroundColor: "#003366", color: "white", fontSize: "11px", padding: "2px 8px", borderRadius: "12px",  }}>new</span></h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>Alex send a message</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>3  minutes ago</h6>
                            </div>
                        </div>
                          <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid grey", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ flex: "1", margin: " 30px" }}>
                                <h4 style={{ margin: 0, padding: 0,color:"black", display: "flex", alignItems: "center", gap: "6px", }}><FaUserPlus size={18} color="#003366" />New Applications Recieved <span style={{ backgroundColor: "#003366", color: "white", fontSize: "11px", padding: "2px 8px", borderRadius: "12px",  }}>new</span></h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>Hadia applied for computer secience program</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>33 minutes ago</h6>
                            </div>
                        </div>
                           <div style={{ height: 60, width: "99%", flex: "1", backgroundColor: "white", gap: "0px", borderBottom: "1.5px solid grey", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ flex: "1", margin: " 30px" }}>
                                <h4 style={{ margin: 0, padding: 0 ,color:"black",display: "flex", alignItems: "center", gap: "6px",}}><FaTasks size={18} color="#003366" />Status update required <span style={{ backgroundColor: "#003366",color: "white", fontSize: "11px", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold"}}>new</span></h4>
                                <h5 style={{ margin: 0, padding: 0 ,color:"black"}}>Review pending application for bussiness program</h5>
                                <h6 style={{ margin: 0, padding: 0, color: "grey" }}>22 minutes ago</h6>
                            </div>
                        </div>


                    </div>



                </div>

            </div>


        </div>

    )
}

export default ClgDashboard