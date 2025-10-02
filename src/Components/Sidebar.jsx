import React from 'react'
import Button from './Button'
import { MdLogout } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { FaFileAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/HomeDataSlice';




export default function Sidebar(props) {

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setUser({}));
    }



    return (
        <div style={{ height: 614, width: 225, backgroundColor: 'white', border: '1px solid grey', borderRadius: '3px' }}>
            <div style={{ width: 220, height: 50, backgroundColor: 'white' }}>
                <h2 style={{ color: "#003366", textAlign: 'center', fontWeight: 'bold' }}>Online Admission Portal</h2>
            </div>
            <div style={{ width: 225, height: 528, backgroundColor: 'white', marginTop: 8 }}>
                <Button
                    button="Dashboard"
                    url='Dashboard'
                    icon={<MdDashboard size={18} />}
                />
                <Button
                    button="Colleges"
                    url="Colleges"
                    icon={<FaUniversity size={18} />}
                />
                <Button
                    button="Courses"
                    url='Courses'
                    icon={<GiOpenBook size={18} />}
                />
                <Button
                    button="Applications"
                    url='Applications'
                    icon={<FaFileAlt size={18} />}
                />
                <Button
                    button="Settings"
                    url='Settings'

                    icon={<FiSettings size={18} />}
                />
                <button onClick={handleLogout} style={{ position: 'absolute', padding: '10px', color: 'black', backgroundColor: '#D9D9D9', marginLeft: 10, marginTop: 65 }}><MdLogout /> Logout </button>
            </div>
        </div>

    )
}