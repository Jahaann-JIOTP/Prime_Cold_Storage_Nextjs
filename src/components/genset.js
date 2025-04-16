import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

function Genset({position, link}) {
    return (
        <div className={`absolute ${position}`}>
            <Link href={link}><img src="/Genset.png" alt="Description of the image" className='w-[120px]'></img></Link>
        </div>
    );
}

export default Genset;


