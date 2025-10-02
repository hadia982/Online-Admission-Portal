import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginWithFBase } from '../Helper/firebaseHelper';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/HomeDataSlice';
function Login() {
    const [Email, setEmail] = useState("admin123@gmail.com");
    const [Password, setPassword] = useState("123xyz");
    const dispatch = useDispatch();


    const completeLogin = async () => {

        alert("error")

        if (Email == "" || Password == "") {

            alert("please enter email or Password");
            return;
        }
        const userData = await loginWithFBase(Email, Password)

        dispatch(setUser(userData))


    }


    const navigate = useNavigate();

    const handleLogin = () => {

        navigate("/Dashboard");
    };
    const handleSignup = () => {

        navigate("/signup")
    }




    return (
        <div style={{ height: 600, width: 1240, backgroundColor: ' #003366' }}>
            <Link to="/Login"></Link>
            <a href="Login"></a>
            <div style={{ height: 600, width: 500, backgroundColor: "#D9D9D9", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ height: 471, width: 277, backgroundColor: "white", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", marginLeft: 221, marginTop: -7 }}>
                    <h2 style={{ textAlign: 'center', marginTop: 85 }}>Login</h2>
                    <p style={{ textAlign: 'center', marginTop: -10 }}>Enter your account details</p>
                    {/* <form action="login.php" method='post'></form> */}
                    <input value={Email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" style={{ padding: '10', width: 200, boarderadius: 5, height: 25, marginLeft: 37 }} />
                    <input value={Password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" style={{ padding: '10', width: 200, boarderadius: 5, height: 25, marginTop: 13, marginLeft: 37 }} />
                    <div style={{ float: 'right', marginRight: 143, marginTop: -16, display: 'flex', alignItems: 'center', color: "black", cursor: 'pointer', justifyContent: 'center' }}>
                        <h5 >Forgot Password</h5></div>
                    <div style={{ textAlign: "center" }}>
                        <button onClick={completeLogin} style={{ backgroundColor: ' #003366', borderRadius: 8, width: "70%", height: 40, cursor: "pointer", border: "none", marginTop: "10px" }} >
                            <h5 onClick={handleLogin} style={{ color: "#fff", fontWeight: "600", fontSize: 14, margin: 0 }} >login </h5>
                        </button>
                    </div>                     
                     <div style={{ float: 'right', marginRight: 123, marginTop: 90, display: 'flex', alignItems: 'center', color: "black", cursor: 'pointer', justifyContent: 'center' }}>
                        <h5 >Don't have an account</h5></div>
                    <button onClick={handleSignup}  style={{ width: 66, height: 23, backgroundColor: ' #003366', position: 'absolute', marginTop: 110, marginLeft: 170, padding: '10px', textAlign: 'center', display: 'flex', alignContent: 'center', alignItems: 'center', borderRadius: 5, color: "white", cursor: 'pointer' }}> signup</button>
                </div>
            </div>
            <div style={{ height: 432, width: 611, backgroundColor: " #3b72aaff", marginLeft: 500, marginTop: -538, padding: '20px' }}>
                <img src="https://www.marketing91.com/wp-content/uploads/2020/10/Study-Skills.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
            </div>
        </div>

    )
}

export default Login