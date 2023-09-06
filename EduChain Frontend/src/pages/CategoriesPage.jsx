import React from 'react';
import AllCourses from '../components/AllCourses/AllCourses.Component';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CategoriesPage() {
  const [courses, setCourses] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const getData = async () => {
      await fetch(`http://127.0.0.1:5000/course/search?tags=${category}`, {
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
          console.log(data);
          setCourses(data.courseList);
        })
        .catch((error) => {
          // handle error response
          console.log(error);
        });
    };
    getData();
  }, [category]);

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);;

  return (
    <>
      <div className='container mx-auto px-4 md:px-12 mt-8 mb-12'>
        {courses.length !== 0 ? (
          <AllCourses
            title='Search Results For'
            subtitle={categoryName}
            posters={courses}
          />
        ) : (
          category && (
            <p className='ml-3 text-xl text-black mt-2 border border-gray-300 border-2 rounded-md w-1/3 p-4'>
              Sorry! No Courses Found Related To <b><i>{categoryName}.</i></b> {' '}
            </p>
          )
        )}
      </div>
    </>
  );
}

export default CategoriesPage;
