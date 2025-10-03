import React from 'react';
import { Link } from 'react-router-dom'
import { MdNotifications } from "react-icons/md";
import { FaCheck, FaFilter, FaTimes } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
export default function Courses(props) {
  return (
    <div>
      <Link to="/Courses"></Link>
      <a href="Courses"></a>
      <div style={{ width: 1090, height: 616, backgroundColor: '#D9D9D9', marginLeft: 228,marginTop: -616 }}>
        <div style={{ backgroundColor: '#D9D9D9', width: 1020, height: 30 }}>
        <input type="text" placeholder="search" style={{ padding: '10', width: 900, boarderadius: 10, height: 25,marginTop:10,marginLeft:30 }} />
          <div style={{ height: 31, width: 80, backgroundColor: 'white', float: 'right', marginLeft: -20, marginRight: -20,marginTop:10 }}>
            <div style={{ display: "flex", height: 30, width: 30, backgroundColor: "#003366", float: 'right', borderRadius: '50%', textAlign: 'center', fontWeight: 'bold', color: 'white', alignContent: 'center', justifyContent: "space-around", alignItems: 'center', marginRight: 6 }}>AD
            </div>
            <div style={{ display: "flex", height: 30, width: 30, float: 'left', marginLeft: 6, justifyContent: 'center', alignItems: 'center' }}>
              <MdNotifications size={25} color="black" />
            </div>
          </div>
        </div>
        <h2 style={{marginLeft:35,color:"#003366"}}>Course Management</h2>
        <div style={{ height: 400, width: 950, backgroundColor: "#003366", padding: "30px", marginLeft: 40 }}>
        <input type="text" placeholder="search" style={{ padding: '10', width: 852, boarderadius: 5, height: 25, }} />
          <button style={{ height: 30, width: 90, backgroundColor: 'white', float: 'right', marginLeft: 0, marginRight: -6, display: 'flex', alignItems: 'center', color: "black", cursor: 'pointer', justifyContent: 'center' }}><FaFilter />Status
          </button>
          <div style={{ height: 345, width: 950, backgroundColor: "white", marginTop: "15px" }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Course Name</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>College</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Duration</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Fee</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Status</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Added Date</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: "#D9D9D9" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Computer Sceince</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>MIT</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>4 Years</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>$45,000/year</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(219, 247, 231)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Active</button></td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Jan 15,2023</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-arround ", alignItems: "center" }}><FaEye color="green" />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Electrical Engineering</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Stanford university</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>4 Years</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>$52,000/year</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(219, 247, 231)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Active</button></td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Feb 3,2023</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-arround", alignItems: "center" }}><FaEye color="green" />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Quantum Computing</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>MIT</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>2 Years</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>$58,000/year</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(239, 247, 129)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>pending</button></td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Mar 10,2023</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-between", alignItems: "center" }}><FaEye color="green" />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Business Administrator</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Harvard university</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>3 Years</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>$49,000/year</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(219, 247, 231)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Active</button></td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Dec 5,2023</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-arround", alignItems: "center" }}><FaEye color="green" />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Machine Learning</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Berkelely college</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>2 Years</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>$38,000/year</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}><button style={{ backgroundColor: 'rgb(248, 181, 104)', borderRadius: "10px", color: 'rgb(21, 20, 20)', height: 30, marginTop: 10, padding: '10px', display: 'flex', alignItems: 'center' }}>Blocked</button></td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>Apr 22,2023</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px', gap: 25, display: "flex", height: 39, cursor: "pointer", justifyContent: "space-arround", alignItems: "center" }}><FaEye color="green" />
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