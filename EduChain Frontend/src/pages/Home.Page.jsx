import React from 'react';
import HeroCarousel from '../components/HeroCarousel/HeroCarousel.Component';
import CategoriesSlider from '../components/Categories/Categories.Component';
import TrendingCourse from '../components/TrendingCourse/TrendingCourse.Component';
import About from '../components/About/About.Component';
import NGOReg from '../components/NGORegistration/NGORegBanner.Component';
import { useState, useEffect } from 'react';
// import courses from '../utils/data';
import { toast, Slide } from 'react-toastify';

function HomePage() {
  const [courses, setCourses] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const ngotoken = urlParams.get('ngotoken');

  useEffect(() => {
    if (token){
      const verifyUser = async () => {
      await fetch(`http://127.0.0.1:5000/user/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // handle successful response
          if (!data.status) {
            throw new Error(data.message);
          }
          toast.success('Verified Successfully! You Can Now Login.', {
            position: "top-center",
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        })
        .catch((error) => {
          // handle error response
        });
      };
      verifyUser();
    }
    if (ngotoken){
      const verifyNGO = async () => {
      await fetch(`http://127.0.0.1:5000/ngo/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: ngotoken,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // handle successful response
          if (!data.status) {
            throw new Error(data.message);
          }
          toast.success('Verified Successfully! You Will Now Hear From Our Team Soon Via Email.', {
            position: "top-center",
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        })
        .catch((error) => {
          // handle error response
        });
      };
      verifyNGO();
    }
    const getData = async () => {
      await fetch(`http://127.0.0.1:5000/course`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // handle successful response
          if (!data.status) {
            throw new Error(data.message);
          }
          if (data.courses.length !== 0) {
            let courseData = [];
            for (let i = 0; i < (data.courses.length>5?5:data.courses.length); i++) {
              courseData.push(data.courses[i]);
            }
            setCourses(courseData);
          }
        })
        .catch((error) => {
          // handle error response
        });
    };
    getData();
  }, []);

  return (
    <>
      <HeroCarousel />
      <div className='container mx-auto px-4 md:px-12 my-8'>
        <h2 className='text-3xl font-bold text-gray-800 sm:ml-3 ml-0 mb-6'>
          Top Categories
        </h2>
        <CategoriesSlider />
      </div>
      <div className='container mx-auto px-4 md:px-12 mt-8 mb-12'>
        <TrendingCourse
          title='Trending Courses'
          subtitle='List Of Recommended Courses'
          posters={courses}
        />
      </div>
      <div className='container mx-auto px-4 md:px-12 my-8'>
        <About />
      </div>
      <div className='container mx-auto px-4 md:px-12 my-8'>
        <NGOReg />
      </div>
    </>
  );
}

export default HomePage;
