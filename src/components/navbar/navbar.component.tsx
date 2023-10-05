import { Link, useSearchParams } from "react-router-dom"

import './navbar.styles.css'

const Navbar = () => {
    const [searchParams] = useSearchParams();
    let navStatus = searchParams.get('todos');
    return (
        <nav>
            <Link to='/'
                className={navStatus === null ? 'active' : ''}
            >
                All
            </Link>

            <Link to='/?todos=active'
                className={navStatus === 'active' ? 'active' : ''}
            >
                Active
            </Link>

            <Link to='/?todos=completed'
                className={navStatus==='completed' ? 'active':''}
            >
                Completed
            </Link>
        </nav>
    )
}

export default Navbar
