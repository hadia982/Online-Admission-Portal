import React from 'react'
import Button from './Button'
import { MdLogout } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaHome, FaUserGraduate, FaStar, FaLock } from "react-icons/fa";
import { IoChatbubblesOutline, IoBookOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/HomeDataSlice';
export default function Sidebar(props) {
       const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setUser({}));
    }

    return (
        <div style={{ height:635,backgroundColor: '#D9D9D9', border: '1px solid grey' }}>
          
            <div style={{ width: 225, height:40, backgroundColor: '#D9D9D9' }}>
                <h2 style={{ color: '#003366', textAlign: 'center', fontWeight: 'bold' ,}}>College Dashboard</h2>
            </div>
            <div style={{ width: 220, height: 524, backgroundColor: '#D9D9D9', marginTop:-9 }}>
                <Button 
                    button="Dashboard"
                    url='ClgDashboard'
                    icon={<FaHome size={18} />}
                />
                <Button
                    button="Student Management"
                    url= "StdMg"
                    icon={<FaUserGraduate size={18} />}
                />
                <Button
                    button="Course Management"
                      url='CourseMg'
                    icon={<IoBookOutline size={18} />}
                />
                <Button
                    button="Chat/msg panel"
                     url='Chat'
                    icon={<IoChatbubblesOutline size={18}/>}
                />
                <Button
                    button="Profile management"
                    url='ProfileMg'

                    icon={<IoPersonCircleOutline  size={18}/>}
                />
                   <Button
                    button="Success Stories"
                    url='SuccessS'

                    icon={<FaStar   size={18}/>}
                />
                        <Button
                    button="Status Display"
                    url='Status'

                    icon={<MdDashboard  size={18}/>}
                />
                            <Button
                    button="Login /security"
                    url='Security'

                    icon={<FaLock   size={18}/>}
                />


<div style={{ width:"50%", height: 50, backgroundColor: '#D9D9D9', marginTop:35}}>
                    <button onClick={handleLogout} style={{ position: 'absolute', padding: '5px', color: 'white', backgroundColor: '#003366', marginLeft: 10, }}><MdLogout /> Logout </button>
                </div>
        </div>
        </div>

    )
}
