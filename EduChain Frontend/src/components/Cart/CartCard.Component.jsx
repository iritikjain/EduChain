import React from 'react';
import { ImBin } from 'react-icons/im';
import { useCartContext } from '../../context/cart.context';

function CartCardComponent(props) {
  const {removeFromCart} = useCartContext();

  return (
    <>
      <div className='flex item-start gap-6 p-3 my-4 border-dashed border-2 rounded-md'>
        <div className='w-20 h-20'>
          <img
            src={props.cartItem.image}
            alt='Python Course'
            className='w-full h-full rounded-xl'
          />
        </div>
        <div>
          <h3 className='text-gray-700 text-xl font-bold mb-1'>
            {props.cartItem.courseTitle}
          </h3>
          <p className='text-gray-400 text-sm mb-2'>
            By {props.cartItem.instructor}
          </p>
          <h3 className='text-lg font-bold text-orange-400 mb-4'>Ⓝ {props.cartItem.courseFee}</h3>
          <span className='font-bold flex items-center gap-1 cursor-pointer hover:text-red-600' onClick={() => removeFromCart(props.cartItem.courseId)}>Remove <ImBin/></span>
        </div>
      </div>
    </>
  );
}

export default CartCardComponent;
