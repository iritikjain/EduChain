import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Slide, toast } from 'react-toastify';

function ModuleInfoComponent({
  courseDetails,
  setCourseDetails,
  moduleNumber,
  CourseId,
}) {

  const [moduleDetails, setModuleDetails] = useState({
    moduleTitle: '',
    moduleBrief: '',
    noOfChapters: '',
  });

  const [error, setError] = useState({
    moduleTitleError: false,
    moduleBriefError: false,
    noOfChaptersError: false,
  });

  const validateTitle = (title) => {
    const regex = /^\s*$/;
    return (!(regex.test(title)));
  };

  const validateDesc = (desc) => {
    const regex = /^\s*$/;
    return (!(regex.test(desc)));
  };

  const validateNoOfChapters = (chapters) => {
    const regex = /^\d+$/;
    return regex.test(chapters);
  };

  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    const { moduleTitle, moduleBrief, noOfChapters } = moduleDetails;
    if (!moduleTitle || !moduleBrief || !noOfChapters) {
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
    const data = moduleDetails;
    data['CourseId'] = CourseId;
    data['moduleNumber'] = parseInt(moduleNumber.split(' ')[1]);
    await fetch('http://127.0.0.1:5000/course/addmodule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(localStorage.getItem('token')),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Added Module Successfully !', {
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
        if (!data.status) {
          throw new Error(data.message);
        }

        data.courseData.courseModules.map((module) => {
          if (module.moduleNumber === parseInt(moduleNumber.split(' ')[1])) {
            setCourseDetails({
              ...courseDetails,
              courseModules: [...courseDetails.courseModules, module],
            });
            setModuleDetails(module);
          }
          return null;
        });
      })
      .catch((error) => {
        // handle error response
      });
  };

  useEffect(() => {
    const getData = async () => {
      await fetch(
        `http://127.0.0.1:5000/course/${CourseId}/module/${parseInt(
          moduleNumber.split(' ')[1]
        )}`,
        {
          method: 'GET',
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
          if (data.status) {
            setModuleDetails(data.module);
          }
        })
        .catch((error) => {
          // handle error response
          setModuleDetails({
            moduleTitle: '',
            moduleBrief: '',
            noOfChapters: '',
          });
        });
    };
    getData();
  }, [moduleNumber]);

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 2, width: '50vw' },
        }}
        noValidate
        autoComplete='off'
      >
        <div>
        <h1 className='text-2xl font-bold mx-3 mt-1 mb-3 mr-4'>Enter Details Of Module {parseInt(moduleNumber.split(' ')[1])}</h1>
          <TextField
            id='outlined-multiline-flexible'
            label='Module Title'
            multiline
            maxRows={3}
            value={moduleDetails.moduleTitle}
            onChange={(e) => {
              setModuleDetails({
                ...moduleDetails,
                moduleTitle: e.target.value,
              });
              setError({ ...error, moduleTitleError: !validateTitle(e.target.value)});
            }}
            error={error.moduleTitleError}
            helperText={error.moduleTitleError ? 'Title Is Required' : ''}
          />

          <TextField
            id='outlined-multiline-flexible'
            label='Module Description'
            multiline
            maxRows={3}
            value={moduleDetails.moduleBrief}
            onChange={(e) => {
              setModuleDetails({
                ...moduleDetails,
                moduleBrief: e.target.value,
              });
              setError({ ...error, moduleBriefError: !validateDesc(e.target.value)});
            }}
            error={error.moduleBriefError}
            helperText={error.moduleBriefError ? 'Description Is Required' : ''}
          />
          <TextField
            id='outlined-multiline-flexible'
            label='Number Of Chapters'
            multiline
            maxRows={3}
            value={moduleDetails.noOfChapters}
            onChange={(e) => {
              setModuleDetails({
                ...moduleDetails,
                noOfChapters: parseInt(e.target.value),
              });
              setError({ ...error, noOfChaptersError: !validateNoOfChapters(e.target.value)});
            }}
            error={error.noOfChaptersError}
            helperText={error.noOfChaptersError ? 'Invalid Number Of Chapters Format | Eg. 6' : ''}
          />
        </div>
        <button
          className='mx-4 my-4 px-4 py-2 border border-2 rounded text-black border-orange-400 hover:bg-orange-400 hover:text-white'
          onClick={(e) => handleModuleSubmit(e)}
        >
          Submit Details
        </button>
      </Box>
    </>
  );
}

export default ModuleInfoComponent;
