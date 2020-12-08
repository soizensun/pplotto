import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link href="/" passHref>
                    <Navbar.Brand href="">PP lotto</Navbar.Brand>
                </Link>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link href="/BarcodeNumInput" passHref>
                            <Nav.Link>หน้าหลัก</Nav.Link>
                        </Link>
                        <Link href="/MatchingResult" passHref>
                            <Nav.Link>ผลการชน</Nav.Link>
                        </Link>
                        <Link href="/PersonalInfo" passHref>
                            <Nav.Link>ข้อมูลส่วนตัว</Nav.Link>
                        </Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>ออกจากระบบ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
