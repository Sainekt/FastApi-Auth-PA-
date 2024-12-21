'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    function handleLogOut() {
        localStorage.removeItem('token');
        setAuth(false);
        router.push('/login');
    }

    function handleClickLink(event) {
        event.preventDefault();
        if (
            event.target.href === window.location.href ||
            (event.target.text === 'Home' && auth === false)
        ) {
            return;
        }
        router.push(event.target.href);
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'
                >
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link
                                className={'nav-link'}
                                href={'/'}
                                onClick={handleClickLink}
                            >
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                className={'nav-link'}
                                href={'/login'}
                                onClick={handleClickLink}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            {auth ? (
                                <Link
                                    className={'nav-link'}
                                    href={'/login'}
                                    onClick={handleLogOut}
                                >
                                    Logout
                                </Link>
                            ) : null}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
