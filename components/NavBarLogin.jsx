import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default function NavBarLogin() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link href="/" passHref>
                    <Navbar.Brand href="">PP lotto</Navbar.Brand>
                </Link>
            </Navbar>
        </div>
    )
}
