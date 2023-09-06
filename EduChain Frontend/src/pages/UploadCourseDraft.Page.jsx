import React, { useState, useEffect } from 'react';
import BasicCourseInfoComponent from '../components/UploadCourse/CourseInfo.Component';
import { useParams } from 'react-router-dom';
import ModuleInfoComponent from '../components/UploadCourse/ModuleInfo.Component';
import { toast, Slide } from 'react-toastify';
// Disclosure
import { Disclosure } from '@headlessui/react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ChapterInfoComponent from '../components/UploadCourse/ChapterInfo.Component';
import AssignmentInfoComponent from '../components/UploadCourse/AssignmentInfo.Component';
import { Link } from 'react-router-dom';

const UploadCourseDraftPage = () => {
  const { id } = useParams();
  const [openTab, setOpenTab] = useState('Basic Details');

  const [courseDetails, setCourseDetails] = useState({
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

  

  const handleModules = () => {
    const modules = [];
    const handleChapter = (noOfChapters, moduleNumber) => {
      let chapters = [];
      for (let i = 0; i < noOfChapters; i++) {
        chapters.push(
          // <div
          //   className='w-full text-lg flex justify-between border-dashed border-2 rounded px-4 py-2 hover:bg-gray-200 hover:rounded mb-4'
          //   key={`Module ${moduleNumber} Chapter ${i + 1}`}
          // >
          //   Chapter {i + 1}
          // </div>
          <div
            className='ml-4 text-md px-4 py-2 border border-2 rounded hover:bg-gray-200 hover:rounded mb-4'
            key={`Module ${moduleNumber} Chapter ${i + 1}`}
            onClick={() => setOpenTab(`${moduleNumber} Chapter ${i + 1}`)}
          >
            <span>Chapter {i + 1}</span>
          </div>
        );
      }
      return chapters;
    };
    for (let i = 0; i < courseDetails.noOfModules; i++) {
      modules.push(
        // <div
        //   className='w-full text-lg flex justify-between border-dashed border-2 rounded px-4 py-2 hover:bg-gray-200 hover:rounded mb-4'
        //   onClick={() => setOpenTab(`Module ${i + 1}`)}
        //   key={`Module${i + 1}`}
        // >
        //   Module {i + 1}
        //   {courseDetails.courseModules.map((module) => {
        //     if (module.moduleNumber === i + 1 && module.noOfChapters !== 0) {
        //       return handleChapter(module.noOfChapters, module.moduleNumber);
        //     }
        //     return null;
        //   })}
        // </div>
        <div key={`Module ${i + 1}`} className='ml-4'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className='flex items-center gap-3 w-full text-md px-4 py-2 border border-2 rounded hover:bg-gray-200 hover:rounded mb-4'
                  onClick={() => setOpenTab(`Module ${i + 1}`)}
                >
                  {open ? <BiChevronUp /> : <BiChevronDown />}
                  <span className={open ? 'text-gray-600' : 'text-black'}>
                    Module {i + 1}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className='text-gray-500'>
                  {courseDetails.courseModules.map((module) => {
                    if (
                      module.moduleNumber === i + 1 &&
                      module.noOfChapters !== 0
                    ) {
                      return handleChapter(
                        module.noOfChapters,
                        module.moduleNumber
                      );
                    }
                    return null;
                  })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      );
    }
    return modules;
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const { courseFee, courseTitle, courseBrief, tags, timeRequired, language, image, noOfModules, courseModules,  courseAssessmentIds} = courseDetails;
    if (!courseFee || !courseTitle || !courseBrief || !tags || !timeRequired || !language || !image || !noOfModules || !courseModules ||  !courseAssessmentIds) {
      toast.error('Kindly Fill All The Required Details.', {
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
        return
    }
    if (id) {
      await fetch('http://127.0.0.1:5000/course/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: String(localStorage.getItem('token')),
        },
        body: JSON.stringify({
          courseId: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // handle successful response
          if (!data.status) {
            throw new Error(data.message);
          }
          toast.success('Course Submitted Successfully !', {
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
          window.history.pushState(
            null,
            null,
            'http://localhost:3000/uploadedcourses'
          );
          window.dispatchEvent(new Event('popstate'));
        })
        .catch((error) => {
          // handle error response
        });
    } else {
      toast.error('Please Add Course Details !', {
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
    }
  };

  useEffect(() => {
    if (id) {
      const getData = async () => {
        await fetch(`http://127.0.0.1:5000/course/${id}`, {
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
  }, [id]);

  return (
    <>
      <div className='container mx-auto px-12 my-14'>
        <div className='w-full lg:flex lg:flex-row gap-4'>
          <div className='lg:w-1/4 p-4 bg-white rounded'>
            <h2 className='text-2xl font-bold mb-6'>Create Course</h2>
            <Link>
            <div
              className='w-full text-md px-4 py-2 border border-2 rounded hover:bg-gray-200 hover:rounded mb-4'
              onClick={() => setOpenTab('Basic Details')}
            >
              Basic Details
            </div>
            </Link>
            {/* <div className='w-full text-lg flex justify-between border-dashed border-2 rounded px-4 py-2 hover:bg-gray-200 hover:rounded mb-4'>
              Modules
            </div> */}
            {/* {courseDetails.noOfModules !== 0 && handleModules()} */}
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex items-center gap-3 w-full text-md px-4 py-2 border border-2 rounded hover:bg-gray-200 hover:rounded mb-4'>
                    {open ? <BiChevronUp /> : <BiChevronDown />}
                    <span className={open ? 'text-gray-600' : 'text-black'}>
                      Modules
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className='text-gray-600'>
                    {courseDetails.noOfModules !== 0 && handleModules()}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Link>
            <div
              className='w-full text-md border border-2 rounded px-4 py-2 hover:bg-gray-200 hover:rounded mb-4'
              onClick={() => setOpenTab('Assignment')}
            >
              Assignment
            </div>
            </Link>
            <button   
              className='px-4 py-2 border border-2 rounded text-black border-orange-400 hover:bg-orange-400 hover:text-white mb-4 disabled'
              onClick={(e) => handleCourseSubmit(e)}
            >
              Submit Course
            </button>
          </div>
          <div className='lg:w-3/4 p-4 bg-white rounded'>
            {openTab === 'Basic Details' && (
              <BasicCourseInfoComponent
                courseDetails={courseDetails}
                setCourseDetails={setCourseDetails}
              />
            )}

            {openTab.split(' ')[0] === 'Module' && (
              <ModuleInfoComponent
                courseDetails={courseDetails}
                setCourseDetails={setCourseDetails}
                moduleNumber={openTab}
                CourseId={id}
              />
            )}
            {openTab.split(' ')[1] === 'Chapter' && (
              <ChapterInfoComponent
                courseDetails={courseDetails}
                setCourseDetails={setCourseDetails}
                moduleNumber={parseInt(openTab.split(' ')[0])}
                chapterNumber={parseInt(openTab.split(' ')[2])}
                CourseId={id}
              />
            )}
            {openTab === 'Assignment' && (
              <AssignmentInfoComponent
                courseDetails={courseDetails}
                setCourseDetails={setCourseDetails}
                CourseId={id}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadCourseDraftPage;
