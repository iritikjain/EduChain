import React from 'react';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCartContext } from '../../context/cart.context';

const BuyPoster = (props) => {
  const {addToCart}  = useCartContext();

  return (
    <div className='flex flex-col items-start border shadow rounded-lg gap-2 pb-2'
      style={{ marginRight: '20px', minHeight: '21.5rem'}}
    >
      <div className='h-30 md:h-40 w-full'>
        <img
          src={props.image}
          alt='poster'
          className='w-full h-full rounded-md'
        />
      </div>
      <div className='px-4 pb-2'>
        <h3 className='text-lg font-bold text-gray-700'>{props.courseTitle}</h3>
        <p className='text-xs text-gray-500 mb-2'>By {props.instructorName}</p>
        <h3 className='mb-3 font-bold'>Ⓝ {props.courseFee}</h3>
        <div className='flex gap-2'>
          <Link
            to={`/course/${props._id}`}
            className='rounded text-black p-2 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'
          >
            Details
          </Link>
          <Link to='/cart'
            className='rounded bg-orange-400 text-white p-2 hover:text-orange-400 hover:bg-white hover:border-2 hover:border-orange-400'
            onClick={() =>
              addToCart(
                props._id,
                props.image,
                props.courseTitle,
                props.courseFee,
                props.instructorName,
                props.courseModules.map((module,index) => `${index+1}`)
              )
            }
          >
            <AddShoppingCartIcon className='mx-3' />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BuyPoster;
