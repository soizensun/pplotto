import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default function NavBar() {
    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        setCurrentUser(localStorage.getItem("currentUser"))
    }, [])

    const logout = () => {
        localStorage.clear();
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link href="/Home" passHref>
                    <Navbar.Brand href="">PP lotto</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link href="/Home" passHref>
                            <Nav.Link>เพิ่มเล่ม</Nav.Link>
                        </Link>
                        <Link href="/MyNums" passHref>
                            <Nav.Link>เล่มทั้งหมด</Nav.Link>
                        </Link>
                        <Link href="/MatchingResult" passHref>
                            <Nav.Link>ผลการชน</Nav.Link>
                        </Link>
                        {/* <Link href="/PersonalInfo" passHref>
                            <Nav.Link>ข้อมูลส่วนตัว</Nav.Link>
                        </Link> */}

                    </Nav>
                    <Nav>
                        <Navbar.Text style={{marginRight: "10px"}}>
                            ผู้ใช้ปัจจุบัน : <span style={{fontWeight: "bold", color: "white"}}>{currentUser}</span>
                        </Navbar.Text>
                        <Link href="/" passHref>
                            <Nav.Link onClick={logout}>ออกจากระบบ</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
