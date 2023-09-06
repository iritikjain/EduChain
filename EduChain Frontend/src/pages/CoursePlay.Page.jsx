import React, { useEffect, useState } from 'react';
import CoursePlayComponent from '../components/CoursePlay/CoursePlay.Component';
import { useParams } from 'react-router-dom';
import CourseChapterComponent from '../components/CoursePlay/CourseChapter.Component';
import CourseAssignmentComponent from '../components/CoursePlay/CourseAssignment.Component';

const CoursePlayPage = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [chapterClicked, setChapterClicked] = useState(null);
  const [assignmentClicked, setAssignmentClicked] = useState(null);
  useEffect(() => {
    if (id) {
      const getData = async () => {
        await fetch(`http://127.0.0.1:5000/course/status/${id}`, {
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
            setCourseDetails(data.course);
          })
          .catch((error) => {
            // handle error response
          });
      };
      getData();
    }
  }, []);

  return (
    <>
      <div className='container mx-auto px-4 my-10'>
        <div className='w-full lg:flex lg:flex-row-reverse gap-4'>
          <div className='lg:w-3/4 p-4 bg-white rounded'>
            {chapterClicked && (
              <CourseChapterComponent
                chapterVideoUrl={chapterClicked.chapterVideoUrl}
                chapterBrief={chapterClicked.chapterBrief}
              />
            )}

            {assignmentClicked &&
              (courseDetails.modules.every((module) => module.moduleStatus) ? (
                <CourseAssignmentComponent
                  courseAssessmentIds={courseDetails.assessmentList}
                  courseId={courseDetails.courseId}
                />
              ) : (
                <p>Please Complete The Course To Give The Assignment !</p>
              ))}
          </div>
          <div className='lg:w-1/4 p-4 bg-white rounded'>
            <h2 className='text-2xl font-bold mb-6'>
              {courseDetails?.courseTitle}
            </h2>
            <div className='flex flex-col gap-6'>
              {courseDetails &&
                courseDetails.modules.map((module, index) => {
                  return (
                    <CoursePlayComponent
                      title={module.moduleTitle}
                      chapters={module.chapters}
                      key={index}
                      courseId={courseDetails.courseId}
                      moduleNumber={module.moduleNumber}
                      setChapterClicked={setChapterClicked}
                      setAssignmentClicked={setAssignmentClicked}
                      moduleStatus={module.moduleStatus}
                      courseDetails = {courseDetails}
                      setCourseDetails = {setCourseDetails}
                    />
                  );
                })}
              {courseDetails && (
                <div
                  className='w-full text-md px-4 py-2 border border-2 rounded hover:bg-gray-200 hover:rounded mb-4'
                  onClick={() => {
                    setChapterClicked(null);
                    setAssignmentClicked(courseDetails.assessmentList);
                  }}
                >
                  <b>Assignment</b>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePlayPage;
