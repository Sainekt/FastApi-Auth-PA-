import Link from 'next/link';

export default function ButtonLogOut(props) {

    return (
        <Link className={'nav-link'} href={'/login'} onClick={props.handleLogOut}>
            Logout
        </Link>
    );
}
