import Image from 'next/image';
import donePic from '../public/done.png';
export default function Index() {
    return (
        <div className='d-flex justify-content-center'>
            <Image src={donePic} alt='image'></Image>
        </div>
    );
}
