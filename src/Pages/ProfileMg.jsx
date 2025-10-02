import React from 'react'
import { Link } from 'react-router-dom'
import { MdManageAccounts } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";

function ProfileMg() {
    return (
        <div>
            <Link to="/SuccessS"> </Link>
            <a href="SuccessS"></a>
            <div style={{ height: 635, marginTop: "15px", width: 1120, backgroundColor: '#003366' }}>

                <div style={{ height: 80, width: 1120, backgroundColor: '#D9D9D9', marginTop: '-20px', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ marginLeft: "10px" }}><MdManageAccounts size={28} color="black" /> Profile Management</h2>
                </div>

                <div style={{ height: 560, width: 1120, backgroundColor: '#003366', display: "flex", justifyContent: "center", alignItems: "center", }}>

                    <div style={{ height: 525, width: 700, backgroundColor: "grey" }}>
                        <div style={{ height: 40, width: 700, backgroundColor: '#D9D9D9', marginTop: '-20px', }}>
                            <h2 style={{ textAlign: 'center' }}>profile Management</h2>
                        </div>
                        <div style={{ height: 70, width: 700, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <h3 style={{ margin: 0 }}>College Name</h3>
                            <input type="text" placeholder="Iqra girls college" style={{ padding: '5px', width: '300px', borderRadius: '10px', height: 20 }} />
                        </div>
                        <div style={{ height: 70, width: 700, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <h3 style={{ margin: 0 }}>Address</h3>
                            <input type="text" placeholder="Chattha Town Lahore Road, Sargodha " style={{ padding: '5px', width: '300px', borderRadius: '10px', height: 20 }} />
                        </div>
                        <div style={{ height: 70, width: 700, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <h3 style={{ margin: 0 }}>Contact Number</h3>
                            <input type="text" placeholder="(444)-126-4375 " style={{ padding: '5px', width: '300px', borderRadius: '10px', height: 20 }} />
                        </div>
                        <div style={{ height: 70, width: 700, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <h3 style={{ margin: 0 }}>Email</h3>
                            <input type="text" placeholder="info@igc.edu.pk. " style={{ padding: '5px', width: '300px', borderRadius: '10px', height: 20 }} />
                        </div>
                        <div style={{ height: 70, width: 700, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <h3 style={{ margin: 0 }}>update profile</h3>
                            <input type="text" placeholder="Upload profile " style={{ padding: '5px', width: '300px', borderRadius: '10px', height: 20 }} />
                        </div>
                        <div style={{ height: 70, width: 700, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <button
                                style={{ backgroundColor: "darkblue", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: 200 }}>Edit Profile
                            </button>

                        </div>
                        <div style={{ height: 70, width: 700, backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <h4 style={{ color: "grey" }}>Updates may required Admin approval</h4>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProfileMg