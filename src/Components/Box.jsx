import React from 'react'
// import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
function Box(props) {
    return (
        <div style={{ backgroundColor: "white", borderRadius: 5, width: 310, height: 90, paddingLeft: "7px" }}>
            <h3 style={{ color: 'black', padding: 3, fontWeight: 'bold', marginTop: 10 }}> {props.Heading}</h3>
            <div style={{ height: 45, width: 40, backgroundColor: 'pink', borderRadius: 30, float: 'right', marginTop: -32, marginRight: 11, textAlign: 'center', backgroundColor: '#D9D9D9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{props.icon}
            </div>
            <h3 style={{ fontWeight: 'bold', color: 'black', marginTop: -23, padding: 3, }}>{props.totalnmbr} </h3>
            <h4 style={{ color: 'green', marginTop: -28, padding: 6 , color :props.color }}>  {props.arrow}  {props.totalgrowth}</h4>
       
        </div>
    )
}
export default Box
