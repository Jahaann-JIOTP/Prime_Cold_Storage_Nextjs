import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

function Meter({position, link}) {
    return (
        <div className={`absolute ${position}`}>
            <Link href={link}><img src="/meter.png" alt="Description of the image" className='w-[53px]'></img></Link>
        </div>
    );
}

export default Meter;


