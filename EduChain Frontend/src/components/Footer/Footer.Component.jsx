import * as React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/cart.context';
function Footer() {
  const { total_items } = useCartContext();
  return (
    <div
      className={
        (window.location.pathname === '/cart' && total_items<2 )
          ? 'bg-premier-800 py-6 fixed bottom-0 w-full'
          : 'bg-premier-800 py-6'
      }
    >
      <p className='text-white text-lg text-center'>
        &copy;
        <Link to='/'>
          <span className='text-orange-400 hover:text-orange-500'> E</span>du
          <span className='text-orange-400 hover:text-orange-500'>C</span>hain
        </Link>{' '}
        2023. All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
