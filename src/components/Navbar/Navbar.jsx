import { Link } from 'react-router-dom'

function Navbar(){
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/post-article">Write an Article!</Link>
            <Link to="/account">Account</Link>
        </nav>
    )
}

export default Navbar;