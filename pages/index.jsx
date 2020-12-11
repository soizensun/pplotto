import TextField from '@material-ui/core/TextField';
import Style from '../styles/Login.module.css'
import { FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import NavBarLogin from '../components/NavBarLogin'
import Link from 'next/link'

export default function Login() {
    return (
        <>
            <NavBarLogin />
            <div className={Style.container}>
                <div style={{marginBottom: "40px"}}>
                    <Typography variant="h3" gutterBottom>
                        PP lotto
                    </Typography>
                </div>
                <FormControl>
                    <div>
                        <TextField
                            style={{ width: "300px" }}
                            label="ชื่อผู้ใช้"
                            defaultValue="user1"
                            variant="outlined"
                        />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <TextField
                            style={{ width: "300px" }}
                            type="password"
                            label="รหัสผ่าน"
                            defaultValue="user1"
                            variant="outlined"
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <Link href="/Home" passHref>
                            <button type="button" className={Style.submitBTN}>
                                เข้าสู่ระบบ
                            </button>
                        </Link>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                        <button type="button" className={Style.registerBTN}>
                            ลงทะเบียนผู้ใช้
                        </button>
                    </div>
                </FormControl>

            </div>
        </>
    )
}
