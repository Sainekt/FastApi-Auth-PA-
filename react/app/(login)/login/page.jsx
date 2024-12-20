'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Api from '../../api';
export default function Login() {
    const [error, setError] = useState('');
    const router = useRouter()

    const handleLogin = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        Api.signin({ username, password })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    router.push('/')
                } else {
                    setError(data.detail);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{ height: '50vh' }}
        >
            <form onSubmit={handleLogin}>
                <div className='mb-3'>
                    <label htmlFor='username' className='form-label'>
                        Username
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='username'
                        required
                        onChange={() => setError('')}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        onChange={() => setError('')}
                        required
                    />
                    <span className='text-danger'>{error ? error : ''}</span>
                </div>
                <button type='submit' className='btn btn-primary'>
                    Login
                </button>
            </form>
        </div>
    );
}
