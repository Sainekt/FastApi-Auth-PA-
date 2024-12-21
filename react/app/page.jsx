'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import donePic from '../public/done.png';
import Api from './api/index';
import { useAuth } from './context/AuthContext';

export default function Index() {
    const { auth, setAuth } = useAuth();
    const [data, setData] = useState({});
    const [countdown, setCountdown] = useState(0);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const router = useRouter();

    useEffect(() => {
        Api.index(token)
            .then((data) => {
                if (data.data) {
                    setAuth(true);
                    setData(data);
                    setError(null);
                    const endTime = new Date(data.time).getTime();
                    const currentTime = Date.now();
                    const differenceInSeconds = Math.floor(
                        (endTime - currentTime) / 1000
                    );
                    setCountdown(
                        differenceInSeconds > 0 ? differenceInSeconds : 0
                    );
                } else {
                    setAuth(false);
                    setError(data.detail);
                }
            })
            .catch((error) => {
                setError(error.detail);
            });

        if (!token) {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevCountdown - 1; // Уменьшаем на 1 каждую секунду
            });
        }, 1000);

        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, []);

    return (
        <>
            {error ? (
                <div className='text-danger d-flex justify-content-center'>
                    {error}
                </div>
            ) : null}
            <div className='d-flex justify-content-center'>
                {auth && data.data ? (
                    <div>
                        <h1>Okay, what's next?</h1>
                        <br />
                        <h2>
                            Data from backend:{' '}
                            <span className='text-danger'>{data.data}</span>
                        </h2>
                        <h3>
                            You will need to update the token after: {countdown}{' '}
                            seconds
                        </h3>
                        <Image src={donePic} alt='done' />
                    </div>
                ) : (
                    <div className='d-flex justify-content-center'>
                        <div className='spinner-border' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
