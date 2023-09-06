import React from 'react';
import CourseHeroComponent from '../components/CourseHero/CourseHero.Component';
import Instructor from '../components/Instructor/Instructor.Component';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SingleCoursePage() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({
    courseFee: '',
    courseTitle: '',
    courseBrief: '',
    tags: [],
    timeRequired: '',
    language: '',
    image: '',
    noOfModules: '',
    courseModules: [],
    courseAssessmentIds: [],
  });

  const getModules = () => {
    const data = [];
    courseData.courseModules.map((module, index) => {
      data.push(
        <div
          className='flex item-start w-2/3 gap-2 p-3 border border-2 border-gray-300 rounded-md'
          key={index}
        >
          <p className='text-xl font-bold'>M{index+1})</p>
          <h3 className='text-xl font-bold'>
            {module.moduleTitle}
          </h3>
        </div>
      );
    });
    return data;
  };

  useEffect(() => {
    if (id) {
      const getData = async () => {
        await fetch(`http://127.0.0.1:5000/course/${id}`, {
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
            setCourseData(data.course);
          })
          .catch((error) => {
            // handle error response
          });
      };
      getData();
    }
  }, [id]);

  return (
    <>
      <CourseHeroComponent courseData={courseData} />
      <div className='my-12 container px-4 lg:ml-20 lg:w-2/3'>
        <div className='flex flex-col item-start gap-3'>
          <h1 className='text-gray-800 font-bold text-2xl mb-4'>About The Course</h1>
          <p className='text-justify'>{courseData.courseBrief}</p>
        </div>

        <div className='mt-4'>
          <hr />
        </div>

        <div className='my-8'>
          <h2 className='text-gray-800 font-bold text-2xl mb-8'>Instructors</h2>
          <div className='flex gap-8'>
            <Instructor courseInstructor={courseData.instructorName} />
          </div>
        </div>

        <div className='my-8'>
          <hr />
        </div>

        <div className='my-8'>
          <h2 className='text-gray-800 font-bold text-2xl mb-8'>
            Course Modules
          </h2>
          <div className='flex flex-col gap-3 lg:flex-col'>
            {courseData.courseModules && getModules()}
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleCoursePage;
