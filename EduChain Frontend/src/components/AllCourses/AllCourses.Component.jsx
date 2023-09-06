import React from 'react';
import Poster from '../Poster/BuyPoster.Component';

const AllCourses = (props) => {

  const { posters, title, subtitle } = props;

  return (
    <>
      <div className='flex flex-col items-start sm:ml-3 mb-6'>
        <h3 className='text-3xl font-bold text-black'>{title}</h3>
        <p className='text-md text-gray-800 my-2'>{subtitle}</p>
      </div>
      <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {posters.map((each,index) => (
          <Poster {...each} key={index}/>
        ))}
      </div>
    </>
  );
};

export default AllCourses;
