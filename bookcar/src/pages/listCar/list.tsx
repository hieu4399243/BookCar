import React from 'react'
import ic_close from '../../assets/images/ic_close.svg';
import Time from './time';
import Price from './price';
 

export default function List() {
  return (
    <div>
      <div className='flex p-5 bg-white'>
        <img src={ic_close} />
        <h1 className='font-bold text-xl'>Lọc chuyến xe</h1>
      </div>
      <div className='bg-[#dedede] h-screen'>
        <Time/>
      </div>
    </div>
  )
};
