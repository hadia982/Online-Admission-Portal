import React from 'react'
import { Link } from 'react-router-dom'
import { MdAccountCircle } from "react-icons/md";
import { MdCall, MdVideocam, MdMoreVert } from "react-icons/md";

function Chat() {
    return (
        <div>
            <Link to="/SuccessS"> </Link>
            <a href="SuccessS">
                <div style={{ height: 635, width: 1120, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ height: 635, width: 400, backgroundColor: "white", border: '1px solid grey' }}>
                        <div style={{ height: 70, width: 400, backgroundColor: "white", gap: '5px' }}>
                            <h3 style={{ margin: 0, color: '#003366' }}>Messages</h3>
                            <input type="text" placeholder="search conversation" style={{ padding: '5px', width: 370, borderRadius: '10px', height: 20 }} />
                        </div>

                        <div style={{ height: 560, width: 400, backgroundColor: "white" }}>
                            <div style={{ height: 70, width: 400, backgroundColor: "white", gap: '0px', display: "flex", display: "flex", justifyContent: "space-between", alignItems: "center", border: '1px solid grey', borderRadius: 10, }}>

                                <div style={{ display: 'flex' }}>
                                    <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <MdAccountCircle size={40} color='#003366' />
                                    </div>
                                    <div style={{ height: 70, width: 200, backgroundColor: "white", }}>
                                        <h3 style={{ marginTop: '10px', color: 'black' }}>Jhon smith</h3>
                                        <h5 style={{ marginTop: '-20px', color: 'grey' }}>what docmument do i need....</h5>
                                    </div>
                                </div>
                                <div style={{ height: 70, width: 100, backgroundColor: "white" }}>
                                    <h6 style={{ marginTop: '10px', color: 'black', marginRight: '10px', textAlign: 'right' }}>10:35 AM</h6>

                                </div>
                            </div>
                            <div style={{ height: 70, width: 400, backgroundColor: "white", gap: '0px', display: "flex", display: "flex", justifyContent: "space-between", alignItems: "center", border: '1px solid grey', borderRadius: 10 }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <MdAccountCircle size={40} color='#003366' />
                                    </div>
                                    <div style={{ height: 70, width: 200, backgroundColor: "white", }}>
                                        <h3 style={{ marginTop: '10px', color: 'black' }}>David</h3>
                                        <h5 style={{ marginTop: '-20px', color: 'grey' }}>i submit my application</h5>
                                    </div>
                                </div>
                                <div style={{ height: 70, width: 100, backgroundColor: "white" }}>
                                    <h6 style={{ marginTop: '10px', color: 'black', marginRight: '10px', textAlign: 'right' }}>10:35 AM</h6>

                                </div>
                            </div>
                            <div style={{ height: 70, width: 400, backgroundColor: "white", gap: '0px', display: "flex", display: "flex", justifyContent: "space-between", alignItems: "center", border: '1px solid grey', borderRadius: 10 }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <MdAccountCircle size={40} color='#003366' />
                                    </div>
                                    <div style={{ height: 70, width: 200, backgroundColor: "white", }}>
                                        <h3 style={{ marginTop: '10px', color: 'black' }}>Alex</h3>
                                        <h5 style={{ marginTop: '-20px', color: 'grey' }}>when is the deadline?</h5>
                                    </div>
                                </div>
                                <div style={{ height: 70, width: 100, backgroundColor: "white" }}>
                                    <h6 style={{ marginTop: '10px', color: 'black', marginRight: '10px', textAlign: 'right' }}>11:00 AM</h6>

                                </div>
                            </div>
                            <div style={{ height: 70, width: 400, backgroundColor: "white", gap: '0px', display: "flex", display: "flex", justifyContent: "space-between", alignItems: "center", border: '1px solid grey', borderRadius: 10 }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <MdAccountCircle size={40} color='#003366' />
                                    </div>
                                    <div style={{ height: 70, width: 200, backgroundColor: "white", }}>
                                        <h3 style={{ marginTop: '10px', color: 'black' }}>Hadia</h3>
                                        <h5 style={{ marginTop: '-20px', color: 'grey' }}>thank uh for your help</h5>
                                    </div>
                                </div>
                                <div style={{ height: 70, width: 100, backgroundColor: "white" }}>
                                    <h6 style={{ marginTop: '10px', color: 'black', marginRight: '10px', textAlign: 'right' }}>07:11 AM</h6>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: 640, width: 717, backgroundColor: "white" }}>
                        <div style={{ height: 70, width: 715, backgroundColor: "white", gap: '0px', display: "flex", display: "flex", justifyContent: "space-between", alignItems: "center", border: '1px solid grey', borderRadius: 10 }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <MdAccountCircle size={40} color='#003366' />
                                </div>
                                <div style={{ height: 70, width: 200, backgroundColor: "white", }}>
                                    <h3 style={{ marginTop: '10px', color: 'black' }}>Hadia</h3>
                                    <h5 style={{ marginTop: '-20px', color: 'grey' }}>Online</h5>
                                </div>
                            </div>
                            <div style={{ height: 70, width: 200, backgroundColor: "white", display: 'flex', justifyContent: "space-around", alignItems: "center" }}>
                                <MdCall size={30} color="grey" />
                                <MdVideocam size={30} color="grey" />
                                <MdMoreVert size={30} color="grey" />
                            </div>
                        </div>
                        <div style={{ height: 90, width: 715, backgroundColor: "white", marginTop: "3px" }}>

                            <div style={{ display: 'flex' }}>
                                <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <MdAccountCircle size={40} color='#003366' />
                                </div>
                                <div style={{ height: 70, width: 300, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, }}>
                                    <h3 style={{ marginTop: '10px', color: 'black' }}>hey!i have a question about admission process.</h3>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: 90, width: 715, backgroundColor: "white" }}>
                            <div style={{ display: 'flex', justifyContent: "flex-end", marginBottom: "10px" }}>
                                <div style={{ height: 70, Width: 300, backgroundColor: "#67a3deff", border: "2px solid grey", borderRadius: "10px", padding: "0px", marginRight: "-1px" }}>
                                    <h3 style={{ marginTop: '10px', color: 'black', fontSize: "14px" }}>sure!i'll be happy to help uh.what kind of info do uh need?</h3>
                                </div>
                                <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <MdAccountCircle size={40} color='#003366' />
                                </div>
                            </div>


                        </div>
                        <div style={{ height: 90, width: 715, backgroundColor: "white", marginTop: "3px" }}>

                            <div style={{ display: 'flex' }}>
                                <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <MdAccountCircle size={40} color='#003366' />
                                </div>
                                <div style={{ height: 70, width: 300, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, }}>
                                    <h3 style={{ marginTop: '10px', color: 'black' }}>what docmuments do i need to submit for admission?</h3>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: 90, width: 715, backgroundColor: "white" }}>
                            <div style={{ display: 'flex', justifyContent: "flex-end", marginBottom: "10px" }}>
                                <div style={{ height: 70, Width: 300, backgroundColor: "#67a3deff", border: "2px solid grey", borderRadius: "10px", padding: "0px", marginRight: "-1px" }}>
                                    <h3 style={{ marginTop: '10px', color: 'black', fontSize: "14px" }}>You need National Identity Card (CNIC) / B-Form,Previous Academic Certificates,Character Certificate etc</h3>
                                </div>
                                <div style={{ height: 70, width: 55, backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <MdAccountCircle size={40} color='#003366' />
                                </div>
                            </div>


                        </div>


                    </div>
                </div>



            </a>
        </div>
    )
}

export default Chat