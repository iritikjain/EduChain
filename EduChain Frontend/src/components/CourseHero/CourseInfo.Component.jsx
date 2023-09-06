import React from 'react';
import { useCartContext } from '../../context/cart.context';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const CourseInfo = ({ courseData }) => {
  const { addToCart } = useCartContext();
  return (
    <>
      <div className='flex flex-col gap-8'>
        <h1 className='text-white text-5xl font-bold'>
          {courseData.courseTitle}
        </h1>
        <div className='flex flex-col gap-6 text-white'>
          <Stack direction="row" spacing={1}>
            {courseData.tags.map((tag) => (
            <Chip label={tag} color="warning"/>
            ))}
          </Stack>
          <h4>Language - {courseData.language}</h4>
          <h4>Duration - {courseData.timeRequired}</h4>
          <h4>Price - <b>Ⓝ</b> {courseData.courseFee}</h4>
        </div>
        <div className='flex items-center w-full'>
          <Link
            to='/cart'
            className='bg-orange-500 hover:bg-orange-600 p-2 text-white font-semibold rounded-lg'
            onClick={() =>
              addToCart(
                courseData._id,
                courseData.image,
                courseData.courseTitle,
                courseData.courseFee,
                courseData.instructorName,
                courseData.courseModules.map((module, index) => `${index+1}`)
              )
            }
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </>
  );
};
export default CourseInfo;
