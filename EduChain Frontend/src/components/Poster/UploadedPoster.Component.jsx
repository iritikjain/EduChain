import React from 'react';
import { Link } from 'react-router-dom';

const UploadedPoster = (props) => {

  return (
    <div
      className='flex flex-col items-start border shadow rounded-lg gap-2 pb-2'
      style={{ marginRight: '20px' }}
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
        <p className='text-xs text-gray-500 mb-2'>By {props.instructorId.firstName} {props.instructorId.lastName}</p>
        <h3 className='mb-3 font-bold'>Ⓝ {props.courseFee}</h3>
        {props.courseCompleted?
        <div className='flex gap-14'>
          <Link
            className='rounded text-green-600 p-2 ml-1 border-2 border-green-600 hover:bg-green-600 hover:text-white'
          >
            Uploaded
          </Link>
        </div>:<div className='flex gap-14'>
          <Link to={`/course/upload/draft/${props._id}`}
            className='rounded text-red-600 p-2 ml-1 border-2 border-red-600 hover:bg-red-600 hover:text-white'
          >
            Pending
          </Link>
        </div>}
      </div>
    </div>
  );
};
export default UploadedPoster;
