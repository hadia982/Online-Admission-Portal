import React from 'react'
import { Link } from 'react-router-dom'
function Button(props) {
    return (
        <ul >
            <li>
                <button id="Dashboard" style={{ marginBottom: 8, fontWeight: 'bold', width: 200, marginLeft: -30, borderRadius: ' 12px', height: 50, gap: 6 }}>
                    <Link style={{ fontWeight: 'bold', display: "flex", width: 200, color: 'black', gap: 6, alignItems: 'center' }} to={props.url}>
                        {props.icon}
                        {props.button}
                    </Link>
                </button>
            </li>
        </ul>
    )
}
export default Button