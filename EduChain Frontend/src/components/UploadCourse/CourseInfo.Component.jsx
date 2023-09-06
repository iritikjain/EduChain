import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MuiFileInput } from 'mui-file-input';
import ipfs from '../../utils/ipfs';
import { Slide, toast } from 'react-toastify';

function CourseInfoComponent({ courseDetails, setCourseDetails }) {
  const [imageUpload, setImageUpload] = useState(false);
  const [file, setFile] = React.useState(null);

  const [error, setError] = React.useState({
    courseFeeError: false,
    courseTitleError: false,
    courseBriefError: false,
    tagsError: false,
    timeRequiredError: false,
    languageError: false,
    imageError: false,
    noOfModulesError: false,
  });

  const validateTitle = (title) => {
    const regex = /^\s*$/;
    return (!(regex.test(title)));
  };

  const validateDesc = (desc) => {
    const regex = /^\s*$/;
    return (!(regex.test(desc)));
  };

  const validateLanguage = (language) => {
    const regex = /^\s*$/;
    return (!(regex.test(language)));
  };

  const validateTags = (tags) => {
    const regex = /^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$/;
    return regex.test(tags);
  };

  const handleTags = (value) => {
    setCourseDetails({
      ...courseDetails,
      tags: value.split(','),
    });
    setError({ ...error, tagsError: !validateTags(value)});
  };

  const validateTime = (time) => {
    const regex = /^(\d+ hr)? ?(\d+ min)?$/;
    return regex.test(time);
  };

  const validatePrice = (price) => {
    const regex = /^\d+$/;
    return regex.test(price);
  };

  const validateNoOfModules = (modules) => {
    const regex = /^\d+$/;
    return regex.test(modules);
  };

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.info('Uploading Course Thumbnail Image ...', {
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
        const response = await ipfs.add(file);
        toast.dismiss(toastId);
      const ImgHash = `https://ipfs.io/ipfs/${response.path}`;
      toast.success('Course Image Uploaded Successfully !', {
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
      setCourseDetails({
        ...courseDetails,
        image: ImgHash,
      });
      setImageUpload(true);
    } catch (error) {
      toast.error('Course Image Upload Failed !', {
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

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const { courseFee, courseTitle, courseBrief, tags, timeRequired, language, image, noOfModules } = courseDetails;
    if (!courseFee || !courseTitle || !courseBrief || !tags || !timeRequired || !language || !image || !noOfModules) {
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
    await fetch('http://127.0.0.1:5000/course/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: String(localStorage.getItem('token')),
      },
      body: JSON.stringify(courseDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Added Course Successfully !', {
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
        window.history.pushState(
          null,
          null,
          `http://localhost:3000/course/upload/draft/${data.courseData._id}`
        );
        window.dispatchEvent(new Event('popstate'));
      })
      .catch((error) => {
        // handle error response
      });
  };
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
        <h1 className='text-2xl font-bold mx-3 mt-1 mb-3 mr-4'>Enter Basic Course Details</h1>
          <TextField
            id='outlined-multiline-flexible'
            label='Course Title'
            multiline
            maxRows={3}
            value={courseDetails.courseTitle}
            onChange={(e) => {
              setCourseDetails({
                ...courseDetails,
                courseTitle: e.target.value,
              });
              setError({ ...error, courseTitleError: !validateTitle(e.target.value)});
            }}
            error={error.courseTitleError}
            helperText={error.courseTitleError ? 'Title Is Required' : ''}
          />

          <TextField
            id='outlined-multiline-flexible'
            label='Course Description'
            multiline
            maxRows={3}
            value={courseDetails.courseBrief}
            onChange={(e) => {
              setCourseDetails({
                ...courseDetails,
                courseBrief: e.target.value,
              });
              setError({ ...error, courseBriefError: !validateDesc(e.target.value)});
            }}
            error={error.courseBriefError}
            helperText={error.courseBriefError ? 'Description Is Required' : ''}
          />
          <TextField
            id='outlined-multiline-flexible'
            label='Course Language'
            multiline
            maxRows={3}
            value={courseDetails.language}
            onChange={(e) => {
              setCourseDetails({
                ...courseDetails,
                language: e.target.value,
              })
              setError({ ...error, languageError: !validateLanguage(e.target.value)});
            }}
            error={error.languageError}
            helperText={error.languageError ? 'Language Is Required' : ''}
          />
          <TextField
            id='outlined-multiline-flexible'
            label='Course Tags'
            multiline
            maxRows={3}
            value={courseDetails.tags}
            onChange={(e) => handleTags(e.target.value)}
            error={error.tagsError}
            helperText={error.tagsError ? 'Invalid Tags Format | Eg. python,data,science ' : ''}
          />
          <TextField
            id='outlined-multiline-flexible'
            label='Total Course Duration'
            multiline
            maxRows={3}
            value={courseDetails.timeRequired}
            onChange={(e) => {
              setCourseDetails({
                ...courseDetails,
                timeRequired: e.target.value,
              })
              setError({ ...error, timeRequiredError: !validateTime(e.target.value)});
            }}
            error={error.timeRequiredError}
            helperText={error.timeRequiredError ? 'Invalid Duration Format | Eg. 10 hr 5 min' : ''}
          />
          <TextField
            id='outlined-multiline-flexible'
            label='Course Price'
            multiline
            maxRows={3}
            value={courseDetails.courseFee}
            onChange={(e) => {
              setCourseDetails({
                ...courseDetails,
                courseFee: parseInt(e.target.value),
              });
              setError({ ...error, courseFeeError: !validatePrice(e.target.value)});
            }}
            error={error.courseFeeError}
            helperText={error.courseFeeError ? 'Invalid Price Format | Eg. 5' : ''}
          />
          <div className='flex items-center gap-4 w-4/5'>
            <MuiFileInput
              value={file}
              placeholder='Upload Course Thumbnail Image'
              onChange={handleChange}
              disabled={imageUpload}
            />
            <button 
              className='px-4 py-2 border border-2 rounded text-black border-orange-400 hover:bg-orange-400 hover:text-white'
              onClick={(e) => handleUpload(e)}
            >
              Upload
            </button>
          </div>

          <TextField
            id='outlined-multiline-flexible'
            label='Number Of Modules'
            multiline
            maxRows={3}
            value={courseDetails.noOfModules}
            onChange={(e) => {
              setCourseDetails({
                ...courseDetails,
                noOfModules: parseInt(e.target.value),
              });
              setError({ ...error, noOfModulesError: !validateNoOfModules(e.target.value)});
            }}
            error={error.noOfModulesError}
            helperText={error.noOfModulesError ? 'Invalid Number Of Modules Format | Eg. 10' : ''}
          />
        </div>
        <button 
          className='mx-4 my-4 px-4 py-2 border border-2 rounded text-black border-orange-400 hover:bg-orange-400 hover:text-white'
          onClick={(e) => handleCourseSubmit(e)}
        >
          Submit Details
        </button>
      </Box>
    </>
  );
}

export default CourseInfoComponent;
