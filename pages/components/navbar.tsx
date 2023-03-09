import Link from "next/link"


function Navbar(){
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Hydrate</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/" legacyBehavior>
                                <a className="nav-link">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link href="/users" legacyBehavior>
                                <a className="nav-link">Users</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/posts" legacyBehavior>
                                <a className="nav-link">Posts</a>
                            </Link>
                        </li>
                        
                    </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar