import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

const CoursePlayComponent = (props) => {
  const [moduleStatus, setModuleStatus] = useState(props.moduleStatus);
  const [chapters, setChapters] = useState(props.chapters);

  const handleClick = async (event, chapterNumber) => {
    event.preventDefault();
    await fetch(
      `http://127.0.0.1:5000/course/update/${props.courseId}/module/${props.moduleNumber}/chapter/${chapterNumber}`,
      {
        method: 'POST',
             headers: {
          'Content-Type': 'application/json',
          Authorization: String(localStorage.getItem('token')),
        },
        body: JSON.stringify(),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          throw new Error(data.message);
        }
        const updatedData = chapters.map((chapter) => {
          if (chapter.chapterSequence === chapterNumber) {
            return { ...chapter, chapterStatus: true };
          }
          return chapter;
        });
        setChapters(updatedData);
        if (data.moduleStatus) {
          setModuleStatus(data.moduleStatus);
          const updatedCourseDetails = props.courseDetails.modules.map(
            (module) => {
              if (props.moduleNumber === module.moduleNumber) {
                return {
                  ...module,
                  moduleStatus: true,
                };
              }
              return module;
            }
          );
          props.setCourseDetails({
            ...props.courseDetails,
            modules: updatedCourseDetails,
          });
        }
      })
      .catch((error) => {
        // handle error response
      });
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className='p-2 border-2 border rounded flex items-center gap-4 w-full'>
            {open ? <BiChevronUp /> : <BiChevronDown />}
            <span className={open ? 'text-gray-600' : 'text-black'}>
              <input
                type='checkbox'
                checked={moduleStatus}
                disabled={moduleStatus}
                className='mr-2'
              />
              <b>Module {props.moduleNumber}: </b> {props.title}
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className='text-gray-600'>
            <div className='flex items-center gap-3 flex-wrap'>
              {chapters.map((chapter, index) => (
                <div
                  className='ml-8 px-3 py-1 hover:cursor-pointer w-full flex items-center'
                  key={index}
                >
                  <input
                    type='checkbox'
                    checked={chapter.chapterStatus}
                    className='mr-2'
                    disabled={chapter.chapterStatus}
                    onChange={(e) => handleClick(e, chapter.chapterSequence)}
                  />
                  <div
                    className='flex-1'
                    onClick={() => {
                      props.setAssignmentClicked(null);
                      props.setChapterClicked(chapter);
                    }}
                  >
                    <b>
                      <i>Chapter {chapter.chapterSequence}: </i>
                    </b>{' '}
                    {chapter.chapterName}
                  </div>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default CoursePlayComponent;
