'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import donePic from '../public/done.png';
import Api from './api/index';

export default function Index() {
    const [data, setData] = useState({});
    const [auth, setAuth] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const router = useRouter();

    useEffect(() => {
        Api.index(token)
            .then((data) => {
                if (data.data) {
                    setAuth(true);
                    setData(data.data);
                    setError(null);
                } else {
                    setAuth(false);
                    setError(data.detail);
                }
            })
            .catch((error) => {
                setError(data.detail);
            });

        if (!token) {
            router.push('/login');
        }
    }, [auth]);

    return (
        <>
            {error ? (
                <div className='text-danger d-flex justify-content-center'>
                    {error}
                </div>
            ) : null}
            <div className='d-flex justify-content-center'>
                {auth ? (
                    <div>
                        <h1>Okay, what's next?</h1>
                        <br />
                        <h2>
                            Data from backend:{' '}
                            <span className='text-danger'>{data}</span>
                        </h2>
                        <Image src={donePic} alt='done' />
                    </div>
                ) : (
                    <h1>
                        <Link href={'/login'}>Please Login...</Link>
                    </h1>
                )}
            </div>
        </>
    );
}
