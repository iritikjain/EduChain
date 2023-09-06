import React from 'react';
import AllCourses from '../components/AllCourses/AllCourses.Component';
import { useState, useEffect } from 'react';

function AllCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch('http://127.0.0.1:5000/course', {
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
          console.log(data.courses);
          setCourses(data.courses);
        })
        .catch((error) => {
          // handle error response
        });
    };
    getData();
  }, []);

  return (
    <>
      <div className='container mx-auto px-4 md:px-12 mt-8 mb-12'>
        <AllCourses
          title='All Courses'
          subtitle='Start Learning Today !'
          posters={courses}
        />
      </div>
    </>
  );
}

export default AllCoursesPage;
