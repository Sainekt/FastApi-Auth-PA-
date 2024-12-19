import Link from 'next/link';
export default function Navbar() {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'
                >
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link className={'nav-link'} href={'/'}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                        <Link className={'nav-link'} href={'/login'}>
                                Login
                            </Link>
                        </li>
                        <li className='nav-item'>
                        <Link className={'nav-link'} href={'/refresh'}>
                                Refresh
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
