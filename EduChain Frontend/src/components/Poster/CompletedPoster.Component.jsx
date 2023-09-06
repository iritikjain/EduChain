import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

const CompletedPoster = (props) => {
  const [generatedCertificate, setGeneratedCertificate] = useState(
    props.certificateUrl ? true : false
  );

  const generateCertificate = async (e) => {
    e.preventDefault();
    await fetch(
      `http://127.0.0.1:5000/course/generate-certificate/${props.courseId._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: String(localStorage.getItem('token')),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // handle successful response
        if (!data.status) {
          throw new Error(data.message);
        }
        toast.success('Certificate Generated', {
          position: 'top-center',
          autoClose: 2000,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setGeneratedCertificate(true);
      })
      .catch((error) => {
        // handle error response
      });
  };
  return (
    <div
      className='flex flex-col items-start border shadow rounded-lg gap-2 pb-2'
      style={{ marginRight: '20px' }}
    >
      <div className='h-30 md:h-40 w-full'>
        <img
          src={props.courseId.image}
          alt='poster'
          className='w-full h-full rounded-md'
        />
      </div>
      <div className='px-4 pb-2'>
        <h3 className='text-lg font-bold text-gray-700'>
          {props.courseId.courseTitle}
        </h3>
        <p className='text-xs text-gray-500 mb-2'>
          By {props.courseId.instructorId.firstName} {props.courseId.instructorId.lastName}
        </p>
        <h3 className='mb-3 font-bold'>Ⓝ {props.courseId.courseFee}</h3>
        <div className='flex gap-2'>
          {generatedCertificate ? (
            <Link
              to={props.NFTExplorerLink}
              className='rounded text-black p-2 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'
              target='_blank'
            >
              View Certificate
            </Link>
          ) : (
            <button
              className='rounded text-black p-2 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'
              onClick={(e) => generateCertificate(e)}
            >
              Generate Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CompletedPoster;
