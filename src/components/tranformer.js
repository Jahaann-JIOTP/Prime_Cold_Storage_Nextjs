import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

function Transformer({position, link}) {
    return (
        <div className={`absolute ${position}`}>
            <Link href={link}><img src="/transformer.png" alt="Description of the image" className='w-[53px]'></img></Link>
        </div>
    );
}

export default Transformer;


