import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSignUp } from '../Helper/firebaseHelper';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/HomeDataSlice';

function Signup() {
    const navigate = useNavigate();

    const handleCreateAccount = () => {

        navigate("/ClgDashboard");
    };
    const handleSignup = () => {

        navigate("/Login")
    }

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch()

    const completeSignup = async () => {
        alert("hello")
        if (fName == "" || lName == "" || Email == "" || Password == "") {
            alert("please fill all the fields");
            return;
        }
        const userData = await handleSignUp(Email, Password, { role: "admin", fName: fName, lName: lName })
        if (userData?.uid) {
            dispatch(setUser(userData));
        }

    }



    return (
        <div style={{ height: 600, width: 1240, backgroundColor: "green" }}>
            <Link to="/Signup"></Link>
            <a href="Signup"></a>
            <div style={{ height: 600, width: 500, backgroundColor: "#D9D9D9", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ height: 471, width: 277, backgroundColor: "white", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", marginLeft: 221, marginTop: -7 }}>
                    <h2 style={{ textAlign: 'center', marginTop: 85 }}>Create new account</h2>
                    {/* <p style={{ textAlign: 'center', marginTop: -10 }}>Enter your account details</p> */}
                    <input onChange={(e) => setFName(e.target.value)} type="text" placeholder="First Name" style={{ padding: '10', width: 93, boarderadius: 5, height: 25, marginTop: 13, marginLeft: 39 }} />
                    <input onChange={(e) => setLName(e.target.value)} type="text" placeholder="Last Name" style={{ padding: '10', width: 93, boarderadius: 5, height: 25, marginTop: 13, marginLeft: 5 }} />
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" style={{ padding: '10', width: 200, boarderadius: 5, height: 25, marginLeft: 37, marginTop: 13 }} />
                    <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" style={{ padding: '10', width: 200, boarderadius: 5, height: 25, marginTop: 13, marginLeft: 37 }} />
                    {/* <div style={{ float: 'right', marginRight: 143, marginTop:-16,display: 'flex', alignItems: 'center', color: "black", cursor: 'pointer', justifyContent: 'center' }}>
                        <h5 >Forgot Password</h5></div> */}
                    <div style={{ textAlign: "center" }}>
                        <button onClick={completeSignup} style={{ backgroundColor: ' #003366', borderRadius: 8, width: "70%", height: 40, cursor: "pointer", border: "none", marginTop: "10px" }} >
                            <h5 onClick={handleCreateAccount} style={{ color: "#fff", fontWeight: "600", fontSize: 14, margin: 0 }} >Create Account </h5>
                        </button>
                    </div>
                    <div style={{ float: 'right', marginRight: 123, marginTop: 100, display: 'flex', alignItems: 'center', color: "black", cursor: 'pointer', justifyContent: 'center' }}>
                        <h5 >Already have an account</h5></div>
                    <button onClick={handleSignup} style={{ width: 66, height: 23, backgroundColor: ' #003366', position: 'absolute', marginTop: 115, marginLeft: 170, padding: '10px', textAlign: 'center', display: 'flex', alignContent: 'center', alignItems: 'center', borderRadius: 5, color: "white", cursor: 'pointer' }}> signin</button>
                </div>
            </div>
            <div style={{ height: 432, width: 611, backgroundColor: "rgb(83 149 18)", marginLeft: 500, marginTop: -538, padding: '20px' }}>
                <img src="https://www.marketing91.com/wp-content/uploads/2020/10/Study-Skills.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
            </div>
        </div>

    )
}

export default Signup