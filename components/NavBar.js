import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="">pplotto</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link href="/BarcodeNumInput">
                                รับข้อมูล
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link href="/MatchingResult">
                                ผลการตรวจสอบ
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link href="/BarcodeNumInput">
                                ข้อมูลส่วนตัว
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>ออกจากระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
