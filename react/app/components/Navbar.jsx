'use client';
import Link from 'next/link';
import { useState } from 'react';
import LogOut from './LogOut';
export default function Navbar() {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    function handleLogOut() {
        localStorage.removeItem('token');
        setToken(null);
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
                        <li>
                            {token ? (
                                <LogOut handleLogOut={handleLogOut} />
                            ) : null}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
