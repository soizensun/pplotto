import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Style from '../styles/LoginPage.module.css'
import { FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBarLogin from '../components/NavBarLogin'
import axios from 'axios'

const HEADERS = { 'Content-Type': 'application/json' }

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        console.log(localStorage.getItem("currentUser"));
    }, [])

    const onSubmit = () => {
        if (username != "" && password != "") {
            setShowLoading(true)
            axios.post('/api/checkLogin', JSON.stringify({ "username": username, "password": password }), { headers: HEADERS })
                .then(res => {
                    console.log(res.data);
                    if (res.data.status == true) {
                        location.href = "/Home";
                        localStorage.setItem('currentUser', username);
                        setShowLoading(false)
                    }
                    else {
                        alert("กรุณาลองใหม่อีกครั้ง");
                        setShowLoading(false)
                    }
                })
                .catch(err => {
                    alert("กรุณาลองใหม่อีกครั้ง");
                    setShowLoading(false)
                })
        }
        else {
            alert("กรุณาใส่ ชื่อผู้ใช้ หรือ รหัสผ่านให้ครบ");
        }
    }
    return (
        <>
            <NavBarLogin />
            <div className={Style.container}>
                <div style={{ marginBottom: "40px" }}>
                    <Typography variant="h3" gutterBottom>
                        PP lotto
                    </Typography>
                </div>
                <FormControl>
                    <div>
                        <TextField
                            style={{ width: "300px" }}
                            label="ชื่อผู้ใช้"
                            variant="outlined"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <TextField
                            style={{ width: "300px" }}
                            type="password"
                            label="รหัสผ่าน"
                            variant="outlined"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <button type="button" className={Style.submitBTN} onClick={onSubmit}>
                            เข้าสู่ระบบ
                        </button>
                    </div>

                    {/* <div style={{ marginTop: "5px" }}>
                        <button type="button" className={Style.registerBTN}>
                            ลงทะเบียนผู้ใช้
                        </button>
                    </div> */}
                    <div className={Style.container1} style={{ display: showLoading ? "block" : "none" }}>
                        <CircularProgress />
                    </div>

                </FormControl>

            </div>
        </>
    )
}
