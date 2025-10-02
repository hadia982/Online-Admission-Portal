import React from 'react'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
// import Std1 from "./Std1.PNG";
import std2 from "../std2.jpeg";
import std1 from "./std1.png";
import std4 from "../std4.jpeg";
import std3 from "../std3.jpeg";
function SuccessS() {
    return (
        <div>
            <Link to="/SuccessS"> </Link>
            <a href="SuccessS"></a>
            <div style={{ height: 635, width: 1120, backgroundColor: ' #003366', marginTop: "-3px" }}>
                <div style={{ height: 70, width: 1120, backgroundColor: '#D9D9D9', display: "flex", gap: 10 }}>
                    <h2 style={{ color: "#003366", margin: 5 }}>Success stories</h2>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", marginLeft: "auto" }}>
                        <button
                            style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", }}>+ Add new story
                        </button>
                    </div>
                </div>
                <div style={{ height: 560, width: 1115, backgroundColor: "orange" }}>
                    <div style={{ height: 280, width: 1115, backgroundColor: "#003366", display: 'flex', gap: '30px' }}>
                        <div style={{ height: 250, width: 500, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9, display: 'flex' }}>
                            <div style={{ height: 250, width: 200, backgroundColor: "grey" }}>
                                {/* <img src={std1} alt="std1" style={{ width: 200, height: 250 }} /> */}
                                {/* <img src={Std1} alt="std1" style={{ width: 200, height: 250 }} /> */}
                                <img src={std1} alt="Student" style={{ width: "200px", height: "100" }} />                            </div>
                            <div style={{ height: 250, width: 300, backgroundColor: "white", marginLeft: '4px' }}>
                                <div style={{ height: 50, width: 300, backgroundColor: "white", marginBottom: '-20px', display: 'flex', marginRight: 10, justifyContent: "space-between" }}>
                                    <div style={{ height: 45, width: 150, backgroundColor: "white" }}>
                                        <h3 style={{ fontSize: 22, marginTop: 10 }}>Emily Jhonson</h3>
                                    </div>
                                    <div style={{ height: 50, width: 120, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        {/* <div style={{ display: "flex", gap: "6px" }}><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div style={{ height: 20, width: 300, backgroundColor: "white", marginTop: "5px" }}>
                                    <h5>Computer science(sesion 2021 -2025)</h5>
                                </div>
                                <div style={{ height: 50, width: 300, backgroundColor: "white", marginTop: "10px" }}>
                                    <h5 style={{ marginTop: 0 }}>Secured Gold Medal in Computer Science and received a full scholarship for MS in the UK.</h5>
                                </div>
                                <div style={{ height: 70, width: "300", backgroundColor: "white", color: "grey", marginTop: '-25px' }}>
                                    <h6>Our BS Computer Science student achieved an outstanding 3.9/4.0 CGPA, excelling in Artificial Intelligence and Software Development projects.Her consistent hard work and innovation made her stand out among her peers.</h6>
                                </div>
                                <div style={{ height: 45, width: 300, backgroundColor: "white", marginTop: "0px", justifyContent: "space-between", alignItems: "center", display: 'flex' }}>
                                    <button
                                        style={{ backgroundColor: '#D9D9D9', color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 100 }}>Edit
                                    </button>
                                    <button
                                        style={{ backgroundColor: '#D9D9D9', color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 100 }}>Delete
                                    </button>
                                </div>
                            </div>


                        </div>
                        <div style={{ height: 280, width: 1115, backgroundColor: "#003366", display: 'flex', gap: '30px' }}>
                            <div style={{ height: 250, width: 500, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9, display: 'flex' }}>
                                <div style={{ height: 250, width: 200, backgroundColor: 'grey' }}>
                                    <img src={std2} alt="Student" style={{ width: "200px", height: "300" }} />

                                </div>
                                <div style={{ height: 250, width: 300, backgroundColor: "white", marginLeft: '4px' }}>
                                    <div style={{ height: 50, width: 300, backgroundColor: "white", marginBottom: '-20px', display: 'flex', marginRight: 10, justifyContent: "space-between" }}>
                                        <div style={{ height: 45, width: 150, backgroundColor: "white" }}>
                                            <h3 style={{ fontSize: 22, marginTop: 10 }}>Sophia</h3>
                                        </div>
                                        <div style={{ height: 50, width: 120, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            {/* <div style={{ display: "flex", gap: "6px" }}><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div style={{ height: 20, width: 300, backgroundColor: "white", marginTop: "5px" }}>
                                        <h5>Computer science(sesion 2021 -2025)</h5>
                                    </div>
                                    <div style={{ height: 50, width: 300, backgroundColor: "white", marginTop: "10px" }}>
                                        <h5 style={{ marginTop: 0 }}>Our BS Computer Science student has set a remarkable example of excellence.</h5>
                                    </div>
                                    <div style={{ height: 70, width: "300", backgroundColor: "white", color: "grey", marginTop: '-25px' }}>
                                        <h6>She achieved a stellar 3.9/4.0 CGPA, excelling in Artificial Intelligence and Software Development projects. Her innovative approach and consistent hard work earned her the Gold Medal.</h6>
                                    </div>
                                    <div style={{ height: 45, width: 300, backgroundColor: "white", marginTop: "0px", justifyContent: "space-between", alignItems: "center", display: 'flex' }}>
                                        <button
                                            style={{ backgroundColor: '#D9D9D9', color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 100 }}>Edit
                                        </button>
                                        <button
                                            style={{ backgroundColor: '#D9D9D9', color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 100 }}>Delete
                                        </button>
                                    </div>
                                </div>


                            </div>


                        </div>


                    </div>
                    <div style={{ height: 280, width: 1115, backgroundColor: "#003366", display: 'flex', gap: '30px' }}>
                        <div style={{ height: 250, width: 500, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9, display: 'flex' }}>
                            <div style={{ height: 250, width: 200, backgroundColor: "grey" }}>
                                <img src={std4} alt="Student" style={{ width: "200px", height: "auto" }} />

                            </div>
                            <div style={{ height: 250, width: 300, backgroundColor: "white", marginLeft: '4px' }}>
                                <div style={{ height: 50, width: 300, backgroundColor: "white", marginBottom: '-20px', display: 'flex', marginRight: 10, justifyContent: "space-between" }}>
                                    <div style={{ height: 45, width: 150, backgroundColor: "white" }}>
                                        <h3 style={{ fontSize: 22, marginTop: 10 }}>Micheal chen</h3>
                                    </div>
                                    <div style={{ height: 50, width: 120, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        {/* <div style={{ display: "flex", gap: "6px" }}><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" />
                                        </div> */}
                                    </div>
                                </div>
                                <div style={{ height: 20, width: 300, backgroundColor: "white", marginTop: "5px" }}>
                                    <h5>Computer science(sesion 2021 -2025)</h5>
                                </div>
                                <div style={{ height: 50, width: 300, backgroundColor: "white", marginTop: "10px" }}>
                                    <h5 style={{ marginTop: 0 }}>Secured Gold Medal in Computer Science and received a full scholarship for MS in the UK.</h5>
                                </div>
                                <div style={{ height: 70, width: "300", backgroundColor: "white", color: "grey", marginTop: '-25px' }}>
                                    <h6>Our BS Computer Science student achieved an outstanding 3.9/4.0 CGPA, excelling in Artificial Intelligence and Software Development projects.Her consistent hard work and innovation made her stand out among her peers.</h6>
                                </div>
                                <div style={{ height: 45, width: 300, backgroundColor: "white", marginTop: "0px", justifyContent: "space-between", alignItems: "center", display: 'flex' }}>
                                    <button
                                        style={{ backgroundColor: '#D9D9D9', color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 100 }}>Edit
                                    </button>
                                    <button
                                        style={{ backgroundColor: '#D9D9D9', color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 100 }}>Delete
                                    </button>
                                </div>
                            </div>


                        </div>
                        <div style={{ height: 280, width: 1115, backgroundColor: "#003366", display: 'flex', gap: '30px' }}>
                            <div style={{ height: 250, width: 500, backgroundColor: "white", border: "2px solid grey", borderRadius: 10, padding: "5px", justifyContent: "space-between", marginLeft: 22, marginTop: 9, display: 'flex' }}>
                                <div style={{ height: 250, width: 200, backgroundColor: "pink" }}>

                                    <img src={std3} alt="Student" style={{ width: "200px", height: "auto" }} />
                                </div>
                                <div style={{ height: 250, width: 300, backgroundColor: "white", marginLeft: '4px' }}>
                                    <div style={{ height: 50, width: 300, backgroundColor: "white", marginBottom: '-20px', display: 'flex', marginRight: 10, justifyContent: "space-between" }}>
                                        <div style={{ height: 45, width: 150, backgroundColor: "white" }}>
                                            <h3 style={{ fontSize: 22, marginTop: 10 }}>David Wiliams</h3>
                                        </div>
                                        <div style={{ height: 50, width: 120, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            {/* <div style={{ display: "flex", gap: "6px" }}><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" /><FaStar size={18} color="gold" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div style={{ height: 20, width: 300, backgroundColor: "white", marginTop: "5px" }}>
                                        <h5>Computer science(sesion 2021 -2025)</h5>
                                    </div>
                                    <div style={{ height: 50, width: 300, backgroundColor: "white", marginTop: "10px" }}>
                                        <h5 style={{ marginTop: 0 }}>Secured Gold Medal in Computer Science and received a full scholarship for MS in the UK.</h5>
                                    </div>
                                    <div style={{ height: 70, width: "300", backgroundColor: "white", color: "grey", marginTop: '-25px' }}>
                                        <h6>Our BS Computer Science student achieved an outstanding 3.9/4.0 CGPA, excelling in Artificial Intelligence and Software Development projects.Her consistent hard work and innovation made her stand out among her peers.</h6>
                                    </div>
                                    <div style={{ height: 45, width: 300, backgroundColor: "white", marginTop: "0px", justifyContent: "space-between", alignItems: "center", display: 'flex' }}>
                                        <button
                                            style={{ backgroundColor: '#D9D9D9', color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 100 }}>Edit
                                        </button>
                                        <button
                                            style={{ backgroundColor: '#D9D9D9', color: "black", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 100 }}>Delete
                                        </button>
                                    </div>
                                </div>


                            </div>


                        </div>


                    </div>

                </div>

            </div>



        </div>
    )
}

export default SuccessS