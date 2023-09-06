import React from 'react';
import CourseInfo from './CourseInfo.Component';
import { useCartContext } from '../../context/cart.context';
import { Link } from 'react-router-dom';

const CourseHeroComponent = ({ courseData }) => {
  const { addToCart } = useCartContext();

  return (
    <>
      <div>
        {/* mobile & tab sized devices */}
        <div className='lg:hidden w-full'>
          <div className='w-full'>
            <img
              src={courseData.image}
              alt='cover poster'
              className='m-4 rounded'
              style={{
                width: 'calc(100% - 2rem)',
              }}
            />
          </div>
          <div className='flex flex-col gap-3 lg:hidden'>
            <div className='flex flex-col-reverse gap-3 px-4 my-3'>
              <div className='text-black flex flex-col gap-2 md:px-4'>
                <h1 className='text-2xl font-bold'>{courseData.courseTitle}</h1>
                <h4>Tags - {courseData.tags.join(',')}</h4>
                <h4>Language - {courseData.language}</h4>
                <h4>Duration - {courseData.timeRequired}</h4>
              </div>
            </div>
            <div className='flex items-center gap-3 md:px-4 md:w-screen text-xl px-4'>
              <Link
                to='/cart'
                className='bg-red-500 w-full py-3 text-white font-semibold rounded-lg'
                onClick={() =>
                  addToCart(
                    courseData._id,
                    courseData.image,
                    courseData.courseTitle,
                    courseData.courseFee,
                    courseData.instructorName,
                    courseData.courseModules.map((module,index) => `${index+1}`)
                  )
                }
              >
                Add To Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Large Screen Devices */}
        <div
          className='relative hidden w-full lg:block'
          style={{ height: '30rem' }}
        >
          <div
            className='absolute z-10 w-full h-full'
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgb(34, 34, 34) 24.97%, rgb(34, 34, 34) 38.3%, rgba(34, 34, 34, 0.04) 97.47%, rgb(34, 34, 34) 100%)',
            }}
          ></div>

          <div className='absolute z-30 left-24 top-10 flex items-center gap-10'>
            <div className='w-66 h-96'>
              <img
                src={courseData.image}
                alt='Course Poster'
                className='w-full h-full rounded-xl'
              />
            </div>
            <div>
              <CourseInfo courseData={courseData} />
            </div>
          </div>
          <img
            src='https://res.cloudinary.com/diczskxkx/image/upload/v1681462125/mit_grei6f.webp'
            alt='backdrop poster'
            className='w-full h-full'
          />
        </div>
      </div>
    </>
  );
};

export default CourseHeroComponent;
