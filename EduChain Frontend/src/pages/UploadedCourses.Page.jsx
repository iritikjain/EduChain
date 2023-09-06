import React,{useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar/Sidebar.Component';
import { Link } from 'react-router-dom';
import UploadedCourses from '../components/UploadedCourses/UploadedCourses.Component';
import AddIcon from '@mui/icons-material/Add';
import courses from '../utils/data';

const UploadedCoursesPage = () => {

  const [courseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch('http://127.0.0.1:5000/course/course-uploaded', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: String(localStorage.getItem('token')),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // handle successful response
          if (!data.status) {
            throw new Error(data.message);
          }
          console.log(data.courses)
          setCourseDetails(data.courses);
        })
        .catch((error) => {
          // handle error response
        });
    };
    getData();
  }, []);
  return (
    <>
      <div className='container mx-auto px-4 my-10'>
        <div className='w-full lg:flex lg:flex-row gap-4'>
          <div className='lg:w-1/5 p-4 bg-white rounded'>
            <div>
              <Sidebar />
            </div>
          </div>
          <div className='lg:w-4/5 p-4 bg-white rounded'>
          <div className='flex gap-2 mt-3'>
            <h1 className='text-2xl font-bold my-1 mr-4 mb-4'>Uploaded Courses</h1>
            <Link to='/course/upload/draft'>
            <button className="rounded bg-orange-400 text-white p-2 hover:text-orange-400 hover:bg-white hover:border-2 hover:border-orange-400 mb-4"><AddIcon /> Upload Course </button>
            </Link>
            </div>
            <UploadedCourses  
            posters={courseDetails}
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadedCoursesPage;
